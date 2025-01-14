// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const path = require("path");
const { spawn } = require("child_process");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("wolfram.player", () => {
      const { activeTextEditor } = vscode.window;
      if (
        !(
          activeTextEditor && activeTextEditor.document.languageId === "wolfram"
        )
      ) {
        return;
      }
      const { document } = activeTextEditor;
      const filePath = document.uri.fsPath;

      const child = spawn("wolframscript", [
        "-script",
        path.join(__dirname, "Wolfram-pdf/WolframPDF.wl"),
        filePath,
      ]);

      child.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
      });

      child.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });

      child.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
        if (code === 0) {
          const cdfFilePath = filePath.replace(/\.[^/.]+$/, ".cdf");
          const playerPath = vscode.workspace
            .getConfiguration("wolfram.player")
            .get("path");
          if (playerPath) {
            const cdfDir = path.dirname(cdfFilePath);
            const cdfFileName = path.basename(cdfFilePath);
            const player = spawn(playerPath, [cdfFileName], { cwd: cdfDir });
            player.on("error", (err) => {
              vscode.window.showErrorMessage(
                `Failed to start player: ${err.message}`
              );
            });
          } else {
            vscode.window.showErrorMessage("Player path is not configured.");
          }
        }
      });
      vscode.window.showInformationMessage(
        `Convert ${path.basename(filePath)} to pdf.`
      );
    })
  );
}

// This method is called when your extension is deactivated
function deactivate() {
  // No need to manage child process here as it's created per command execution
}

module.exports = {
  activate,
  deactivate,
};
