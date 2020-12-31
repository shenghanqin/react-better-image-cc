import React from 'react';

import "./page-home.scss";

import withUiMode from '@xiaoxili/react-ui-mode-cc'
import * as clipboard from 'clipboard-polyfill/text'
import Page from './components/page';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BetterImage, { checkCanvasWebP, getWebpSupport } from '@xiaoxili/react-better-image-cc';

const detector = require('detector');

const uaStr = window.navigator.userAgent;

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
    console.log(detector)
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
    const { browser, os, device } = detector

    return (
      <Page
        pageClassName={`page-home ${isPCMode ? 'page-mode-pc' : 'page-mode-mobile'}`}
        title={'图片懒加载组件和 Webp 图片压缩'}
        isPCMode={isPCMode}
      >
        <div className='page-container'>
          <div className='markdown-body'>
            <h2>Webp 基础判断</h2>
            <h3>设备信息</h3>
            <table>
              <thead>
                <tr>
                  <td>设备名称</td>
                  <th>系统名称及版本</th>
                  <th>浏览器名称及版本</th>
                </tr>
              </thead>
              <tr>
                <td>{device.name}</td>
                <td>{os.name} {os.version}</td>
                <td>{browser.name} {browser.fullVersion}</td>
              </tr>
            </table>
            <table>
              <thead>
                <tr>
                  <th>设备宽高</th>
                  <th>页面宽高</th>
                </tr>
              </thead>
              <tr>
                <td>screen.width： {window.screen.width} screen.height：{window.screen.height}</td>
                <td>innerWidth：{window.innerWidth} innerHeight：{window.innerHeight}</td>
              </tr>
            </table>
            <div onClick={this.copyToClipboard.bind(this, uaStr)}>
              <h2>当前设备 UserAgent（点击可复制）</h2>
              <div style={{ wordBreak: 'break-all' }}>{uaStr}</div>
            </div>
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

