---
title: "Image data modes & Image file formats"
date: "2020-03-14"
template: "post"
draft: false
path: "/deeplearning/20-03-14/"
description: "딥러닝을 통해 이미지 데이터를 다루려고 할 때, 이미지 데이터의 file format에 따른 mode에 대해 이해하고 있으면 유용합니다. 이번 포스팅에서는 자주 사용되는 이미지 데이터 파일의 format과 mode에 대해 알아보도록 하겠습니다."
category: "Deep Learning"
thumbnail: "deeplearning"
---

딥러닝을 통해 이미지 데이터를 다루려고 할 때, 이미지 데이터의 file format에 따른 mode에 대해 이해하고 있으면 유용합니다. 이번 포스팅에서는 자주 사용되는 이미지 데이터 파일의 format과 mode에 대해 알아보도록 하겠습니다.

### Modes

 mode가 무엇인지에 대한 설명은 [pillow document](https://pillow.readthedocs.io/en/4.1.x/handbook/concepts.html#modes)에 잘 나와있습니다.

 "The mode of an image defines the type and depth of a pixel in the image. The current release supports the following standard modes"라고 pillow document는 설명하고 있는데, 이미지의 타입이나 픽셀에 어떤 정보가 담기는지 정의하는 것을 mode라고 생각하시면 됩니다. 아래에 현재 사용되고 있는 mode들을 나열해 보았습니다.

- 1 (1-bit pixels, black and white, stored with one pixel per byte)
- L (8-bit pixels, black and white, grayscale)
- P (8-bit pixels, mapped to any other mode using a color palette)
- RGB (3x8-bit pixels, true color, Red-Green-Blue)
- RGBA (4x8-bit pixels, true color with transparency mask)
- CMYK (4x8-bit pixels, color separation)
- YCbCr (3x8-bit pixels, color video format)
- LAB (3x8-bit pixels, the Lab color space)
- HSV (3x8-bit pixels, Hue, Saturation, Value color space)
- I (32-bit signed integer pixels)
- F (32-bit floating point pixels)

 이 중 우리가 자주 사용하게 될 이미지의 mode는 L, RGB, RGBA 입니다. **L은 grayscale** 즉, 흰색에서 검정색 사이의 값을 갖는 mode, **RGB는 red green blue** 값을 갖는 mode, **RGBA는** **red green blue 값과 투명도를 나타내는 alpha** 값을 갖는 mode입니다.

### Image file formats

 대중적으로 많이 사용되는 이미지 파일 데이터의 포맷은 JPEG와 PNG가 있습니다. [Pillow document](http:// https//pillow.readthedocs.io/en/5.1.x/handbook/image-file-formats.html*)의 설명에 따르면 **JPEG 파일은** **L,** **RGB,** **CMYK** mode를 갖고, **PNG 파일은 1,** **L,** **P,** **RGB,** **RGBA** mode를 가질 수 있습니다. 

만약 우리가  L, RGB, RGBA mode를 갖는 JPEG이나 PNG 이미지 파일을 파이썬에서 array 형태로 받아 사용하려면 이 mode들이 array에 어떻게 담기는지 알고있어야 합니다. 이에 대한 설명은 [stackoveflow](https://stackoverflow.com/questions/51923503/why-do-some-images-have-third-dimension-3-while-others-have-4)의 질문에서 좋은 답변을 얻을 수 있었습니다. 

- [RGB](https://en.wikipedia.org/wiki/RGB_color_model) (of dimension (m, n, 3)): three channels
- [RGB-A](https://en.wikipedia.org/wiki/RGBA_color_space) (of dimension (m, n, 4)): four channels
- [Grayscale](https://en.wikipedia.org/wiki/Grayscale) (of dimension (m, n)): single channel

 m x n 의 size를 가진 이미지 dog.png, fish.png, lena.png가 있다고 가정을 하고 각각 RGB mode, RGBA mode, Grayscale mode를 갖는다고 하면 그에 따른 코드 결과는 아래와 같이 출력됩니다.

```python
from PIL import Image
import numpy as np

/* RGB mode */
dog = Image.open('dog.png')
print('Dog shape is ' + str(np.array(dog).shape))

/* RGB-A mode */
fish = Image.open('fish.png')
print('Fish shape is ' + str(np.array(fish).shape))

/* Grayscale mode */
lena = Image.open('lena.png')
print('Lena shape is ' + str(np.array(lena).shape))
/* output */

Dog shape is (m, n, 3)
Fish shape is (m, n, 4)
Lena shape is (m, n)
```

 RGBA mode를 갖는 이미지 파일을 RGB mode로 변환시키고 싶다면 아래의 코드를 참고하시면 됩니다.

```python
fish = Image.open('fish.png')
print('Fish RGB-A shape is ' + str(np.array(fish).shape))

rgb = fish.convert('RGB')
print('Fish RGB shape is ' + str(np.array(rgb).shape))
/* Output */

Fish RGB-A shape is (501, 393, 4)
Fish RGB shape is (501, 393, 3)
```

### Reference

- Pillow document: https://pillow.readthedocs.io/en/4.1.x/handbook/concepts.html#modes
- Pillow document: https://pillow.readthedocs.io/en/5.1.x/handbook/image-file-formats.html
- Stackoverflow: [Why do some images have third dimension 3 while others have 4?](https://stackoverflow.com/questions/51923503/why-do-some-images-have-third-dimension-3-while-others-have-4)
- [위키피디아](https://ko.wikipedia.org/wiki/RGBA_색_공간)