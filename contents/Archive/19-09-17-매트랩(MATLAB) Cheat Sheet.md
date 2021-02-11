---
title: "매트랩(MATLAB) Cheat Sheet"
date: "2019-09-17"
template: "post"
draft: false
path: "/cheatsheet/19-09-17/"
description: "이 글은 제가 작년에 수강한 수치해석 과목의 orientation 수업 내용을 바탕으로 정리되었습니다. 일반적으로는 좌측에 디렉토리, 중앙에 스크립트, 우측에 작업공간 (변수와 값), 하단에 명령 창으로 이루어져 있습니다. 맥의 경우에는 ctrl이 아니라 command 버튼을 눌러야 합니다."
category: "Cheat Sheet"
---

> *이 글은 제가 작년에 수강한 수치해석 과목의 orientation 수업 내용을 바탕으로 정리되었습니다.*

### Setting

 일반적으로는 좌측에 **디렉토리**, 중앙에 **스크립트**, 우측에 **작업공간** (변수와 값), 하단에 **명령 창**으로 이루어져 있습니다. 혹시 외부 함수를 call 하는 경우에는 기본적으로 같은 폴더를 기준으로 파일을 찾기 때문에 경로설정에 유의해야 합니다.

### Tips

맥의 경우에는 ctrl이 아니라 command 버튼을 눌러야 합니다.

- Ctrl+C: 명령창 무한루프 시 실행 중지
- Ctrl+R: 단체 주석
- clear: 작업 공간에 저장된 값 초기화
- clc: 명령창 초기화
- %%: section 분할
- Ctrl+Enter: section run
- ' ; ' 기호를 사용하면 값을 명령창에 띄우지 않고 저장만 함
- 자료 처리와 관련해서는 **textread**, **legend** 등 기능 찾아보기

### Data Types & Variables

- realmin: 사용 가능한 가장 작은 양수

- realmax: 사용 가능한 가장 큰 양수

- pi: 파이값

- i, j: imaginary unit

- cells: 임의의 object를 자유롭게 저장하는 array, '{ }' 기호로 생성

  ```
  x = { [1 2 3], 'one two three', 6+7i }
  ```

- array: 배열, '[ ]' 기호로 생성

  ```
  A = [8 1 6; 3 5 7; 4 9 2]
  B = [1 2 3
  	4 5 6]
  ```

### Operators

- Arithmetic operator는 대부분이 C, C++과 비슷

- Logical operator: & (AND), | (OR), ~ (NOT)

- Element-wise operator: **.\* ./ .^**

  ```
  [1 2 3].*[5 6 7] == [5 12 21]
  ```

### Functions

- function 형태: function[output argument] = 함수이름(input argument)

  ```
  x = solve(2)
  ```

- nargin: number of argument input

- nargout: number of argument output

- 한 function이 다른 function을 다룰 때, '@' 기호를 앞에 붙임

  ```
  fplot( @sin, [0 2*pi] )
  ```

- **feval**: function evaluate

  ```
  feval(handle할 function의 이름, 그 function에 넣을 argument)
  ```

- **In-line function**: 한 줄로 간단하게 function을 만들 수 있는 기능

  ```
  함수이름 = inline('expressin', 'val1', 'val2', ...)
  ```

### Format

 format 명령은 MATLAB이 명령 창에 숫자를 표시하는 방식을 제어합니다. MATLAB은 숫자에 표시할 수 없는 추가 자릿수가 있을 경우 숫자를 자동으로 반올림 하는데, 이 경우 가장 가까운 소수 자릿수 또는 정수로 반올림 하는 함수인 round를 함께 사용하면 결과 올바르지 않게 나올 수 있으니 주의해야 합니다.

- format short: 5-digit 표현
- format long: 16-digit 표현

### Input, Output

- Input: 값을 넣을 변수 = input('띄울 문구')

  ```
  A = input('Enter expression: ')
  ```

- Output: fprintf('띄울 값들의 output 포맷', 띄울 값들)

  - **%w.df**: floating point notation
  - **%w.de**: exponential notation
  - w는 정수파트의 자릿수, d는 소수파트의 자릿수를 의미
  - n: 한 줄 띄우기

  ```
  fprintf('%4.1f %11.6f\n', X(i), sin(X(i)));
  fprintf('Y equals %f and Z equals %f\n',Y,Z);
  ```

### Array manipulation

- **colon operator**: x first : increment : x last

  ```
  x = 0 : 0.25 : 1
  ```

- **Line space**: linespace(x first, x last, n)

  ```
  x = linespace(0, 2*pi, 10)
  ```

- **Log space**: logspace(log first, log last, n)

  ```
  x = logspace(0, 1, 5)
  ```

- zeros: m*n 형태의 0 array

  ```
  x = zeros(1, 5)
  ```

- ones: m*n 형태의 1 array

  ```
  x = ones(1, 5)
  ```

- **rand**: m*n 형태의 균일하게 분포된 난수 array

  ```
  x = rand(1, 5)
  ```

- **eye**: m*m 형태의 단위행렬

  ```
  x = eye(5)
  ```

- **length**: 벡터 x의 길이

- **size**: array의 행과 열을 m과 n에 저장

- reshape: column을 기준으로 element 하나씩 행렬에 입력

- prod: 같은 column elements의 곱

- sum: 같은 column elements의 합

- cross: 벡터의 외적, 크로스 곱

- dot: 벡터의 내적, 도트 곱

- index: 행렬에서 특정 원소 값을 얻고 싶을 때 index를 이용해서 그 값을 추출

### Graph

- plot 형태: plot(x, y, 'color : symbol')

- hold on: 현재 plot에 대해 overwriting 허용

- hold off: hold on 종료

- grid on: 그래프 내 그리드 활성화

- xlabel: x축에 글 작성

  ```
  xlabel('x axis')
  ```

- ylabel: y축에 글 작성

  ```
  ylabel('y axis')
  ```

- title: 그래프의 제목 작성

  ```
  title('x-y 그래프')
  ```

- gtext: 마우스 좌클릭 하는 곳에 글 입력

  ```
  gtext('sin x');
  ```

- close: 명령 창에서 그래프 닫기

- **meshgrid**: z값이 포함된 3차원 그래프를 그리기 위해 그에 해당하는 x와 y값을 각각 바둑판 형식으로 표현한 것

- **mesh**: x, y, z 값을 갖는 3차원 그래프 출력

- contour: 3차원 그래프를 2차원의 등고선 그래프 형태로 출력