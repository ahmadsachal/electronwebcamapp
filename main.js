const { app, BrowserWindow, ipcMain } = require('electron')
const url = require('url')
const path = require('path')
let win

// Set the path where recordings will be saved
// app.setPath("userData", __dirname + "/saved_recordings")

function createWindow() {

   win = new BrowserWindow({
      width: 900,
      height: 650, 
      resizable: false,
      title: 'ElectronCam',
      webPreferences: {
        // devTools: false,
        nodeIntegration: true,
        enableRemoteModule: true
      },
      frame: false,
      transparent: true
    });
  
    win.center();
    win.loadFile('index.html');
    win.setMenuBarVisibility(false);
   //  win.webContents.openDevTools()
}

// app.on('ready', createWindow)

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


ipcMain.on("action:main", (event, action) => {
  action === "close" ? win.close() : win.minimize();
})