const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');
const path = require('path');
require('electron-debug')({ showDevTools: false });
const yaml = require('js-yaml');
const fs = require('fs');

const activeInterfaces = ['udp', 'mqtt'];
const interfaces = {};
let currentTime = 0;

const interfaceCallback = command => {
    console.log(command);
}

//const config = {'callback': interfaceCallback, 'port': 5566};
let config;

const loadInterfaces = () => {
    activeInterfaces.map(interface => {
        interfaces.interface = require(`./interfaces/${interface}`)(config.interfaces[interface]);
    })
}

const loadConfig = () => {
    const configPath = path.join(__dirname, 'config.yaml');
    const configFile = fs.readFileSync(configPath, 'utf8');
    config = yaml.load(configFile);
    console.log(config.mediaDirectory);
}

const createWindow = async () => {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        fullscreen: true
    });

    ipcMain.on('current-time', (event, time) => {
        currentTime = time;
    })

    await win.loadFile('index.html');

    const mediaUrl = process.env.media;

    win.webContents.send('loadContent', mediaUrl);
    //win.webContents.send('command', 'hello');

    //setTimeout(() => win.webContents.send('command', 'pause'), 2000);
    //setTimeout(() => win.webContents.send('command', 'play'), 4000);
}

app.whenReady().then(() => {
    loadConfig();
    loadInterfaces();
    createWindow();
})  