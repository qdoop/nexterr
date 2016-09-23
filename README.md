# nextError README
This is the README for VsCode extension __`nexterr`__.

By using this extension you can automate your daily _Build_ and _GotoErrorLine_ development cycles.

* __Continuously Build your code.__
* __Interactively Jump to source code lines with Errors/Warnings.__


## Features

* _Language agnostic._ A user supplied script builds your code.
* _Flexible._ Different conditions may trigger a rebuild. (Currenty when ever a file is saved)
* _Interactive._ Build errors/warnings are sequentially presented to the the user.
* _Time Saving._ When an error/warning is presented the editor jumps to source code line, highlights it and a Error/Warning MessageBox describes it.
* _Fast._ After fixing an error/warning just click `Next` to move on.
* _Clever._ A build cycle may interrupted by a newer one. (partial developed)
* _Self Activated._ When your project contains a top level `_next.json` file.


## Usage

Just add a `.next/build.cmd` shell script containing the commands that build your code.<br>
Also add a top level `_next.json` file for extension's proper self activation.

You may create these files by vscode menu `View > Command Palette..` and entering `nextError` at the prompt. 
This action also activates the extension.

> Tip: Currently only `gcc` style error lines are supported.<br>
Extension has been tested only under Linux gcc.

> Tip: There is a `demo` folder containing a sample `gcc` project for demonstration on Linux.

> Tip: You can directly play with extension's code locally.
(Don't forget to reopen vscode)<br>
`Windows: %USERPROFILE%\.vscode\extensions`<br>
`Mac/Linux: $HOME/.vscode/extensions`

## Internals (How it works)

When ever you save a file the extension executes your custom build script and starts parsing it's output (`stderr` in exact).

if an output line matches an error/warning line pattern source code location and textual information are extracted.

Uppon script's completion the collected information are sequentially presented to the user.

For each build error/warning the editor switches to the corresponding source code location, highlights it and a MessageBox describes the problem.

The user may fix this error or just move to the next one by closing the MessageBox.


## Requirements

TBD

## Known Issues

TBD

## Release Notes

### 0.16.50923

_160923_ Fixed typos

### 0.16.50920

_160920_ Fixed self activation isssue

### 0.16.50919

_160919_ Initial release of nexterr


-----------------------------------------------------------------------------------------------------------

**Enjoy!**