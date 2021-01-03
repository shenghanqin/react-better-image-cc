/**
 * 图片模块
 */

/**
 * 判断浏览器是否兼容 Webp 格式图片
 */
let isSupportWebp = false
const uaStr = window.navigator.userAgent.toLowerCase()
function checkWebp() {
  // 在 iPhone、iPad、Mac Safari 上使用加载 Webp 方式
  if (uaStr.includes(`iphone`) || uaStr.includes(`ipad`) || (uaStr.includes(`macintosh`) && uaStr.includes(`version/`))) {
    checkLoadWebp()
    return
  }
  isSupportWebp = checkCanvasWebP()
}
checkWebp()

export function checkLoadWebp() {
  var img = new Image()
  img.onload = function () {
    isSupportWebp = !!(img.height > 0 && img.width > 0)
  }
  img.onerror = function () {
    isSupportWebp = false
  }
  img.src = `data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=`
}

export const getWebpSupport = () => isSupportWebp

/**
 * 支持 Chrome、Firefox 浏览器
 * Safari 14支持 webp 格式，但 dataUrl 中还是 image/png
 */
export function checkCanvasWebP(): boolean {
  const ele = document.createElement('canvas')
  if (ele && typeof ele.toDataURL === 'function') {
    const dataUrl = ele.toDataURL('image/webp') || ''
    return dataUrl.indexOf('data:image/webp') === 0
  }
  return false
}

/**
 * 获取图片原始地址（去除已拼接的裁剪参数）
 * @param {string} url 图片地址
 * @returns {string} 获取的源图片地址
 */
export function getOriginImgUrl(url = ''): string {
  const originUrl = url.split('?').length > 0 ? url.split('?')[0] : url

  return originUrl || ''
}

/**
 * 默认返回原格式
 * 传入原始图片url，根据指定宽度获取图片地址，宽度大于`width`的时候会等比缩放至该宽度
 * 原始宽度小于目标宽度，图片不缩放
 *
 * @param {string} url 传入的图片地址
 * @param {number} width 指定的图片最大宽度
 * @param {string} prefix 拼接的前缀，默认为 `?imageView2/2/w/`
 * @returns {string} 根据参数拼接的新图片地址
 */
export function getImgByWidth(
  url: string,
  maxWidth: number,
  prefix: string = '?imageView2/2/w/'
): string {
  const originUrl = getOriginImgUrl(url)
  return `${originUrl}${prefix}${Math.ceil(maxWidth)}`
}

/**
 * 默认返回 webp 格式
 * 传入原始图片url，根据指定宽度获取图片地址，宽度大于`width`的时候会等比缩放至该宽度
 * 原始宽度小于目标宽度，图片不缩放
 *
 * @param {string} url 传入的图片地址
 * @param {number} width 指定的图片最大宽度
 * @param {string} prefix 拼接的前缀，默认为 `?imageView2/2/w/`
 * @returns {string} 根据参数拼接的新图片地址
 */
export function getWebpByWidth(
  url: string,
  maxWidth: number,
  prefix: string = '?imageView2/2/w/'
): string {
  const originUrl = getOriginImgUrl(url)

  return `${originUrl}${prefix}${Math.ceil(maxWidth)}${
    isSupportWebp ? '/format/webp/ignore-error/1' : ''
  }`
}
