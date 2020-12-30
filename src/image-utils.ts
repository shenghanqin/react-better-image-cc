/**
 * 图片模块
 */

/**
 * 判断浏览器是否兼容 Webp 格式图片
 */
let hasWebP = false
function checkWebp() {
  var img = new Image()
  img.onload = function () {
    hasWebP = !!(img.height > 0 && img.width > 0)
  }
  img.onerror = function () {
    hasWebP = false
  }
  img.src =
    'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA='
}

checkWebp()

export const getWebpSupport = () => hasWebP

// 这个方法，不兼容Safari浏览器，所以改用了加载webp图片的方式
// Safari 14支持webp格式，但dataUrl中还是 image/png
export function checkOldWebP(): boolean {
  console.log('hasWebP', hasWebP)
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
 * 传入原始图片url，根据指定宽度获取图片地址，宽度大于`width`的时候会缩放至该宽度（等比）
 * 宽度小于改宽度的时候图片不缩放
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
 * 传入原始图片url，根据指定宽度获取图片地址，宽度大于`width`的时候会缩放至该宽度（等比）
 * 宽度小于改宽度的时候图片不缩放
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
    hasWebP ? '/format/webp/ignore-error/1' : ''
  }`
}
