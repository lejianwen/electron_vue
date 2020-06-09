const { ipcMain } = require('electron')

function ipc(mainWindow) {
  // 测试通信
  setTimeout(() => {
    mainWindow.webContents.send('console', { type: 'console', message: 'test ipc' })
  }, 3000)
  ipcMain.on('test', (e, args) => {
    console.log('test ipc success!!!', args)
    e.sender.send('message', { type: 'success', message: 'ipc通信成功' })
  })
}

module.exports = ipc
