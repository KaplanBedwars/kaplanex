const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    navigate: (url) => ipcRenderer.send("navigate", url),
    canGoBack: () => ipcRenderer.invoke("can-go-back"),
    canGoForward: () => ipcRenderer.invoke("can-go-forward"),
    goBack: () => ipcRenderer.send("go-back"),
    goForward: () => ipcRenderer.send("go-forward"),
    reload: () => ipcRenderer.send("reload")
});
