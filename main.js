const { app, BrowserWindow, ipcMain } = require('electron')
const url = require('url')
const path = require('path')
let win

// Set the path where recordings will be saved
// app.setPath("userData", __dirname + "/saved_recordings")

function createWindow() {

   win = new BrowserWindow({
      width: 1000,
      height: 750, 
      resizable: false,
      title: 'ElectronCam',
      webPreferences: {
        // devTools: false,
        nodeIntegration: true,
        enableRemoteModule: true
      },
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

// ipcMain.on("close:modal", (event) => {
//    inputModal.close();
//    mainWindow.webContents.send('close:modal');
// });

// ipcMain.on("upload:modal", (event, fileData) => {
//    inputModal.close();
//    mainWindow.webContents.send('upload:modal', fileData);
// });