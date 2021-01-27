---
title: "Title"
date: "2000-01-01"
template: "post"
draft: false
path: "/archive/branding/test"
description: "none"
category: "Branding"
---

## Template for Branding

point estimation을 통해 우리가 알아내고자 하는 궁극적인 목표 값은 parameter $\theta$ 입니다. 이는 고정된 값이긴 하지만 **unknown**입니다. 그렇기에 우리가 가진 data points {$x^{(1)},\cdots,x^{(m)}$} 를 사용해서 그나마 정답에 가까운 parameter $\hat\theta$ 을 추정합니다. 다음와 같은 식을 통해 $\hat\theta$ 을 표현할 수 있고, 이를 **point estimator**라고 합니다.
$$
\hat\theta_m = g(x^{(1)},\cdots,x^{(m)})
$$


point estimator는 함수의 입력으로 data points를 넣어서 생성된 출력 값의 형태로 해석됩니다. 근데 여기서 data는 random process를 통해 도출된 값 즉, data generation process를 통해 생성되기 때문에, 결국 **$\hat\theta$ 는 확률 변수(random variable)**입니다