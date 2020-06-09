const path = require('path')
const fs = require('fs')
const request = require('request')

// ---- 下载类 ---- //
const StreamDownload = function() {
  // 声明下载过程回调函数
  var downloadCallback = null
}
StreamDownload.prototype.mkdirs = function(baseDir) {
  if (!fs.existsSync(baseDir)) {
    this.mkdirs(path.dirname(baseDir))
    fs.mkdirSync(baseDir)
  }
}
StreamDownload.prototype.showProgress = function(received, total) {
  const percentage = (received * 100) / total
  // 用回调显示到界面上
  this.downloadCallback('progress', percentage)
}
StreamDownload.prototype.downloadFile = function(patchUrl, baseDir, fileName, callback) {
  this.downloadCallback = callback // 注册回调函数

  const downloadFile = fileName

  let receivedBytes = 0
  let totalBytes = 0
  this.mkdirs(baseDir)
  const req = request({
    method: 'GET',
    uri: patchUrl
  }, (error, response, body) => {
    console.log('response, body, code', error, response.statusCode)
    if (response.statusCode !== 200) {
      this.downloadCallback('exception', 0)
    }
  })

  const out = fs.createWriteStream(path.join(baseDir, downloadFile))
  req.pipe(out)
  req.on('response', (data) => {
    // 更新总文件字节大小
    totalBytes = parseInt(data.headers['content-length'], 10)
    if (!totalBytes) {
      this.downloadCallback('exception', 0)
    }
  })
  req.on('data', (chunk) => {
    // 更新下载的文件块字节大小
    receivedBytes += chunk.length
    this.showProgress(receivedBytes, totalBytes)
  })
  req.on('end', () => {
    // console.log('下载已完成，等待处理')
    this.downloadCallback('success', 100)
  })
  req.on('error', () => {
    this.downloadCallback('exception', 0)
  })
}
module.exports = StreamDownload
