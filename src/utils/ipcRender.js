// eslint-disable-next-line no-undef
const ipcR = window.ipcRenderer
import { MessageBox, Message } from 'element-ui'

export function ipcOn(channel, callback) {
  ipcR.on(channel, (e, ...args) => {
    callback(e, ...args)
  })
}
ipcOn('update-available', () => {
  MessageBox.confirm('有新版本，要现在关闭软件并更新么？', '更新', {
    confirmButtonText: '关闭并更新',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ipcR.send('confirm-update')
  }, () => {

  })
})
ipcOn('message', (e, args) => {
  Message({ ...args })
})
ipcOn('console', (e, ...args) => {
  console.log(args)
})
// ipc通信测试
export function ipcTest() {
  ipcR.send('test', 'test ipc to main!!!')
}
