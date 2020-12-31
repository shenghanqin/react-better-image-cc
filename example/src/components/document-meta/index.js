import React from 'react'
import PropTypes from 'prop-types'
import ReactDocumentMeta from 'react-document-meta'

class DocumentMeta extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string
  }

  static defaultProps = {
    title: 'Hi Our',
    description: '',
    keywords: 'Hi Our'
  }

  // componentDidMount() {
  //   const { title } = this.props
  //   this.setWeixinTitle(title)
  // }

  shouldComponentUpdate(nextProps, nextState) {
    let { title } = this.props
    // 防止重复渲染，在ios上导致title闪烁
    if (title !== nextProps.title) {
      return true;
    } else {
      return false;
    }
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.title !== this.props.title) {
  //     this.setWeixinTitle(this.props.title)
  //   }
  // }

  // setWeixinTitle(title) {
  //   if (!(IS_IOS && IS_WEIXIN)) return
  //   setTimeout(() => {
  //     document.title = title
  //     let iframe = document.createElement('iframe')
  //     iframe.setAttribute('src', '//n1image.hjfile.cn/res7/2017/03/03/a197e5f6066d79c45e528991c6b466be.png')
  //     iframe.style.visibility = 'hidden'
  //     iframe.style.width = '1px'
  //     iframe.style.height = '1px'
  //     const hanlder = function hanlder() {
  //       setTimeout(() => {
  //         iframe.removeEventListener('load', hanlder)
  //         document.body.removeChild(iframe)
  //       }, 0)
  //     }
  //     iframe.addEventListener('load', hanlder)
  //     document.body.appendChild(iframe)
  //   }, 0)
  // }

  render() {
    const { title, description, ...others } = this.props
    return <ReactDocumentMeta
      title={title}
      description={description}
      meta={{
        charset: 'utf-8',
        name: others
      }}
    />
  }
}

export default DocumentMeta