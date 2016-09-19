# nextError README
This is the README for VsCode extension __`nexterr`__.

By using this extension you can automate your daily _build_ and _GotoErrorLine_ development cycles.

* __Continuously Build your code.__
* __Interactively Jump to source code lines with Errors/Warnings.__

<!--
This is the README for your extension "nexterr". After writing up a brief description, we recommend including the following sections.
-->

## Features

* _Language agnostic._ A user supplied script builds your code.
* _Flexible._ Different conditions may trigger a rebuild. (Currenty when ever a file is saved)
* _Interactive._ Build errors/warnings are sequentially presented to the the user.
* _Time Saving._ When an error/warning is presented the editor jumps to source code line, highlights it and a Error/Warning MessageBox describes it.
* _Fast._ After fixing an error/warning just click `Next` to move on.
* _Clever._ A build cycle may interrupted by a newer one. (partial developed)
* _Self Activated._ When your project contains a top level `.next` folder.

<!--
Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.
-->

## Usage

Just add a `.next/build.cmd` shell script containing the commands that build your code.

You may create this file by vscode menu `View > Command Palette..` and entering `nextError` at the prompt. 
This action also activates the extension.

> Tip: Currently only `gcc` style error lines are supported.<br>
Extension has been tested only under Linux gcc.

> Tip: There is a `demo` folder containing a sample `gcc` project for demonstration on Linux.

> Tip: You can directly play with extension's code locally.
(Dont forget to reopen vscode)<br>
`Windows: %USERPROFILE%\.vscode\extensions`<br>
`Mac/Linux: $HOME/.vscode/extensions`

## Internals (How it works)

When ever you save a file the extension executes your custom build script and starts parsing it's output (`stderr` in exact).

if an output line matches an error/warning line pattern source code location and textual information are extracted.

Uppon scripts completion the collected information are sequentially presented to the user.

For each build error/warning the editor switches to the corresponding source code location, highlights it and a MessageBox describes the problem.

The user may fix this error or just move to the next one by clossing the MessageBox.


## Requirements

TBD

<!--
If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

// Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

// For example:

// This extension contributes the following settings:

// * `myExtension.enable`: enable/disable this extension
// * `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.
-->

## Release Notes
<!--
Users appreciate release notes as you update your extension.
-->
### 0.16.50919

Initial release of ...


-----------------------------------------------------------------------------------------------------------
<!--
// ## Working with Markdown

// **Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

// * Split the editor (`Cmd+\` on OSX or `Ctrl+\` on Windows and Linux)
// * Toggle preview (`Shift+CMD+V` on OSX or `Shift+Ctrl+V` on Windows and Linux)
// * Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (OSX) to see a list of Markdown snippets

// ### For more information

// * [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
// * [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)
-->

**Enjoy!**