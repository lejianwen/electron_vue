const { autoUpdater } = require('electron-updater')
const { ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const url = 'http://localhost/zip' // 更新包位置
// 执行自动更新检查
function autoUpdate(mainWindow) {
  if (process.env.NODE_ENV === 'production' && url) {
    autoUpdater.setFeedURL(url)

    autoUpdater.on('checking-for-update', function() {
      mainWindow.webContents.send('console', { type: 'info', message: 'check update' })
    })
    autoUpdater.on('update-available', function(info) {
      // mainWindow.webContents.send('update-available')
    })
    autoUpdater.on('update-downloaded', function(info) {
      mainWindow.webContents.send('update-available')
    })
    autoUpdater.on('update-not-available', function(info) {
    })
    // confirm-update
    ipcMain.on('confirm-update', (e, args) => {
      autoUpdater.quitAndInstall()
    })
    autoUpdater.checkForUpdates()
  }
}

module.exports = autoUpdate
