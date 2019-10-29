const electron = require("electron");
const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;
let videoWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: { webSecurity: false, nodeIntegration: true },
    icon: __dirname + "/favicon.ico"
  });

  videoWindow = new BrowserWindow({
    backgroundColor: "white",
    width: 600,
    height: 600,
    parent: mainWindow,
    show: false,
    webPreferences: { nodeIntegration: true }
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  videoWindow.loadURL(
    isDev
      ? "http://localhost:3000/video"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.on("closed", () => (mainWindow = null));
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

ipcMain.on("toggle-video", (event, arg) => {
  videoWindow.show();
  videoWindow.webContents.send("video", arg);
});
