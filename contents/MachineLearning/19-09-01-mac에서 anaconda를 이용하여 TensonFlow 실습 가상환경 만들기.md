---
title: "mac에서 anaconda를 이용하여 TensonFlow 가상환경 만들기"
date: "2019-09-01"
template: "post"
draft: false
path: "/deeplearning/19-09-01/"
description: "파이썬은 기본적으로 pip라는 패키지 관리 시스템만을 가지고 있어서 원하는 환경 조성을 위해 다른 패키지와 요소들을 수동으로 추가, 삭제해줘야 합니다. 하지만 아나콘다를 사용하면 가상환경을 만들고 그 가상환경 속에 원하는 패키지를 쉽게 설치 삭제할 수 있습니다."
category: "Deep Learning"
thumbnail: "deeplearning"
---

텐서플로우 실습을 위해서 mac에 아나콘다를 설치 후, 주피터 노트북과 텐서플로우가 설치된 가상환경을 만들어 보도록 하겠습니다. 

파이썬은 기본적으로 pip라는 패키지 관리 시스템만을 가지고 있어서 원하는 환경 조성을 위해 다른 패키지와 요소들을 수동으로 추가, 삭제해줘야 합니다. 하지만 아나콘다를 사용하면 아나콘다에 가상환경을 만들고 그 가상환경 속에 원하는 패키지를 쉽게 설치 삭제할 수 있어서 독립적인 가상 개발환경을 조성할 수 있게 됩니다.

### Anaconda 설치

- https://www.anaconda.com/distribution/#download-section

 위의 링크에서 아나콘다를 다운로드 받으시면 됩니다. Graphical installer를 통해 다운로드 하면 직관적으로 쉽게 다운로드가 가능하지만 저는 CLI 를 통한 다운로드를 하였습니다. 일단 다운로드 까지는 쉽게 됩니다.. 근데 저의 경우에는 터미널 기본 로그인 셸로 **zsh**를 사용하고 있었는데 **zsh**는 conda 명령어를 입력시 꽥 하고 이런 에러를 뱉더군요. **"zsh: command not found: conda"**

 인터넷 검색을 통해 bash에서는 아나콘다가 자동으로 아나콘다의 bin디렉터리를 PATH에 추가해주지만, zsh를 사용하는 경우에는 자동으로 PATH 추가를 해주지 않아서 발생하는 문제라는 것을 알게 되었습니다. 그렇기 때문에 zsh의 설정을 담당하는 **.zshrc** 파일을 조금 수정해주면 문제가 해결됩니다. 파일을 열어서 아래의 코드 한 줄을 추가해줍시다. 

```
export PATH="/아나콘다가 위치한 경로/bin:$PATH"
```

 내용이 제대로 변하지 않거나 수정 권한이 없다고 뜨면 sudo 권한으로 파일을 열어보시길 바랍니다. 저의 경우에는 아나콘다가 /Users/yuho/anaconda3 이라는 경로에 위치하고 있어서 export PATH="/Users/yuho/anaconda3/bin:$PATH" 이런 식으로 적었습니다.

 마지막으로 터미널을 재시작하고 conda --version 명령어가 잘 실행되는지 확인하면 끝 입니다. 셸에 대해서는 많이 듣기만했지 아직은 이해가 부족한 부분이라 나중에 따로 공부 후 포스팅을 해야겠다는 생각이 드네요.

### Anaconda에서 가상환경 만들고, TensorFlow 설치

1. 아나콘다의 **envs** 디렉토리에 새로운 가상환경을 만들 수 있습니다. cd 명령어를 통해 ` /Users/<유저이름>/anaconda3/envs/` 디렉토리로 이동 후 아래의 명령어를 통해 가상환경을 만듭니다. (쉘 설정에 conda 명령어에 대한 선언이 되어있으면 굳이 envs 디렉토리로 이동하지 않아도 아래의 명령어를 사용 가능합니다.)

```sh
conda create -n 가상환경이름 python=3.6
```

2. 위에서 만든 가상 환경을 활성화합니다.

```shell
conda activate 가상환경이름
```

3. 가상 환경 내에 TensorFlow pip 패키지를 설치합니다. 설치시 pip가 아닌 pip3 명령어를 사용하면 현재 내가 사용중인 가상환경이 아닌 로컬(base) 환경에 직접 설치되니 주의하시길 바랍니다.

```shell
pip install tensorflow
```

4. 아래의 명령어를 입력하여 설치를 확인합니다. 에러 없이 print 값이 잘 출력되면 설치가 완료된 것 입니다.

```shell
python -c "import tensorflow as tf;print(tf.reduce_sum(tf.random.normal([1000, 1000])))"
```

5. 가상 환경을 종료하려면 conda deactivate 합니다.

```shell
conda deactivate
```

 이 과정을 마치면 이제 가상환경 내에서 텐서플로우를 사용할 수 있게됩니다. 저는 편한 작업을 위해서 이 가상환경에 jupyter notebook을 설치하고 jupyter notebook 내에서 텐서플로우 실습을 진행 할 예정입니다. 물론 가상환경을 따로 만들지 않고 그냥 컴퓨터 자체에 텐서플로우를 설치해도 상관은 없습니다. 하지만 나중에 문제가 생기면 삭제하고 재설치하는 과정이 너무 복잡하고, 다른 프로그램과 충돌이 일어날 가능성이 존재하기 때문에 일반적으로는 가상환경에서 작업하는 것이 권장 사항입니다.

<span style="color:gray">(20.02.12) 저는 현재 기본적인 tensorflow 작업은 가상환경 내 jupyter notebook을 사용하지 않고, google colab 내에서 진행하고 있습니다. 랩탑 환경에서 작업하려니까 CPU로 학습이 돌아가서 느리기도하고 혹여나 컴퓨터 수명이 줄어들까 걱정이 되더라구요... 그래서 colab에서 무료로 제공하는 gpu를 통해 작업을 하고있습니다. 아나콘다 가상환경은 keras, tensorflow, pytorch 환경으로 각각 나눠서 가끔씩 사용하고 있습니다. </span>

### Reference

- [Mac 아나콘다 파이썬 설치하기 - kyun2world님](https://kyun2.tistory.com/72)
- [pip를 이용하여 TensorFlow 설치 - TensorFlow](https://www.tensorflow.org/install/pip?hl=ko)