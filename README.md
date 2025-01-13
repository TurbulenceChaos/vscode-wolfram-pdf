# vscode-wolfram-pdf
## Introduction
Convert wolfram script to pdf and cdf file, then show interactive result in wolfram player.

![vscode wolfram player test](Images/vscode-wolfram-player-test.png)

## Install and configuration

1. Install from the vsix file.

2. Make sure you have `wolframscript` and `wolframplayer` in your `PATH`.

3. Configure wolfram player path in your Settings.json.
    ```JSON
    {
        "wolframPlayer.path": "/usr/local/Wolfram/WolframEngine/14.1/Executables/wolframplayer"
    }
    ```

## Usage

Open your wolfram script file and click the <kbd>Play it</kbd> button. 

## Development and build

Debug with vscode extension development (<kbd>F5</kbd>).

Use `vsce` to build the package.
```sh
vsce package
```

No `node_modules`

## Reference

<https://github.com/asukaminato0721/mmaplayer>