import React from 'react';

import "./page-home.scss";

import withUiMode from '@xiaoxili/react-ui-mode-cc'
import * as clipboard from 'clipboard-polyfill/text'
import Page from './components/page';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BetterImage, { checkCanvasWebP, getWebpSupport } from '@xiaoxili/react-better-image-cc'
interface Props {
  isPCMode ?: boolean
  uiMode ?: string
}
interface State {
  isSupportWebp?: boolean
}

// const uaStr = window.navigator.userAgent

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isSupportWebp: false
    }
  }
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
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isSupportWebp: getWebpSupport()
      })
    });    
  }

  render() {
    const { isPCMode } = this.props
    const { isSupportWebp } = this.state

    return (
      <Page
        pageClassName={`page-home ${isPCMode ? 'page-mode-pc' : 'page-mode-mobile'}`}
        title={'图片懒加载组件和 Webp 图片压缩'}
        isPCMode={isPCMode}
      >
        <div className='page-container'>
          <div className='markdown-body'>
            <h2>Webp 基础判断</h2>
            <h3>是否支持 Webp</h3>
            <table>
              <thead>
                <tr>
                  <th>通过 Canvas </th>
                  <th>通过加载 Webp 图片</th>
                </tr>
              </thead>
              <tr>
                <td>支持 Webp: {checkCanvasWebP() ? '是' : '否'}</td>
                <td>支持 Webp: {isSupportWebp ? '是' : '否'}</td>
              </tr>
            </table>
          </div>
          <BetterImage width={200} height={150} src="https://image-hosting.xiaoxili.com/img/img/20201018/7b73f4d58c9ad761e01eafed77a2d28f-750765.png" maxImageWidth={300} />
        </div>
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

