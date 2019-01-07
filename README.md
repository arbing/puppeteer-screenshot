# puppeteer-screenshot

Webpage screenshot API, using Puppeteer

- github https://github.com/arbing/puppeteer-screenshot
- docker hub https://hub.docker.com/r/arbing/puppeteer-screenshot

## 运行

### 调试运行

```sh
npm config set PUPPETEER_DOWNLOAD_HOST https://npm.taobao.org/mirrors

npm i -g nodemon

yarn install
yarn dev
```

### Docker 运行

```sh
docker run -d --restart always -p 8555:8555 --name puppeteer-screenshot arbing/puppeteer-screenshot
```

## API

### 接口路径

GET /
POST /

### 接口参数

| arguments      | type          | default    | required | desc                                                                      |
| -------------- | ------------- | ---------- | -------- | ------------------------------------------------------------------------- |
| device         | string        | iPhone 8   | false    | 模拟设备，可选值[参考][1]                                                 |
| url            | string        | -          | true     | 导航到的地址. 地址应该带有 http 协议, 比如 https://，[参考][2]            |
| html           | string        | -          | false    | 要渲染的 html 代码，[参考][3]                                             |
| timeout        | number        | 30 \* 1000 | false    | 跳转等待时间，单位是毫秒, 默认是 30 秒, 传 0 表示无限等待                 |
| waitUntil      | number        | load       | false    | 满足什么条件认为页面跳转完成，默认是 load 事件触发时                      |
| style          | string        | -          | false    | [参考][4]                                                                 |
| script         | string        | -          | false    | [参考][5]                                                                 |
| waitFor        | string/number | -          | false    | [参考][6]                                                                 |
| selector       | string        | body       | false    | 元素匹配指定选择器，默认是 body[参考][7]                                  |
| type           | string        | png        | false    | 截图类型, 可以是 jpeg 或者 png。默认 'png'[参考][8]                       |
| quality        | number        | -          | false    | 图片质量, 可选值 0-100. png 类型不适用。                                  |
| fullPage       | boolean       | false      | false    | 如果设置为 true，则对完整的页面（需要滚动的部分也包含在内）。默认是 false |
| clipX          | number        | 0          | false    | 裁剪区域相对于左上角（0， 0）的 x 坐标                                    |
| clipY          | number        | 0          | false    | 裁剪区域相对于左上角（0， 0）的 y 坐标                                    |
| clipWidth      | number        | 0          | false    | 裁剪的宽度                                                                |
| clipHeight     | number        | 0          | false    | 裁剪的高度                                                                |
| omitBackground | boolean       | false      | false    | 隐藏默认的白色背景，背景透明。默认不透明                                  |

[1]: https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js
[2]: https://zhaoqize.github.io/puppeteer-api-zh_CN/#?show=api-pagegotourl-options
[3]: https://pptr.dev/#?product=Puppeteer&show=api-pagesetcontenthtml-options
[4]: https://zhaoqize.github.io/puppeteer-api-zh_CN/#?show=api-pageaddstyletagoptions
[5]: https://zhaoqize.github.io/puppeteer-api-zh_CN/#?show=api-pageaddscripttagoptions
[6]: https://zhaoqize.github.io/puppeteer-api-zh_CN/#?show=api-pagewaitforselectororfunctionortimeout-options-args
[7]: https://zhaoqize.github.io/puppeteer-api-zh_CN/#?show=api-pageselector
[8]: https://zhaoqize.github.io/puppeteer-api-zh_CN/#?show=api-pagescreenshotoptions
