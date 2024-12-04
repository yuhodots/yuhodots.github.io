---
title: "Generative Model Engineering Tips"
date: "2024-11-21"
template: "post"
draft: true
path: "/deeplearning/24-11-21/"
description: ""
category: "Deep Learning"
thumbnail: "deeplearning"
---

> 개인 공부용으로, 따로 블로그 업로드는 하지 않습니다. 

### BF16/FP16/FP32

- bf16 (Brain Float 16)
  - 1-bit sign, 8-bit exponent, 7-bit mantissa.
  - Mantissa(유효 숫자)가 작기 때문에 정밀도가 낮지만, fp32와 같은 exponent 비트를 사용하여 dynamic range가 넓음.
  - fp32에 가까운 수 범위(dynamic range)를 제공하며, 정밀도는 fp16과 유사. 계산 속도가 빠르고, 메모리 사용량이 적음.
  - Neural network training과 inference에서 자주 사용되며, 특히 정밀도가 크게 중요하지 않은 상황(예: Gradient 계산).
- fp16 (Half-Precision Floating Point)
  - 1-bit sign, 5-bit exponent, 10-bit mantissa.
  - fp32보다 메모리 사용량과 대역폭이 절반으로 줄어듦.
  - Dynamic range가 좁아, 큰 값이나 작은 값의 계산에서는 정밀도가 부족할 수 있음(overflow/underflow 위험)
- fp32 (Single-Precision Floating Point)
  - 1-bit sign, 8-bit exponent, 23-bit mantissa.
  - 높은 정밀도를 제공하며, over/underflow 문제를 줄임. 메모리 사용량과 계산 비용이 높음.

### CFG scale

- Classifier-Free Guidance Scale

- Diffusion 모델에서 조건(condition) 기반 샘플링을 제어하기 위해 사용하는 스케일링 파라미터.

- Unconditional(무조건적) 샘플과 Conditional(조건적) 샘플의 가중치를 조절하여 모델의 출력 품질을 제어함.

  ​	$x = w \cdot (\text{conditional prediction}) + (1-w) \cdot (\text{unconditional prediction})$

- 값이 작을 때 (e.g., 1.0 이하): 모델이 더 자연스럽고 일반적인 샘플을 생성함.

- 값이 클 때 (e.g., 7.0 이상): 입력 조건에 더 강하게 맞추려는 경향이 있음. 샘플이 더 디테일해지지만, 때로는 artifact를 생성할 위험도 있음.

- 일반적으로 CFG 스케일 값 7에서 11 사이가 최적의 결과를 제공합니다

### CLIP Skip

이미지 생성 과정의 일부를 건너뛰는 기능으로, Stable Diffusion 1.5 기본 모델의 이미지 생성 과정에서 사용됩니다. 초기 레이어는 광범위한 특징을, 후기 레이어로 갈수록 더 구체적이고 선명한 특징을 다룹니다

Clip skip이 도입된 이유는 다음과 같습니다:

1. 일부 모델, 특히 Danbooru 태그 기반 모델에서 광범위한 클립 레이어가 원치 않는 노이즈를 추가하는 경우가 있었습니다.
2. 레이어를 건너뛰면 GPU 시간을 절약하고 때로는 더 나은 결과물을 얻을 수 있습니다
3. 텍스트 모델의 정확도를 조절하는 설정으로 작용합니다

Clip skip은 주로 품질에 집착하는 사용자들을 위한 사소한 최적화 기능으로 간주됩니다.

### LoRA Alpha

LoRA의 dim이 64이고 alpha가 32일 때 inference에서 LoRA weight scale을 0.5로 두는 것은 비슷한 효과를 냅니다.

LoRA에서 alpha는 LoRA의 영향력을 조절하는 scaling factor입니다. LoRA weight scale 또한 LoRA의 영향력을 조절하는 역할을 합니다.

일반적으로 LoRA는 다음과 같이 계산됩니다.

```
output = original_weight + (lora_A @ lora_B) * (alpha / dim)
```

- `original_weight`: 원본 모델의 가중치
- `lora_A`, `lora_B`: LoRA의 가중치 행렬
- `alpha`: scaling factor
- `dim`: LoRA의 차원

위 식에서 `alpha / dim` 부분이 LoRA의 영향력을 조절하는 부분입니다.

따라서 dim이 64이고 alpha가 32일 때 `alpha / dim`은 0.5가 됩니다. 즉, inference에서 LoRA weight scale을 0.5로 설정하는 것은 LoRA를 학습할 때 설정한 alpha와 dim의 비율과 동일한 효과를 내는 것입니다.

다시 말해, LoRA를 학습할 때 alpha를 dim의 절반으로 설정했다면, inference에서 LoRA weight scale을 0.5로 설정하는 것이 LoRA의 효과를 적절하게 적용하는 방법입니다.

하지만 LoRA weight scale을 조절하는 것은 LoRA의 영향력을 미세하게 조정하는 데 사용될 수 있습니다. 예를 들어, LoRA의 효과가 너무 강하다면 LoRA weight scale을 0.5보다 작게 설정하여 LoRA의 영향력을 줄일 수 있습니다. 반대로 LoRA의 효과가 너무 약하다면 LoRA weight scale을 0.5보다 크게 설정하여 LoRA의 영향력을 높일 수 있습니다.

결론적으로 LoRA dim 64, alpha 32에서 LoRA weight scale 0.5는 학습 시 설정과 동일한 효과를 내지만, 필요에 따라 LoRA weight scale을 조절하여 LoRA의 영향력을 미세 조정할 수 있습니다.

### Negative Prompt

negative prompt는 이미지 생성 AI 모델, 특히 Stable Diffusion에서 처음 등장한 개념입니다.

Stable Diffusion은 잠재 확산 모델(Latent Diffusion Model)을 기반으로 작동하는데, 이는 이미지를 노이즈로 변환하고, 그 노이즈에서 원하는 이미지를 생성하는 방식입니다. 이 과정에서 사용자가 원하는 이미지를 설명하는 텍스트 프롬프트를 입력하면, AI 모델은 이를 기반으로 노이즈를 이미지로 변환합니다.

negative prompt가 학습 과정에 직접 포함되지는 않지만, 이미지 생성 과정에서 모델의 동작을 수정하는 데에는 **Classifier-Free Guidance** 라는 방법이 사용됩니다. 이는 텍스트 조건 없이 이미지를 생성하는 것과 텍스트 조건을 사용하여 이미지를 생성하는 두 가지 방식을 비교하여, 텍스트 조건의 영향력을 증폭시키는 기술입니다.

Stable Diffusion에서 negative prompt는 이 Classifier-Free Guidance를 활용하여 적용됩니다. 좀 더 자세히 설명드리면 다음과 같습니다.

1. 잠재 공간에서의 이미지 생성:

Stable Diffusion은 이미지를 직접 생성하는 대신, 잠재 공간(latent space)이라는 추상적인 공간에서 이미지를 표현하고 생성합니다. 텍스트 프롬프트는 이 잠재 공간에서 이미지 생성을 안내하는 역할을 합니다.

2. Classifier-Free Guidance:

- 조건부 생성: Positive prompt를 사용하여 텍스트 조건이 주어진 상태에서 이미지를 생성합니다.
- 무조건부 생성: 텍스트 조건 없이 이미지를 생성합니다.
- Guidance: 조건부 생성과 무조건부 생성 결과의 차이를 계산하여, 텍스트 조건의 영향력을 증폭시킵니다. 즉, positive prompt의 영향을 강화하는 방향으로 이미지 생성을 유도합니다.

3. Negative prompt 적용:

Negative prompt는 Classifier-Free Guidance 과정에서 무조건부 생성에 영향을 미치는 방식으로 작용합니다. 즉, negative prompt에 명시된 특징을 가진 이미지를 무조건부 생성 결과에 추가합니다.

이렇게 되면, 조건부 생성 결과와 무조건부 생성 결과의 차이가 커지면서, negative prompt에 명시된 특징은 억제되고 positive prompt에 명시된 특징은 더욱 강조되는 효과를 얻게 됩니다.

수식으로 표현하면 다음과 같습니다.

```
최종 이미지 = 조건부 생성 결과 + guidance scale * (조건부 생성 결과 - 무조건부 생성 결과)
```

여기서,

- guidance scale은 텍스트 조건의 영향력을 조절하는 값입니다. 값이 클수록 텍스트 조건의 영향력이 커집니다.
- 무조건부 생성 결과는 negative prompt에 의해 영향을 받습니다.

즉, negative prompt는 무조건부 생성 결과를 변경하여 최종 이미지에서 특정 특징이 나타나지 않도록 유도하는 것입니다.

이처럼 negative prompt는 복잡한 수식을 통해 이미지 생성 과정에 영향을 미치며, 사용자가 원하는 이미지를 더욱 정교하게 제어할 수 있도록 도와줍니다.

하지만, 이는 단순화된 설명이며 실제 구현은 더욱 복잡한 과정을 거칩니다. 더 자세한 내용은 Stable Diffusion의 공식 문서 및 관련 논문을 참조하시면 도움이 될 것입니다..

### kohya_ss

- 로그는 workspace/logs에서 볼 수 있다.
- accelerate launch --mixed_precision= ...이런 로그 보이는데 ui는 그저 이 옵션을 넣어주기 위한 장치이다. 이 옵션을 실험마다 잘 보자

### Stable-Diffusion-Web-UI

- lora는 lora 폴더에 넣어야 함
- lora 모델에 ':' 뒤에 0.6, 0.7 설정하면 weight 비율을 설정할 수 있다. 즉 여러개의 weight을 섞어 쓸 수 있다는 것
- weight을 GPU-CPU 서로 바꿔올릴 수 있는데, 이는 settings/action에서 가능

### Noise Sampling

First, you have to understand what samplers *are*. These are discretized differential equations. I'm not going to go into these **at all** in this post, but I've covered them before.

DDIM and PLMS were the original samplers. They were part of [Latent Diffusion's repository](https://github.com/CompVis/latent-diffusion). They stand for the papers that introduced them, Denoising Diffusion Implicit Models and Pseudo Numerical Methods for Diffusion Models on Manifolds.

Almost **all** other samplers come from work done by @RiversHaveWings or Katherine Crowson, which is mostly contained in her work at [this repository](https://github.com/crowsonkb/k-diffusion/blob/master/k_diffusion/sampling.py). She is listed as the principal researcher at Stability AI. Her notes for those samplers are as follows:

- Euler - Implements Algorithm 2 (Euler steps) from Karras et al. (2022)
- Euler_a - Ancestral sampling with Euler method steps.
- LMS - No information, but can be inferred that the name comes from linear multistep coefficients
- Heun - Implements Algorithm 2 (Heun steps) from Karras et al. (2022).
- DPM2 - A sampler inspired by DPM-Solver-2 and Algorithm 2 from Karras et al. (2022).
- DPM2 a - Ancestral sampling with DPM-Solver second-order steps
- DPM++ 2s a - Ancestral sampling with DPM-Solver++(2S) second-order steps
- DPM++ 2M - DPM-Solver++(2M)
- DPM++ SDE - DPM-Solver++ (stochastic)
- DPM fast - DPM-Solver-Fast (fixed step size). See https://arxiv.org/abs/2206.00927
- DPM adaptive - DPM-Solver-12 and 23 (adaptive step size). See https://arxiv.org/abs/2206.00927

The 'Karras' versions of these weren't made by Karras as far as I can tell, but instead are using a variance-exploding scheduler from the Karras paper, which of course is extra confusing given that most of the other samplers were inspired by that paper in the first place.

In terms of "what will I get at high step counts", most of the time you will get similar pictures from:

- Group A: Euler_a, DPM2 a, DPM++ 2S a, DPM fast (after many steps), DPM adaptive, DPM2 a Karras
- Group B: Euler, LMS, Heun, DPM2, DPM++ 2M, DDIM, PLMS
- Group C: LMS Karras, DPM2 Karras, DPM++ 2M Karras

As far as convergence behavior:

- Does not converge: Euler_a, DPM2 a, DPM Fast, DDIM, PLMS, DPM adaptive, DPM2 a Karras
- Converges: Euler, LMS, Heun, DPM2, DPM++ 2M, LMS Karras, DPM2 Karras, DPM++ 2M Karras

By required steps:

- Euler_a = Euler = DPM++2M = LMS Karras (image degraded at high steps) >
- LMS = DPM++ 2M Karras = Heun (slower) = DPM++ 2S a (slower) = DPM++ 2S a Karras >
- DDIM = PLMS = DPM2 (slower) = DPM 2 Karras>
- DPM Fast = DPM2 a (slower)

These all give somewhat different results so a person could prefer the output of any of the models at a given CFG or step range. I do think that there is an argument to be made that DPM++ 2M and Euler_a are good generic samplers for most people, however, as they both resolve to a good picture at low seeds (sub-20) without a hit to iteration speed. DPM++ 2M has the advantage of converging to a single image more often (if you choose to run the same image at higher seed), but is slightly more prone to deformations at high CFG.

To combine all the above:

- Fast, new, converges: DPM++ 2M, DPM++ 2M Karras
- Fast, doesn't converge: Euler_a, DPM2 a Karras
- Others worth considering: DPM2 a, LMS, DPM++ 2S a Karras
- Bugged: LMS Karras (at high steps
- Older, fast but maybe lower quality final result: Euler, LMS, Heun
- Slow: DDIM, PLMS, DPM2, DPM 2 Karras, DPM Fast, DPM2 a

#### TL;DR

These are confusingly named and mostly come from academic papers. The actual mechanisms of each sampler aren't really relevant to their outputs. In general PLMS, DDIM, or DPM fast are slower and give worse results.

Instead, try out DPM++ 2M and Euler_a, along with DPM++ 2M Karras. These should all give good results at a low seed value.

### GenAI Tips

자주 사용되는 lr scheduler와 optimizer

- prodigy (learning rate 1)
- cosine with restarts (constant with warmup)
