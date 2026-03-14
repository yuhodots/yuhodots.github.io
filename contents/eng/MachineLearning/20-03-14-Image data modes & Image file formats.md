---
title: "Image Data Modes and Image File Formats"
date: "2020-03-14"
template: "post"
draft: false
path: "/deeplearning/20-03-14/"
description: "When working with image data in deep learning, it is useful to understand the modes associated with different image file formats. In this post, we will explore the commonly used image data file formats and modes."
category: "Deep Learning"
thumbnail: "deeplearning"
---

When working with image data in deep learning, it is useful to understand the modes associated with different image file formats. In this post, we will explore the commonly used image data file formats and modes.

### Modes

The explanation of what a mode is can be found in the [pillow document](https://pillow.readthedocs.io/en/4.1.x/handbook/concepts.html#modes).

The pillow document states, "The mode of an image defines the type and depth of a pixel in the image. The current release supports the following standard modes." You can think of a mode as defining the type of an image and what information is contained in each pixel. Below is a list of currently available modes.

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

Among these, the image modes we will frequently use are L, RGB, and RGBA. **L is grayscale**, meaning a mode with values between white and black; **RGB** is a mode with red, green, and blue values; and **RGBA** is a mode with **red, green, blue values and an alpha value representing transparency**.

### Image file formats

The most commonly used image file data formats are JPEG and PNG. According to the [Pillow document](http:// https//pillow.readthedocs.io/en/5.1.x/handbook/image-file-formats.html*), **JPEG files** support **L, RGB, CMYK** modes, and **PNG files** can have **1, L, P, RGB, RGBA** modes.

If we want to use L, RGB, or RGBA mode JPEG or PNG image files in Python as arrays, we need to understand how these modes are stored in arrays. A good answer to this can be found in this [StackOverflow](https://stackoverflow.com/questions/51923503/why-do-some-images-have-third-dimension-3-while-others-have-4) question.

- [RGB](https://en.wikipedia.org/wiki/RGB_color_model) (of dimension (m, n, 3)): three channels
- [RGB-A](https://en.wikipedia.org/wiki/RGBA_color_space) (of dimension (m, n, 4)): four channels
- [Grayscale](https://en.wikipedia.org/wiki/Grayscale) (of dimension (m, n)): single channel

Suppose we have images dog.png, fish.png, and lena.png of size m x n, each with RGB mode, RGBA mode, and Grayscale mode respectively. The corresponding code output would be as follows:

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

If you want to convert an image file with RGBA mode to RGB mode, you can refer to the code below.

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
- [Wikipedia](https://ko.wikipedia.org/wiki/RGBA_색_공간)