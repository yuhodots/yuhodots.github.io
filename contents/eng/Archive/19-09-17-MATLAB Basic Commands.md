---
title: "MATLAB Basic Commands"
date: "2019-09-17"
template: "post"
draft: false
path: "/cheatsheet/19-09-17/"
description: "This post is based on the orientation lecture from the Numerical Analysis course I took last year. The MATLAB interface typically consists of a directory on the left, a script editor in the center, a workspace (variables and values) on the right, and a command window at the bottom. On Mac, use the Command key instead of Ctrl."
category: "Cheat Sheet"
---

> *This post is based on the orientation lecture from the Numerical Analysis course I took last year.*

### Setting

 The MATLAB interface typically consists of a **directory** on the left, a **script editor** in the center, a **workspace** (variables and values) on the right, and a **command window** at the bottom. If you call an external function, note that MATLAB searches within the current folder by default, so pay attention to your path settings.

### Tips

On Mac, use the Command key instead of Ctrl.

- Ctrl+C: Stop execution when the command window enters an infinite loop
- Ctrl+R: Comment out a block
- clear: Reset all values stored in the workspace
- clc: Clear the command window
- %%: Split into sections
- Ctrl+Enter: Run the current section
- Using ' ; ' at the end of a statement stores the value without displaying it in the command window
- For data processing, look into functions like **textread**, **legend**, etc.

### Data Types & Variables

- realmin: The smallest positive number that can be represented

- realmax: The largest positive number that can be represented

- pi: The value of pi

- i, j: imaginary unit

- cells: An array that can freely store arbitrary objects, created with '{ }'

  ```
  x = { [1 2 3], 'one two three', 6+7i }
  ```

- array: An array created with '[ ]'

  ```
  A = [8 1 6; 3 5 7; 4 9 2]
  B = [1 2 3
  	4 5 6]
  ```

### Operators

- Arithmetic operators are mostly similar to C/C++

- Logical operator: & (AND), | (OR), ~ (NOT)

- Element-wise operator: **.\* ./ .^**

  ```
  [1 2 3].*[5 6 7] == [5 12 21]
  ```

### Functions

- Function syntax: function[output argument] = function_name(input argument)

  ```
  x = solve(2)
  ```

- nargin: number of argument input

- nargout: number of argument output

- When one function handles another function, prefix it with '@'

  ```
  fplot( @sin, [0 2*pi] )
  ```

- **feval**: function evaluate

  ```
  feval(name of the function to handle, arguments to pass to that function)
  ```

- **In-line function**: A feature for creating a simple one-line function

  ```
  function_name = inline('expression', 'val1', 'val2', ...)
  ```

### Format

 The format command controls how MATLAB displays numbers in the command window. MATLAB automatically rounds numbers when there are more digits than can be displayed. In such cases, be careful when using the round function (which rounds to the nearest decimal place or integer), as combining it with format settings may produce incorrect results.

- format short: 5-digit representation
- format long: 16-digit representation

### Input, Output

- Input: variable = input('prompt message')

  ```
  A = input('Enter expression: ')
  ```

- Output: fprintf('output format for values', values)

  - **%w.df**: floating point notation
  - **%w.de**: exponential notation
  - w is the number of integer digits, d is the number of decimal digits
  - n: line break

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

- zeros: An m*n array of zeros

  ```
  x = zeros(1, 5)
  ```

- ones: An m*n array of ones

  ```
  x = ones(1, 5)
  ```

- **rand**: An m*n array of uniformly distributed random numbers

  ```
  x = rand(1, 5)
  ```

- **eye**: An m*m identity matrix

  ```
  x = eye(5)
  ```

- **length**: The length of vector x

- **size**: Stores the number of rows and columns of an array in m and n

- reshape: Fills a matrix element by element, column by column

- prod: Product of elements in the same column

- sum: Sum of elements in the same column

- cross: Cross product of vectors

- dot: Dot product of vectors

- index: Extracts a specific element value from a matrix using its index

### Graph

- plot syntax: plot(x, y, 'color : symbol')

- hold on: Allow overwriting on the current plot

- hold off: End hold on

- grid on: Enable grid lines in the graph

- xlabel: Label the x-axis

  ```
  xlabel('x axis')
  ```

- ylabel: Label the y-axis

  ```
  ylabel('y axis')
  ```

- title: Set the graph title

  ```
  title('x-y graph')
  ```

- gtext: Place text at the location where you left-click

  ```
  gtext('sin x');
  ```

- close: Close the graph from the command window

- **meshgrid**: Creates x and y values in a grid format for plotting 3D graphs that include z values

- **mesh**: Outputs a 3D graph with x, y, and z values

- contour: Displays a 3D graph as a 2D contour plot
