import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'
import { Swipeable } from 'react-swipeable'

var cx = require('classnames')

const EMPTY_FUNC = () => {}

const DIRECTION = {
  RTL: 0,
  LTR: 1
}

export default class Slider3D extends React.PureComponent {
  static propTypes = {

    /**
     * 卡片是否层叠
     * @type Boolean
     * @default
     */
    isCascade: PropTypes.bool,
    /**
     * 卡片的style
     * @type Number
     * @default
     */
    style: PropTypes.object,
    /**
     * 卡片的reStyles 覆盖型
     * @type Object
     * @default
     */
    reStyles: PropTypes.object,
    /**
     * 卡片的reStyles 覆盖型
     * @type Number
     */
    source: PropTypes.array,
    /**
     * 是否显示第三个
     * @type Number
     */
    showThird: PropTypes.bool,
    /**
     * autoplay: 轮播动画间隔时间
     * @type Number
     * @default
     */
    autoplay: PropTypes.number,
    /**
     * duration: 轮播动画speed速度
     * @type Number
     * @default
     */
    duration: PropTypes.number,
    /**
     * duration: 自定义样式
     * @type String
     * @default
     */
    contentClassName: PropTypes.string,
    /**
     * duration: 点击轮播图片时触发
     * @type Function
     */
    onHandleClick: PropTypes.func,
  /**
   * duration: 切换轮播图片后触发
   * @type Function
   */
    onItemChange: PropTypes.func,

    /**
     * direction: 轮播切换方向
     * @type string
     */
    direction:  PropTypes.number
  }
  /**
   * 属性默认值
   *
   * @static
   */
  static defaultProps = {
    isCascade: false,
    style: { width: '100%', height: '100%' },
    reStyles: null,
    slideType: 0,
    source: [],
    showThird: true,
    autoplay: 7000,
    duration: 650,
    contentClassName: '',
    direction: DIRECTION.RTL,
    onHandleClick: EMPTY_FUNC,
    onItemChange: EMPTY_FUNC,
  }

  constructor(props) {
    super(props)

    this.animating = false
    this.slider = null
    this.state = {
      indexActive: 0
    }
  }

  componentDidMount() {
    const { source } = this.props
    if (source && source.length) {
      this.autoAnimate()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  shouldUpdate(nextProps, nextState) {
    const { source } = this.props
    const { source: curSource } = nextProps
    const { indexActive } = this.state
    const { indexActive: curIndexActive } = nextState

    if (source.length === curSource.length && indexActive === curIndexActive) {
      return false
    }

    return true
  }


  switchItem = (index, type) => {
    if (this.animating) return
    const { indexActive } = this.state
    if (indexActive === index) return
    const { duration, onItemChange } = this.props
    this.animating = true
    this.setState({
      indexActive: index
    }, () => {
      onItemChange(index, type)
      // 0.8s以后
      setTimeout(() => {
        this.animating = false
        clearTimeout(this.timeout)
        this.autoAnimate()
      }, duration)
    })
  }

  autoAnimate = () => {
    const { autoplay, duration, source = [], direction } = this.props
    const { indexActive } = this.state


    this.timeout = setTimeout(() => {
      let tmpIndex
      
      if (direction === DIRECTION.RTL) {
        if (indexActive === source.length - 1) {
          tmpIndex = 0
        } else {
          tmpIndex = indexActive + 1
        }
      } else {
        if (indexActive === 0) {
          tmpIndex = source.length - 1 
          this.switchItem(source.length - 1)
        } else {
          tmpIndex = indexActive - 1 
        }
      }

      this.switchItem(tmpIndex)
      this.autoAnimate()
    }, autoplay + duration)
  }

  itemClick = (e, index) => {
    
    const { indexActive } = this.state
    const { onHandleClick } = this.props
    
    if (indexActive === index) {
      onHandleClick(indexActive, e)
    } else {
      e.preventDefault()
      this.switchItem(index, 'click')
    }
  }

  // 向左滑动
  onSwipedLeft = (event) => {
    console.log('onSwipedLeft event', event)
    const { source } = this.props
    const { indexActive } = this.state

    this.switchItem(indexActive >= source.length - 1 ? 0 : indexActive + 1)
  }

  // 向右滑动
  onSwipedRight = (event) => {
    const { source } = this.props
    const { indexActive } = this.state

    this.switchItem(indexActive <= 0 ? source.length -1 : indexActive - 1 )
  }

  render() {
    const { isCascade, source, settings, duration, showThird, style } = this.props
    const { indexActive } = this.state
    if (!source || source.length < 3) return null
    let size = source.length

    return (
      <div className={cx('carousel', { 'slider-cascade': isCascade, 'slider-card': !isCascade })} style={ style }>
        <Swipeable onSwipedLeft={this.onSwipedLeft} onSwipedRight={this.onSwipedRight} preventDefaultTouchmoveEvent={true}>
          <div className={cx('image-list', !showThird ? 'no-third' : '')} {...settings}>
            {
              source.map((item, index) => {
                return (
                  <a key={`c-c-${item}-${index}`} href={item.linkUrl} onClick={(e) => this.itemClick(e, index)} target="_blank" rel="noopener noreferrer" style={{ transition: index === indexActive ? `all ${duration / 1000 / 1.25}s` : `all ${duration / 1000}s` }} className={cx('image-item', {
                    'main-image-item': index === indexActive,
                    // 前一个
                    'prev-image-item': (indexActive === 0 && index === size - 1) || (indexActive > 0 && index === indexActive - 1),
                    // 后一个
                    'next-image-item': (indexActive === size - 1 && index === 0) || (indexActive < size - 1 && index === indexActive + 1),
                    // 最左侧
                    'left-image-item': source.length > 4 && ((indexActive === 0 && index === size - 2) || (indexActive === 1 && index === size - 1) || (indexActive > 1 && index === indexActive - 2)),
                    'right-image-item': source.length > 4 && ((indexActive === size - 1 && index === 1) || (indexActive === size - 2 && index === 0) || (indexActive < size - 2 && index === indexActive + 2))
                  })}>
                    <img className={cx('image-item-better')} src={item.picUrl} alt={''} />
                  </a>
                )
              })
            }
          </div>
        </Swipeable>
        <div className={cx('switch-list')}>
          {
            source.map((item, index) => {
              return (
                <div key={`c-${item}-${index}`} className={cx('switch-item', { 'switch-item-active': index === indexActive })} style={{ transition: `all ${duration / 1000}s` }} onClick={this.switchItem.bind(this, index, 'click')}>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}