---
title: "NVIDIA Triton Inference Server"
date: "2023-10-24"
template: "post"
draft: false
path: "/Operations/23-10-24/"
description: "This post covers the fundamental concepts and sample code for using NVIDIA Triton Inference Server. Triton is an AI inference server built by NVIDIA. It provides various features for inference optimization and higher GPU utilization, and you can create inference APIs simply by storing models in a model repository."
category: "Operations"
---

> This post covers the fundamental concepts and sample code for using NVIDIA Triton Inference Server. All content is based on the GitHub documentation of the NVIDIA Triton Inference Server.

### AI Inference Pipeline

The general process for building an AI inference pipeline and exchanging inference requests is as follows.

1. Train an AI model and save model weights (e.g., save onnx/jit models to cloud/local storage)
2. Start the inference server: Import (copy/download) all required model weights to the inference server and set up each model according to its config
3. Send requests from the client to the inference server (gRPC request)
4. The inference server internally performs pre-processing / model inference / post-processing (of course, pre- and post-processing can also be done on the client side)
5. The inference server sends the results back to the client (response)

Building the entire pipeline fundamentally requires data storage, a client server, and an inference server. It is recommended to use multi-container tools like docker compose to run the client and inference server together.

In this process, the role of the inference server can be thought of as 'managing required AI models', 'setting up models according to config', and 'responding with appropriate inference results to client requests'. NVIDIA Triton provides various features for this purpose, and in this post, we will cover the basic concepts and structure of these features along with a simple example implementation.

### Model Repository

A **model repository** is where Triton stores the weights, metadata, and other information needed to load AI models. The model repository path can be specified using the `--model-repository` option when starting the Triton server. The model repository can exist locally or on cloud services such as [AWS S3](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/model_repository.md#s3) or [Google Cloud Service](https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/model_repository.html#cloud-storage-with-environment-variables).

```
# local file sysytem
tritonserver --model-repository=/path/to/model/repository ...

# google cloud storage
tritonserver --model-repository=gs://bucket/path/to/model/repository ...

# private s3 instance
tritonserver --model-repository=gs://bucket/path/to/model/repository ...
```

There is also a [method](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/model_repository.md#cloud-storage-with-credential-file-beta) to store multiple cloud storage credential files in a single JSON format, but it is still a beta feature and should be monitored.

The folder structure of the model repository must follow the layout provided by NVIDIA below.

```
<model-repository-path>/
    <model-name>/
      [config.pbtxt]
      [<output-labels-file> ...]
      <version>/
        <model-definition-file>
      <version>/
        <model-definition-file>
      ...
    <model-name>/
      [config.pbtxt]
      [<output-labels-file> ...]
      <version>/
        <model-definition-file>
      <version>/
        <model-definition-file>
      ...
    ...
```

**Model name** exists to distinguish between multiple models, and the **config.pbtxt** file provides model configuration.

**Model version** must have at least one and uses numerical names. Folders without numerical names or starting with 0 are ignored. The version policy can be found [here](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/model_configuration.md#version-policy). For a model with only a single version, it would be straightforward to name the \<version> folder simply `1`.

**Model files** reside inside the \<version> folder. Only model types supported by the Triton backend are allowed, and the layout varies slightly depending on the model type. Details can be found [here](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/model_repository.md#model-files). As a simple example, a TorchScript model has the following structure:

```
<model-repository-path>/
    <model-name>/
      config.pbtxt
      1/
        model.pt
```

### Model Configuration

Below is an example of config.pbtxt provided by NVIDIA.

```
name: "text_detection"
backend: "onnxruntime"
max_batch_size : 256
input [
  {
    name: "input_images:0"
    data_type: TYPE_FP32
    dims: [ -1, -1, -1, 3 ]
  }
]
output [
  {
    name: "feature_fusion/Conv_7/Sigmoid:0"
    data_type: TYPE_FP32
    dims: [ -1, -1, -1, 1 ]
  }
]
output [
  {
    name: "feature_fusion/concat_3:0"
    data_type: TYPE_FP32
    dims: [ -1, -1, -1, 5 ]
  }
]
```

- `name`: An optional field that must match the model's folder name
- `backend`: Defines the backend used for model execution (e.g., pytorch, onnxruntime, tensorflow)
- `max_batch_size`: The maximum batch size supported by the model
- `input` and `output`: shape, [datatype](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/model_configuration.md#datatypes), [reshaping](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/model_configuration.md#reshape), [ragged batches](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/ragged_batching.md#ragged-batching), etc.

While a config.pbtxt file is generally required, there are cases where it is optional. For example, even without explicit model configuration, Triton can create a [minimal model configuration](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/model_configuration.md#minimal-model-configuration) through [auto-generated model configuration](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/model_configuration.md#auto-generated-model-configuration). Of course, you can also disable this process using the `--disable-auto-complete-config` option.

The model configuration generated by Triton can be verified by sending a request to the [model configuration endpoint](https://github.com/triton-inference-server/server/blob/main/docs/protocol/extension_model_configuration.md#model-configuration-extension).

```
curl localhost:8000/v2/models/<model name>/config
```

##### Model Warmup

When you launch the NVIDIA inference server and send requests, you may notice latency. Therefore, it is recommended to add model warmup. The reasons for initial request latency are as follows.

- Reduced cold start latency: When a model is first loaded and called, memory allocation and cache initialization may not be complete, leading to longer latency for the first inference request.
- Preparing optimized computation paths: Deep learning models use various computation paths and kernels, and time is needed to select and prepare the optimal path during the first inference.
- Memory and buffer allocation optimization: Depending on the model or algorithm, memory or buffers may need to be dynamically allocated, which can cause delays.
- Cache initialization: If model weights or data are not yet loaded into GPU memory and the data cache is not populated, the first inference may take longer.
- Maintaining stable performance: GPUs can switch to different performance and power states depending on usage. It may take time for the GPU to reach its optimal performance state during the first few inferences.

The following is an example config.pbtxt for model warmup.

```
name: "resnet_classification"
platform: "tensorrt_plan"  # Change to match your model's platform (e.g., "tensorflow_graphdef", "onnxruntime_onnx", "pytorch_libtorch")

input [
  {
    name: "input_tensor"
    data_type: TYPE_FP32
    dims: [3, 224, 224]  # Typical ResNet input size
  }
]

output [
  {
    name: "output_tensor"
    data_type: TYPE_FP32
    dims: [1000]  # Typical ResNet output size (based on ImageNet)
  }
]

instance_group [
  {
    count: 1
    kind: KIND_GPU
  }
]

# Add Model Warmup configuration
model_warmup [
  {
    name: "resnet_warmup"
    batch_size: 1
    count: 10
    inputs {
      key: "input_tensor"
      value: {
        data_type: TYPE_FP32
        dims: [3, 224, 224]
        random_data: true  # Warmup using random data
      }
    }
  }
]
```

There is also a method to create warmup input in file form and pass it to the model.

1. Create a sub-directory named `warmup` inside each model in the model registry.

2. Create warmup data inside the `warmup` directory. It can be generated using the method below.

   ``` python
   import numpy as np
   from tritonclient.utils import serialize_byte_tensor
   serialized = serialize_byte_tensor(np.array(["example_text".encode("utf-8")], dtype=object))
   with open("str_warmup_input", "wb") as fh:
       fh.write(serialized.item())
   ```

3. Enter the appropriate file name in the `input_data_file` key of the model config.pbtxt file.

There is a caveat when applying warmup to Python backend models. Python backend models sometimes call other models, and if you try to warm up a model that has dependencies on other models, the warmup will fail with an error saying '{MODEL NAME} is not ready'. Therefore, for models with dependencies on other models, you either cannot perform warmup or must modify the internal code to avoid calling other models.

### Python Backend

Triton backends are implementations for model execution and are essentially wrappers for deep learning frameworks such as PyTorch, TensorFlow, TensorRT, and ONNX Runtime. In particular, Triton supports not only backends for deep learning frameworks but also a [Python backend](https://github.com/triton-inference-server/python_backend), allowing pre-processing of model inputs and post-processing of model outputs within the Python backend.

To use the Python backend, you need to define a **TritonPythonModel** class with the following structure, which contains four functions.

```python
import triton_python_backend_utils as pb_utils

class TritonPythonModel:
    @staticmethod
    def auto_complete_config(auto_complete_model_config):
       	...
        return auto_complete_model_config

    def initialize(self, args):
        print('Initialized...')

    def execute(self, requests):
        responses = []
        for request in requests:
            # Perform inference on the request and append it to responses
            # list...
        return responses

    def finalize(self):
        print('Cleaning up...')

```

- `auto_complete_config`: Called once when loading the model if the `--disable-auto-complete-config` option is not used. Used for setting the config using properties like set_max_batch_size, set_dynamic_batching, add_input, and add_output
- `initialize`: Called once after the model is loaded. The `args` passed is a Python dictionary; available keys can be found [here](https://github.com/triton-inference-server/python_backend#initialize)
- `execute`: Called every time an inference request arrives
- `finalize`: Performs all necessary cleanup before unloading the model

The most important function among these is `execute`, and the remaining functions can be implemented optionally. For additional features like error handling and logging, refer to `pb_utils`. After implementing all functions, the file must be named **model.py**.

### Other Features

- [Model Analyzer](https://github.com/triton-inference-server/model_analyzer): A tool that helps find the optimal config for a given hardware or problem scenario
- [Model Management](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/model_management.md): One of three modes is selected for model loading
  - NONE: Loads all models in the model repository
  - EXPLICIT: Only loads models specified with the `--load-model` option. Use `--load-model=*` to load all models. If the option is not specified, no models are loaded
  - POLL: Initially loads all models, then periodically reloads or unloads models based on changes. Since there is no proper sync mechanism, avoid using this in production environments
- [Metrics](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/metrics.md), Dynamic batching (batch processing of multiple requests), Ensemble model (combination of multiple models), Concurrent Model Execution (parallel execution of the same model), and other features are available

### Example

For the example, we will use the Falcon-7B model from the official examples. If the model is too large, feel free to experiment with a different model. The complete code has been uploaded to my [personal repository](https://github.com/yuhodots/triton).

In this example, there is no need to train and export the model directly. Using the Python Backend, the Hugging Face model weights are downloaded and used.

The content is quite straightforward. A Docker Compose file is already prepared to create the Triton server and client containers, and the Falcon-7B model within the Triton server automatically downloads all necessary weights and tokenizers during initialization. So all you need to do is run the following command.

```shell
docker compose up
```

Once the server is running successfully, send the following request via curl from inside the client container.

```shell
curl -X POST tritonserver:8000/v2/models/falcon7b/infer -d '{"inputs": [{"name":"text_input","datatype":"BYTES","shape":[1],"data":["How can you be"]}]}'
```

If you receive a response like the one below, you are all set!

```
{
    "model_name": "falcon7b",
    "model_version": "1",
    "outputs": [
        {
            "name": "text_output",
            "datatype": "BYTES",
            "shape": [1],
            "data": ["How can you be sure that you are getting the best deal on your car"]
        }
    ]
}
```

### References

Here are some useful GitHub examples I found.

- https://github.com/Curt-Park/triton-inference-server-practice
- https://github.com/fegler/triton_server_example
- https://github.com/triton-inference-server/tutorials

Documentation for further study is shared below.

- https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/getting_started/quickstart.html
- https://developer.nvidia.com/blog/nvidia-serves-deep-learning-inference/

There is also a wrapper open-source project for easier usage!

- https://blog.rtzr.ai/tritony-tiny-configuration-for-triton-inference-server/
