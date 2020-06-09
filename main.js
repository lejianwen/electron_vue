// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const { exec } = require('child_process')
const autoUpdate = require('./electron/updater')
const ipc = require('./electron/ipc')
// var Struct = require('ref-struct')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
// const lastReloadTime = new Date().getTime()

// 互斥体，是否单例应用
/* const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
  return
}
app.on('second-instance', (event, commandLine, workingDirectory) => {
  // 当运行第二个实例时,将会聚焦到myWindow这个窗口
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})*/

// 单例应用判断结束

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 960,
    // frame: false,
    autoHideMenuBar: true,
    // resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      webSecurity: false
    }
  })

  // and load the index.html of the app.
  // mainWindow.loadFile('./dist/index.html')
  if (process.env.NODE_ENV === 'development') {
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL('http://localhost:9002/index.html')
  } else {
    // mainWindow.webContents.openDevTools()
    mainWindow.loadFile('./dist/index.html')
  }

  // 是否在关闭时弹窗
  /* mainWindow.on('close', (e) => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    e.preventDefault()
    dialog.showMessageBox({
      type: 'info',
      title: '提示',
      defaultId: 0,
      message: '确定要关闭吗？',
      buttons: ['最小化', '直接退出']
    }).then((res) => {
      if (res.response === 0) {
        mainWindow.minimize()	// 调用 最小化实例方法
      } else {
        mainWindow = null
        app.exit()		// exit()直接关闭客户端，不会执行quit();
      }
    })
  })*/
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  autoUpdate(mainWindow)
  ipc(mainWindow)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
