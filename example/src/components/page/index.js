import React, { Fragment } from 'react'
import { addClass, removeClass } from '../../utils/dom-utils.js'
import DocumentMeta from '../document-meta';
import Header from '../header';
import Footer from '../footer';
// import wxUitls from '../../utils/wx-utils';

// const DEFAULT_SHARE_COVER = 'https://n1image.hjfile.cn/res7/2020/04/26/2041af2867f22e62f8fce32b29cd1fb0.png'
export default class Page extends React.Component {

  static defaultProps = {
    isPCMode: false,
    isShowHeader: true,
    isShowFooter: true,
    theme: '',
    title: '小溪里 - 前端技术',
    description: '盛瀚钦，沪江 CCtalk 前端开发工程师，Hi头像小程序作者，腾讯云云开发布道师，Taro 社区的知识共建者，著有《从0到1开发一个智能头像识别小程序》小册',
    keywords: '前端,前端开发工程师,云开发,云开发布道师,小程序,Taro,人工智能,xiaoxili,沪江 cctalk',
    meta: {}
  }
  
  componentDidMount() {
    this.htmlNode = document.getElementsByTagName('html')[0]
  
    const { pageClassName } = this.props

    if (pageClassName && this.htmlNode) {
      addClass(this.htmlNode, pageClassName)
    }
  }

  componentDidUpdate(prevProps) {

    if (prevProps.pageClassName !== this.props.pageClassName) {
      removeClass(this.htmlNode, prevProps.pageClassName)
      addClass(this.htmlNode, this.props.pageClassName)
    }
  }


  componentWillUnmount() {
    const { pageClassName } = this.props
    if (pageClassName && this.htmlNode) {
      removeClass(this.htmlNode, pageClassName)
    }
  }

  render() {
    const { title, description, keywords, meta, isShowHeader, isShowFooter, isPCMode } = this.props
    console.log('page isPCMode :>> ', isPCMode);
    return (
      <Fragment>
        <DocumentMeta
          title={title || ''}
          description={description}
          keywords={keywords}
          {...meta}
        />
        {
          isShowHeader && <Header isPCMode={isPCMode} />
        }
        {this.props.children}
        {
          isShowFooter && <Footer isPCMode={isPCMode} />
        }
      </Fragment>
    )
  }
}

export async function getStaticProps() {

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {
      title: 123,
    }
  }
}