# electron-dialog

Use main process dialogs in renderer process

## Install

```
npm install @eightnineight/electron-dialog
```

## Usage

main process

```js
import { dialogMain } from "@eightnineight/electron-dialog";

dialogMain.init();
```

renderer process

```js
import { dialogRenderer } from "@eightnineight/electron-dialog";

let file;

// the parameters are the same as those in the original electron showOpenDialog()
file = await dialogRenderer.showOpenDialog({
    title: "Open File",
    buttonLabel: "Open",
});
if (!file.canceled) {
    console.log("open:", file.filePath);
}

// the parameters are the same as those in the original electron showSaveDialog()
file = await dialogRenderer.showSaveDialog({
    title: "Save File",
    buttonLabel: "Save",
});
if (!file.canceled) {
    console.log("save:", file.filePath);
}

// the parameters are the same as those in the original electron showMessageBox()
dialogRenderer.showMessageBox({
    type: "info",
    title: "Message",
    message: "Message Box",
});

// the parameters are the same as those in the original electron showErrorBox()
dialogRenderer.showErrorBox({
    title: "Error",
    content: "Unknown",
});
```
