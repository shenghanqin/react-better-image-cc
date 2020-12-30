import * as React from 'react'
import { getWebpSupport } from './image-utils'

const BETTER_CLASS = `xxl-better-image`

// 在 IE 浏览器上都不支持 IntersectionObserver
const isHaveIntersectionObserver = !!window.IntersectionObserver

const blur = 'imageMogr2/thumbnail/30x30/blur/3x5'

interface UIProps {
  /**
   * 图片地址
   */
  src: string
  /**
   * 图片宽度
   */
  width?: number
  /**
   * 图片高度
   */
  height?: number
  /**
   * 七牛图片的最大宽度
   */
  maxImageWidth?: number
  /**
   * 图片高宽比 height / width
   */
  ratio?: number
  /**
   * 是否启用webp
   */
  enableWep?: boolean
  /**
   * 禁用blur直接加载大图
   */
  disableBlur?: boolean
  /**
   * 自定义 ClassName
   */
  className?: string
  /**
   * 用来扩展或缩小rootBounds这个矩形的大小
   * 从而影响intersectionRect交叉区域的大小
   * 它使用CSS的定义方法，比如10px 20px 30px 40px，表示 top、right、bottom 和 left 四个方向的值
   */
  rootMargin?: string
}

interface UIState {
  /**
   * 图片是否加载完成
   */
  isLoaded: boolean
}

export default class BetterImage extends React.Component<UIProps, UIState> {
  static defaultProps = {
    src: `https://image-hosting.xiaoxili.com/img/img/20201018/7b73f4d58c9ad761e01eafed77a2d28f-750765.png`,
    enableWep: true,
    className: ''
  }

  _intersectionObserver: any
  imageWrapRef: any

  constructor(props: UIProps) {
    super(props)
    this.state = {
      isLoaded: false
    }
  }

  componentDidMount() {
    const { rootMargin, disableBlur } = this.props
    // 判断是否支持图片监测
    if (isHaveIntersectionObserver) {
      // 判断是否出现占位图
      if (!disableBlur) {
        // 设置图片监测
        this._intersectionObserver = new IntersectionObserver(
          (entries) => {
            if (entries[0].intersectionRatio > 0) {
              this.loadImage()
            }
          },
          {
            rootMargin,
            threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
          }
        )

        this._intersectionObserver.observe(this.imageWrapRef)
      }
    } else {
      if (console.log) {
        console.log(`
          BetterImage 组件需要引入“intersection-observer”依赖才能完整使用
        `)
      }
    }
  }

  // 加载图片
  loadImage = () => {
    // 加载成功后，无需重复加载
    const { isLoaded } = this.state
    if (isLoaded) return

    // 图片加载
    const img = new Image()
    img.onload = () => {
      // 图片加载完后，取消图片监测
      this._intersectionObserver.unobserve(this.imageWrapRef)
      this.setState({
        isLoaded: true
      })
    }
    img.src = this.compressImage()
  }

  // 计算七牛云所需图片
  compressImage = () => {
    const { src, maxImageWidth, enableWep } = this.props
    let compressedSrc = `${src}?imageView2/2`
    if (maxImageWidth) {
      compressedSrc = `${compressedSrc}/w/${maxImageWidth}`
    }

    if (getWebpSupport() && enableWep) {
      compressedSrc = `${compressedSrc}/format/webp/ignore-error/1`
    }
    return compressedSrc
  }

  render() {
    const { src, width, height, ratio, className, disableBlur } = this.props
    const { isLoaded } = this.state
    const imageUrl = this.compressImage()

    const showBlurUrl = isHaveIntersectionObserver && !disableBlur && !isLoaded
    const renderImageSrc = showBlurUrl ? `${src}?${blur}` : imageUrl

    if (!(ratio || (width && height))) {
      return (
        <img
          className={showBlurUrl ? `${BETTER_CLASS}-blur` : className}
          ref={(e) => {
            this.imageWrapRef = e
          }}
          src={renderImageSrc}
        />
      )
    }

    // 预先占位 缩略图
    if (showBlurUrl) {
      const blurStyle: React.CSSProperties = {
        position: 'relative',
        overflow: 'hidden'
      }
      if (ratio) {
        blurStyle.paddingTop = `${(ratio * 100).toFixed(4)}%`
      } else if (width && height) {
        blurStyle.width = `${width}px`
        blurStyle.height = `${height}px`
      }

      return (
        <div
          ref={(e) => {
            this.imageWrapRef = e
          }}
          className={`${BETTER_CLASS}-blur ${className}`}
          style={blurStyle}
        >
          <img
            src={renderImageSrc}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: '100%',
              height: '100%'
            }}
          />
        </div>
      )
    }

    // 获得真实图片后的设置
    const realStyle: React.CSSProperties = {
      display: 'block'
    }

    if (ratio) {
      realStyle.width = '100%'
      realStyle.height = 'auto'
    } else if (width && height) {
      realStyle.width = `${width}px`
      realStyle.height = `${height}px`
    }

    return (
      <img
        className={`${className}`}
        ref={(e) => {
          this.imageWrapRef = e
        }}
        src={renderImageSrc}
        style={realStyle}
      />
    )
  }
}
