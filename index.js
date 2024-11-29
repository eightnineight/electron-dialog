import { ipcMain, ipcRenderer, dialog } from 'electron';

const SHOW_OPEN_FILE_DIALOG = '415a0e88-36f8-48ad-b68b-049da1079ceb';
const SHOW_SAVE_FILE_DIALOG = '8ea8a1f8-9631-464e-8954-1e06877f42e3';
const SHOW_MESSAGE_BOX = 'fdf1c596-62c0-48d1-bbe6-84866c20ae99';
const SHOW_ERROR_BOX = 'b8a2a5b9-2d9b-482a-885c-6f433ef0b04d';

const mainInit = () => {
    ipcMain.handle(SHOW_OPEN_FILE_DIALOG, async (event, options) => {
        let result;
        let error;
        try {
            result = await dialog.showOpenDialog(options);
        } catch (e) {
            error = e;
        }
        return {
            result,
            error,
        };
    });
    ipcMain.handle(SHOW_SAVE_FILE_DIALOG, async (event, options) => {
        let result;
        let error;
        try {
            result = await dialog.showSaveDialog(options);
        } catch (e) {
            error = e;
        }
        return {
            result,
            error,
        };
    });
    ipcMain.handle(SHOW_MESSAGE_BOX, async (event, options) => {
        let result;
        let error;
        try {
            result = await dialog.showMessageBox(options);
        } catch (e) {
            error = e;
        }
        return {
            result,
            error,
        };
    });
    ipcMain.handle(SHOW_ERROR_BOX, async (event, options) => {
        let result;
        let error;
        try {
            result = dialog.showErrorBox(options);
        } catch (e) {
            error = e;
        }
        return {
            result,
            error,
        };
    });
}

const rendererShowOpenDialog = async (options) => {
    const data = await ipcRenderer.invoke(SHOW_OPEN_FILE_DIALOG, options);
    if (data?.error) {
        throw error
    }
    return data?.result;
}
const rendererSaveOpenDialog = async (options) => {
    const data = await ipcRenderer.invoke(SHOW_SAVE_FILE_DIALOG, options);
    if (data?.error) {
        throw error
    }
    return data?.result;
}
const rendererMessageBox = async (options) => {
    const data = await ipcRenderer.invoke(SHOW_MESSAGE_BOX, options);
    if (data?.error) {
        throw error
    }
    return data?.result;
}
const rendererErrorBox = async (options) => {
    const data = await ipcRenderer.invoke(SHOW_ERROR_BOX, options);
    if (data?.error) {
        throw error
    }
    return data?.result;
}

const dialogMain = {
    mainInit,
};

const dialogRenderer = {
    showOpenDialog: rendererShowOpenDialog,
    showSaveDialog: rendererSaveOpenDialog,
    showMessageBox: rendererMessageBox,
    showErrorBox: rendererErrorBox,
};

if (process?.type === 'browser') {
    mainInit();
}

export {
    dialogMain,
    dialogRenderer,
    rendererShowOpenDialog as showOpenDialog,
    rendererSaveOpenDialog as showSaveDialog,
    rendererMessageBox as showMessageBox,
    rendererErrorBox as showErrorBox,
};
