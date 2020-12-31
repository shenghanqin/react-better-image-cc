import React from 'react'

import withUiMode from '@xiaoxili/react-ui-mode-cc'
import * as clipboard from 'clipboard-polyfill/text'
import Page from './components/page';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BetterImage from '@xiaoxili/react-better-image-cc'

interface Props {
  isPCMode ?: boolean
  uiMode ?: string
}
interface State {
  // orientation?: string
}

// const uaStr = window.navigator.userAgent

class App extends React.Component<Props, State> {
  notify = (str: string = '') => toast(str)

  copyToClipboard = (str: string | undefined = '') => {
    console.log('copy text', str)
    clipboard.writeText(str).then(
      () => {
        this.notify('复制成功')
      },
      () => {
        this.notify('复制失败!')
      }
    )
  }

  render() {
    const { isPCMode } = this.props

    return (
      <Page
        pageClassName={`page-home ${isPCMode ? 'page-mode-pc' : 'page-mode-mobile'}`}
        title={'图片懒加载组件和 Webp 图片压缩'}
        isPCMode={isPCMode}
      >
        <BetterImage width={200} height={150} src="https://image-hosting.xiaoxili.com/img/img/20201018/7b73f4d58c9ad761e01eafed77a2d28f-750765.png" maxImageWidth={300} />
        <ToastContainer position="bottom-center" />
      </Page>
    )
  }
}

export default withUiMode({
  // 区分模式的宽度
  widthMode: 1000,
  // iPad 微信恒定为 Mobile UI
  // isPadWechatMobile: true
})(App)

