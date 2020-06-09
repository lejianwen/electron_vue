# electron + vue + element 开发基础

## 先配置国内淘宝镜像
~~~
~/.npmrc 中添加

registry=https://registry.npm.taobao.org
disturl=https://npm.taobao.org/dist
sass-binary-site=http://npm.taobao.org/mirrors/node-sass/
electron_mirror=https://npm.taobao.org/mirrors/electron/
~~~


## 开发时
* 先运行 ***npm run serve*** 启动 vue开发模式
* 再运行 ***npm run start*** 启动electron 会加载vue的页面

## 打包
* ***npm run build***  打包vue
* ***npm run electron_build*** 打包electron-builder
* ***npm run vue_electron_build*** 会先运行vue打包，再将静态文件通过electron-builder打包

## 开发方式

* 一般情况和开发网页类似，使用了element组件
* 如果需要调用node api， 需要通过icpRender与主进程通信，或者在preload使用node api，preload支持部分node api， 具体情况可看主进程和渲染进程相关知识
* ipcRender在render.js中挂载到了window.ipcRender中， ipcRender相关可放在 utils/ipcRender.js 中

## 其他  
* 自动更新 ***build.publish.url*** 为服务器最新版地址，需要与 ***./electron/updater.js***中的url保持一致,打包后将生成的 ***builder/latest.yml*** 和 ***builder/xxxx.exe*** 放到该url下，自动更新只在环境为production并且配置url时生效
* 遇到打包时nsis等文件下载问题，参考 [issue](https://github.com/electron-userland/electron-builder/issues/1859)

