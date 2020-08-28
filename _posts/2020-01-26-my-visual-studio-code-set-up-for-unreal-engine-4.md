---
layout: post
title: My Visual Studio Code Set Up For Unreal Engine 4
date: 2020-01-26 00:53:00
image: '/assets/images/my-visual-studio-code-set-up-for-unreal-engine-4.png'
description: "This is my set up Visual Studio Code for Unreal Engine 4 C++ development, because I don’t really like Visual Studio IDE and I really like Visual Studio Code because is so lightweight and a lot of features"
tags:
- Unreal Engine 4
---

![My Visual Studio Code Set Up For Unreal Engine 4](/assets/images/my-visual-studio-code-set-up-for-unreal-engine-4.png "My Visual Studio Code Set Up For Unreal Engine 4"){:style="display: block; margin: auto"}

This is my set up Visual Studio Code for **Unreal Engine 4** C++ development, because I don't really like Visual Studio IDE and I really like Visual Studio Code because is so lightweight and a lot of features.

so first off all we need to install C++ and C# compiler.

### Build Tools for Visual Studio

download **Build Tools for Visual Studio 2019** from [https://visualstudio.microsoft.com/downloads/](https://visualstudio.microsoft.com/downloads/)

**All Downloads &nbsp; 🡆 &nbsp; Tools for Visual Studio 2019 &nbsp; 🡆 &nbsp; Build Tools for Visual Studio 2019**

![Build Tools](/assets/images/my-visual-studio-code-set-up-for-unreal-engine-4-1.png "Build Tools"){:style="display: block; margin: auto"}

### Install Compiler

This my setting for install C++ and C# compiler.

![C++ compiler](/assets/images/my-visual-studio-code-set-up-for-unreal-engine-4-3.png "C++ compiler"){:style="display: block; margin: auto"}

![C# compiler](/assets/images/my-visual-studio-code-set-up-for-unreal-engine-4-2.png "C# compiler"){:style="display: block; margin: auto"}

### Visual Studio Code Extensions

- [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)
- [C#](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp)
- [C++ Intellisense](https://marketplace.visualstudio.com/items?itemName=austin.code-gnu-global)
- [ue4-snippets](https://marketplace.visualstudio.com/items?itemName=Nicolas-Zhu.ue4-snippets)
- [Unreal Engine 4 Snippets](https://marketplace.visualstudio.com/items?itemName=CAPTNCAPS.ue4-snippets)

Install all above Visual Studio Code extensions.

### Unreal Engine Editor Preferences

Change Source Code Editor To **Visual Studio Code**.

**Edit &nbsp; 🡆 &nbsp; Editor Preferences &nbsp; 🡆 &nbsp; Source Code**

![Editor Preferences](/assets/images/my-visual-studio-code-set-up-for-unreal-engine-4-4.png "Editor Preferences"){:style="display: block; margin: auto"}

### Compile In Visual Studio Code

You can go with

**Terminal &nbsp; 🡆 &nbsp; Run Build Task &nbsp; 🡆 &nbsp; Editor Win64 Development Build**

or with shortcut

**CTRL + SHIFT + B &nbsp; 🡆 &nbsp; Editor Win64 Development Build**

and make sure you're using default terminal (**Command Prompt**)

when you compile success while your project still open it will trigger **Hot Reload**.

![Hot Reload](/assets/images/my-visual-studio-code-set-up-for-unreal-engine-4-5.png "Hot Reload"){:style="display: block; margin: auto"}