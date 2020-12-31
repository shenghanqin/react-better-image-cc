# @xiaoxili/react-better-image-cc

> Webp图片压缩、图片懒加载组件

[![NPM](https://img.shields.io/npm/v/@xiaoxili/react-better-image-cc.svg)](https://www.npmjs.com/package/@xiaoxili/react-better-image-cc) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## 基础原理
目前版本是基于七牛云、腾讯云数据万象的图片压缩及图片转换方法。

各厂商均已支持图片压缩和图片格式转换。

* [七牛云](https://developer.qiniu.com/dora/1279/basic-processing-images-imageview2)
* [腾讯云](https://cloud.tencent.com/document/product/460/6929)
* [阿里云](https://help.aliyun.com/document_detail/44703.html?spm=a2c4g.11186623.2.12.6a16720dY6VPM0#concept-mf3-md5-vdb)
* [京东云](https://docs.jdcloud.com/cn/object-storage-service/convert-format)
* [又拍云](https://help.upyun.com/knowledge-base/image/)
* [华为云](https://support.huaweicloud.com/fg-obs/obs_01_0471.html)
* [百度云](https://cloud.baidu.com/doc/BOS/s/Akdzs4xua)

## Install

```bash
npm install --save @xiaoxili/react-better-image-cc
```

### 注意点

图片懒加载组件依赖 `IntersectionObserver` 来判断是否在视图之内，这个方法在老旧浏览器中不支持，需要在 `app.js` 中导入 `intersection-observer`。

```bash
npm install --save intersection-observer
```

```js
// app.js
import 'intersection-observer'
```
![](https://image-hosting.xiaoxili.com/img/img/20201231/147c76a65eff0b7f080dda128059b53f-c6f65d.png)

## Usage

### 图片懒加载组件

```tsx
import React, { Component } from 'react'

import BetterImage from '@xiaoxili/react-better-image-cc'

class Example extends Component {
  render() {
    return (
      <>
        {/* 图片比例确定，宽高不定，需要覆盖的样式较多。 */}
        <div className="image">
          <BetterImage ratio={9 / 16} src={'图片地址'} maxImageWidth={1200} />
        </div>
        {/* 图片区域宽高确定 */}
        <div className='image'>
          <BetterImage width={200} height={112} src={'图片地址'} maxImageWidth={800} />
          <BetterImage ratio={9 / 16} src={'图片地址'} maxImageWidth={1200} />
        </div>
      </>
    )
  }
}
```

### Webp 图片压缩及判断 Webp 的方法

* `getWebpByWidth('图片地址', 1000)` ：自动获取 Webp 格式图片，并且按照宽度缩放
* 
* `getImgByWidth('图片地址', 1000)` ：只支持按照宽度缩放
* `getWebpSupport()` 判断是否支持 Webp 图片格式，需要注意的是，通过加载一张 Base64 Webp 图片，有一定的延迟。
* `checkCanvasWebP()` 判断是否支持 Webp 图片格式，但在 Safari 最新版本浏览器中无效。


```js
import { checkCanvasWebP, getWebpByWidth, getWebpSupport } from '@xiaoxili/react-better-image-cc'

const a = getWebpByWidth('图片地址', 1000);
const b = getImgByWidth('图片地址', 1000);

console.log('是否支持Webp', getWebpSupport())
console.log('是否支持Webp', checkCanvasWebP())

```

## License

MIT © [https://github.com/shenghanqin/](https://github.com/https://github.com/shenghanqin/)
