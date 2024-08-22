---
title: "NVIDIA Triton Inference Server"
date: "2023-10-24"
template: "post"
draft: false
path: "/Operations/23-10-24/"
description: "NVIDIA Triton Inference Server 사용을 위한 기본 개념들과 샘플 코드를 기록합니다. Triton은 NVIDIA가 직접 만든 AI inference용 서버입니다. Triton 내부에서는 추론 최적화 및 GPU 활용률을 높일 수 있는 여러 기능들을 제공하고 있으며, 모델을 model repository에 저장하면 간단히 inference API를 만들 수 있습니다."
category: "Operations"
---

> NVIDIA Triton Inference Server 사용을 위한 기본 개념들과 샘플 코드를 기록합니다. 모든 내용은 NVIDIA Triton Inference Server의 github document를 기반으로 작성되었습니다. 

### AI Inference Pipeline

AI inference 파이프라인을 만들고 inference 요청을 주고 받는 과정은 일반적으로 다음과 같습니다.

1. AI model 학습 후 model weights 저장 (e.g., onnx/jit model을 cloud/local storage에 저장)
2. Inference server 실행: 필요한 모든 model weights을 inference server로 import(copy/download)하고, 각 model을 config에 따라 세팅
3. Client에서 inference server로 요청 (gRPC request)
4. Inference server에서 내부적으로 pre-processing / model inference / post-processing를 실시 (물론 client에서 전후처리 해도 됨)
5. Inference server의 결과를 client로 응답 (response)

전체 파이프라인 구축을 위해서 data storage, client server, inference server가 기본적으로 필요하며, client와 inference server를 한 번에 실행하기 위해서 docker compose와 같은 멀티 컨테이너 툴을 활용하는 것이 좋습니다.

위 과정에서 inference server의 역할은 '필요한 AI model 관리', 'config에 따른 model 세팅', 'client의 요청에 대한 적절한 inference 결과 응답'정도로 생각해볼 수 있습니다. NVIDIA Triton에서는 이를 위한 여러 feature 들을 제공하고 있는데, 본 포스팅에서는 해당 feature들의 기본 개념이나 구조에 대한 설명과 간단한 예제 구현까지 수행해보도록 하겠습니다. 

### Model Repository

**Model repositroy**는, triton이 AI model을 불러오기 위해 필요한 weights, 메타데이터 등의 정보들을 보관하는 곳입니다. Model repository의 경로는 triton server를 시작할 때 `--model-repository` 옵션으로 명시할 수 있으며, model repository는 local에 직접 존재해도 되고 [AWS S3](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/model_repository.md#s3)나 [google cloud service](https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/model_repository.html#cloud-storage-with-environment-variables) 같은 cloud 상에 존재하는 것도 가능합니다.

```
# local file sysytem
tritonserver --model-repository=/path/to/model/repository ...

# google cloud storage
tritonserver --model-repository=gs://bucket/path/to/model/repository ...

# private s3 instance
tritonserver --model-repository=gs://bucket/path/to/model/repository ...
```

Cloud storage의 여러 credential file을 하나의 json format으로 저장하는 [방법](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/model_repository.md#cloud-storage-with-credential-file-beta)도 제공하고 있지만 아직 beta 기능이라서 지켜봐야할 듯 싶습니다. 

Model repository의 폴더 구조는 반드시 NVIDIA에서 제공하고 있는 아래의 레이아웃을 따라야 합니다. 

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

**Model name**은 여러 모델을 구분하기 위해 존재하고, **config.pbtxt** 파일은 model configuration을 제공합니다.

**Model Version**은 최소 하나 이상을 가지고 있어야 하며 numerical name을 갖습니다. Numerical name을 갖지 않거나 0으로 시작하는 폴더 명을 가진다면 무시됩니다. Version policy는 [이곳](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/model_configuration.md#version-policy)에서 확인 가능합니다. 단순히 하나의 version을 가지고 있는 모델이라면 위의 구조 상에서 \<version>위치의 폴더 명을 그냥 `1`로 이름 붙이는게 무난할 것 같습니다.

**Model File**은 \<version> 폴더 안에 존재하며, triton backend에서 지원하는 모델의 종류만 가능하고 모델에 따라 조금씩 레이아웃도 달라집니다. [이곳](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/model_repository.md#model-files)에서 자세한 내용을 확인 가능하며, 가장 간단한 예시로 TorchScript 모델의 경우에는 아래의 구조를 가집니다.

```
<model-repository-path>/
    <model-name>/
      config.pbtxt
      1/
        model.pt
```

### Model Configuration

아래는 NVIDIA에서 제공하는 config.pbtxt의 예시입니다. 

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

- `name`: optional field이고, 모델의 폴더 이름과 매칭되어야 함
- `backend`: 모델 실행을 위해 사용되는 backend 정의 (e.g., pytorch, onnxruntime, tensorflow)
- `max_batch_size`: 모델이 지원하는 maximum batch size
- `input` and `output`: shape, [datatype](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/model_configuration.md#datatypes), [reshaping](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/model_configuration.md#reshape), [ragged batches](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/ragged_batching.md#ragged-batching) 등

일반적으로 config.pbtxt 파일이 필요하긴 하나 해당 파일이 optional인 경우도 있습니다. 예를 들어, model configuration 설정을 따로 하지 않더라도  [auto-generated model configurate](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/model_configuration.md#auto-generated-model-configuration)에 따라서 triton이 [minimal model configuration](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/model_configuration.md#minimal-model-configuration)을 만드는 작업을 수행하기 때문입니다. 물론, `--disable-auto-complete-config`  옵션으로 이 과정을 자동으로 수행하지 않도록 설정하는 것도 가능합니다. 

Triton에 의해 생성된 model configuration은 [model configuration endpoint](https://github.com/triton-inference-server/server/blob/main/docs/protocol/extension_model_configuration.md#model-configuration-extension)에 요청을 보내 확인 가능합니다.

```
curl localhost:8000/v2/models/<model name>/config
```

##### Model Warmup

NVIDIA inference server를 띄우고 요청을 보내보면 지연시간이 존재하는 것을 확인할 수 있습니다. 따라서 model warmup을 추가해주는 것이 좋습니다. 초기 요청에 지연 시간이 걸리는 이유는 다음과 같습니다. 

- 초기 지연 시간 감소 (Cold Start Latency): 모델이 처음 로드되고 호출될 때, 메모리 할당이나 캐시 초기화가 완료되지 않았기 때문에 첫 번째 추론 요청의 지연 시간이 길어질 수 있습니다. 
- 최적화된 연산 경로 준비: 딥러닝 모델은 다양한 연산 경로와 커널을 사용하며, 첫 번째 추론 시 최적화된 경로를 선택하고 준비하는 과정에서 시간이 소요됩니다. 
- 메모리 및 버퍼 할당 최적화: 모델이나 알고리즘에 따라 필요한 메모리나 버퍼를 동적으로 할당해야 하는 경우가 있습니다. 이 과정에서 지연이 발생할 수 있습니다.
- 캐시 초기화: 모델의 가중치나 데이터가 GPU 메모리에 로드되고, 데이터 캐시가 채워지지 않으면 첫 번째 추론 시 시간이 더 걸릴 수 있습니다.
- 안정적인 성능 유지: GPU는 사용 상태에 따라 다른 성능 및 전력 상태로 전환될 수 있습니다. 처음 몇 번의 추론에서 GPU가 최적의 성능 상태로 도달하기 전까지 시간이 걸릴 수 있습니다.

다음은 model warmup을 위한 config.pbtxt의 예시입니다.

```
name: "resnet_classification"
platform: "tensorrt_plan"  # 또는 "tensorflow_graphdef", "onnxruntime_onnx", "pytorch_libtorch" 등 사용 중인 모델의 플랫폼에 맞게 변경

input [
  {
    name: "input_tensor"
    data_type: TYPE_FP32
    dims: [3, 224, 224]  # 일반적인 ResNet 입력 크기
  }
]

output [
  {
    name: "output_tensor"
    data_type: TYPE_FP32
    dims: [1000]  # 일반적인 ResNet 출력 크기 (ImageNet 기준)
  }
]

instance_group [
  {
    count: 1
    kind: KIND_GPU
  }
]

# Model Warmup 설정 추가
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
        random_data: true  # 무작위 데이터를 사용하여 워밍업
      }
    }
  }
]
```

### Python Backend

Trition backend는 model 실행을 위한 구현체들을 의미하며 기본적으로는 PyTorch, TensorFlow, TensorRT, ONNX Runtime 등 딥러닝 프레임워크의 wrapper로 볼 수 있습니다. 특히 딥러닝 프레임워크에 대한 backend 뿐만 아니라 [python backend](https://github.com/triton-inference-server/python_backend)도 지원을 해서, 모델 입력에 대한 전처리나 모델 출력에 대한 후처리를 python backend 내에서 수행할 수 있습니다.

Python backend를 사용하기 위해서는 아래의 구조를 가진 **TritonPythonModel** class를 정의해야 하고, TritonPythonModel 내에는 4개의 함수가 존재합니다. 

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

- `auto_complete_config`: `--disable-auto-complete-config` 옵션을 사용하지 않은 경우에 모델을 로드할 때 한 번 호출. set_max_batch_size, set_dynamic_batching, add_input, add_output 프로퍼티를 사용해서 config를 설정하는데에 사용
- `initialize`: 모델이 로드되고 난 후에 한 번 호출. 전달되는 `args`는 python dictionary인데 [이곳](https://github.com/triton-inference-server/python_backend#initialize)에서 사용 가능한 key를 확인 가능
- `execute`: inference request가 올 때 마다 호출되는 함수
- `finalize`: 모델을 unload하기 전에 필요한 모든 정리 작업을 수행

이 중에서 제일 중요한 함수는 `execute`이고 나머지 함수들은 선택적(optional)으로 구현해도 상관이 없습니다. Error handling이나 Logger 등과 같은 추가적인 기능 사용을 위해서는 `pb_utils`을 살펴보시면 좋습니다. 모든 함수를 구현하고 난 뒤에는 해당 파일 명을 반드시 **model.py**로 설정해야 합니다. 

### Other Features

- [Model Analyzer](https://github.com/triton-inference-server/model_analyzer): 주어진 하드웨어나 문제 상황에 대해 최적의 config를 찾기 것을 돕는 툴
- [Model Management](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/model_management.md): 모델 load를 위해 아래 세 가지 mode 중 하나를 선택하게 됨
  - NONE: model repository의 모든 모델을 로드
  - EXPLICIT: `--load-model` 옵션에 명시된 모델만 로드. 모든 모델 로드는 `--load-model=*`. 해당 옵션을 적지 않는 경우엔 아무 모델도 로드되지 않음
  - POLL: 처음에는 모든 모델 로드 후에, 모델 변경에 따라 주기적으로 모델 다시 로드하거나 내림. 제대로된 sync 처리 따로 없기 때문에 배포 환경에서 사용하지 말기
- [Metrics](https://github.com/triton-inference-server/server/blob/main/docs/user_guide/metrics.md), Dynamic batching(여러 요청 배치 처리), Ensemble model(여러 모델의 종합), Concurrent Model Execution(같은 모델 병렬 실행) 등 기능 존재

### Example

예제로는 공식 예제에 존재하는 Falcon-7B model을 사용해보겠습니다. 모델이 너무 큰 경우에는 다른 모델로 실험해보셔도 좋을 것 같습니다. 전체 코드는 [개인 저장소](https://github.com/yuhodots/triton)에 업로드 해두었습니다. 

해당 예제에서는 모델을 직접 학습시키고 export 할 필요 없이, Python BackEnd 기반으로 huggingface 모델의 weight을 다운 받아서 사용합니다.

사실 내용은 별 게 없습니다. 이미 triton server와 client container가 만들어지도록 docekr compose 파일을 만들어 두었고, triton server 내 falcon7b 모델 또한 initialize 과정에서 필요한 weight이나 토크나이저를 모두 알아서 불러옵니다. 따라서 아래 명령어만 실행시켜주시면 됩니다.

```shell
docker compose up
```

서버 잘 실행되었다면, client container 내에서 curl을 통해 아래의 요청을 보내봅시다.

```shell
curl -X POST tritonserver:8000/v2/models/falcon7b/infer -d '{"inputs": [{"name":"text_input","datatype":"BYTES","shape":[1],"data":["How can you be"]}]}'
```

요청에 대해서 아래와 같이 응답이 잘 오는 것을 확인하면 끝입니다! 

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

좋은 깃헙 예제들을 발견하여 아래에 공유합니다.

- https://github.com/Curt-Park/triton-inference-server-practice
- https://github.com/fegler/triton_server_example
- https://github.com/triton-inference-server/tutorials

공부를 위한 문서들을 아래에 공유합니다.

- https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/getting_started/quickstart.html
- https://developer.nvidia.com/blog/nvidia-serves-deep-learning-inference/

더 쉬운 사용을 위한 wrapper 오픈소스도 존재하네요!

- https://blog.rtzr.ai/tritony-tiny-configuration-for-triton-inference-server/
