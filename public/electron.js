const electron = require("electron");
const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;
let imageWindow;
let videoWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: { webSecurity: false, nodeIntegration: true },
    icon: __dirname + "/favicon.ico"
  });
  imageWindow = new BrowserWindow({
    width: 750,
    height: 750,
    parent: mainWindow,
    show: false,
    webPreferences: { nodeIntegration: true }
  });
  videoWindow = new BrowserWindow({
    width: 750,
    height: 750,
    parent: mainWindow,
    show: false,
    webPreferences: { nodeIntegration: true }
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  imageWindow.loadURL(
    isDev
      ? "http://localhost:3000/image"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  videoWindow.loadURL(
    isDev
      ? "http://localhost:3000/video"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.on("closed", () => (mainWindow = null));
  imageWindow.on("close", e => {
    e.preventDefault();
    imageWindow.hide();
  });
  videoWindow.on("close", e => {
    e.preventDefault();
    videoWindow.hide();
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("toggle-image", (event, arg) => {
  imageWindow.show();
  imageWindow.webContents.send("image", arg);
});

ipcMain.on("toggle-video", (event, arg) => {
  videoWindow.show();
  videoWindow.webContents.send("video", arg);
});
