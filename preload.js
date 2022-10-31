const { contextBridge, ipcRenderer } = require('electron')

console.log('loading preload');

contextBridge.exposeInMainWorld('bridge', {
    setCurrentTime: (time) => ipcRenderer.send('current-time', time),
    command: (message) => {
        ipcRenderer.on('command', message);
    },
    loadContent: (content) => {
        ipcRenderer.on('loadContent', content);
    }
})