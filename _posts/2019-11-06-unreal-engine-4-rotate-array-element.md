---
layout: post
title: Unreal Engine 4 - Rotate Array Element
date: 2019-11-06 00:53:00
image: '/assets/images/unreal-engine-4-rotate-array-element-thumb.png'
description: "When I’m developing my game, I want to switch weapon by array object actor ( weapon ) so, for example I have an array like this [0, 1, 2, 3, 4] I want to able rotate array value by index to something like this"
tags:
- Unreal Engine 4
---

![Unreal Engine 4 - Rotate Array Element Function](/assets/images/unreal-engine-4-rotate-array-element-thumb.png "Unreal Engine 4 - Rotate Array Element Function"){:style="display: block; margin: auto"}

When I'm prototyping my game, I want to switch weapon by array object actor ( weapon ).

so, for example I have an array like this

```js
[0, 1, 2, 3, 4]
```

I want to able rotate array value by index to something like this
```js
// Rotate to right
[4, 0, 1, 2, 3]
[3, 4, 0, 1, 2]
// Rotate to left
[1, 2, 3, 4, 0]
[2, 3, 4, 0, 1]
```

This is my first approach function.

![Unreal Engine 4 - Rotate Array Element Function](/assets/images/unreal-engine-4-rotate-array-element.png "Unreal Engine 4 - Rotate Array Element Function"){:style="display: block; margin: auto"}

For debugging purpose I make variable string (ArrTest).

![Unreal Engine 4 - Rotate Array Element Function](/assets/images/unreal-engine-4-rotate-array-element2.png "Unreal Engine 4 - Rotate Array Element Function"){:style="display: block; margin: auto"}

then make local variable for last / first array, and after that we delete last / first array, and final step is append array.

because append is self assign, we need assign temp array to original array when we rotate to right.

by using function we need set temp array type, that is the problem.

I want the type of array is dynamic / wildcard, it can be done in macro.

so let's rewrite / whatever is in macro.

and this is my result, and minify logic

![Unreal Engine 4 - Rotate Array Element Function](/assets/images/unreal-engine-4-rotate-array-element3.png "Unreal Engine 4 - Rotate Array Element Function"){:style="display: block; margin: auto"}

using macro make's more dynamic, no more set array type

### NOTE

honestly we don't need store boolean variable (Is Move Right)

we need clear local array wildcard because local variable on macro is storing variable from the last action, so we need to clear all array first

so now you can rotate any array type.