import React from 'react';

import "./index.scss";

import withUiMode from '@xiaoxili/react-ui-mode-cc'
import * as clipboard from 'clipboard-polyfill/text'
import Page from '../components/page';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BetterImage, { checkCanvasWebP, getWebpByWidth, getWebpSupport } from '@xiaoxili/react-better-image-cc';
import Slider3D from "../components/slider-3d";

const detector = require('detector');

const uaStr = window.navigator.userAgent;

const imageList = [
  {
    picUrl: 'https://image-hosting.xiaoxili.com/img/img/20201018/7b73f4d58c9ad761e01eafed77a2d28f-750765.png'
  },
  {
    picUrl: 'https://image-hosting.xiaoxili.com/img/20200730093122.png'
  },
  {
    picUrl: 'https://image-hosting.xiaoxili.com/img/20200730093044.png'
  },
  {
    picUrl: 'https://image-hosting.xiaoxili.com/img/20200730093000.png',
  },
  {
    picUrl: 'https://image-hosting.xiaoxili.com/img/img/20201018/8cf1374295bdb5f25f9b18acfd28d4c1-ef065d.png'
  },
  {
    picUrl: 'https://image-hosting.xiaoxili.com/img/img/20201018/85b738b7a0b099e54325a44a913ec107-cc7aac.png',
  },
  {
    picUrl: 'https://image-hosting.xiaoxili.com/img/img/20201018/308a1143638b41bd61dcdb967af29636-2e5225.png',
  },
  {
    picUrl: 'https://image-hosting.xiaoxili.com/img/img/20201018/a0ceda47c4874755230e5322054b1190-989029.jpg'
  }
]

const getRandom = () => Math.ceil(100 * Math.random())

interface Props {
  isPCMode ?: boolean
  uiMode ?: string
}
interface State {
  isSupportWebp?: boolean
}
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
    console.log('getWebpSupport()', getWebpSupport())
    if (getWebpSupport()) {
      this.setState({
        isSupportWebp: true
      });
    } else {
      setTimeout(() => {
        this.setState({
          isSupportWebp: getWebpSupport()
        })
      }, 1500);
    }
  }

  render() {
    const { isPCMode } = this.props
    const { isSupportWebp } = this.state
    const { browser, os, device } = detector


    const carousel = imageList.map(item => ({...item, picUrl: getWebpByWidth(item.picUrl, isPCMode ? 1000 : 750)}))

    return (
      <Page
        pageClassName={`page-home ${isPCMode ? 'page-mode-pc' : 'page-mode-mobile'}`}
        title={'图片懒加载组件和 Webp 图片压缩'}
        isPCMode={isPCMode}
      >
        <div className='page-container'>
          <div className='markdown-body'>
            <h1 style={{ textAlign: 'center' }}>Demo——Webp 图片压缩、图片懒加载组件</h1>
            <blockquote>
              <p>文章颜色主题由巧克力很苦同学制作，原文在《<a href="https://juejin.cn/post/6909356292574281735" target="_blank" rel="noreferrer">Mdnice自定义文章主题</a>》。</p>
            </blockquote>
            <br />
            <h2>Webp 基础判断</h2>
            <h3>是否支持 Webp</h3>
            <table>
              <thead>
                <tr>
                  <th>通过 Canvas toDataURL </th>
                  <th>通过加载 Webp 图片</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>支持 Webp: {checkCanvasWebP() ? '是' : '否'}</td>
                  <td>支持 Webp: {isSupportWebp ? '是' : '否'}</td>
                </tr>
              </tbody>
            </table>
            <h3>设备信息</h3>
            <table>
              <thead>
                <tr>
                  <td>设备名称</td>
                  <th>系统名称及版本</th>
                  <th>浏览器名称及版本</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{device.name}</td>
                  <td>{os.name} {os.version}</td>
                  <td>{browser.name} {browser.fullVersion}</td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>设备宽高</th>
                  <th>页面宽高</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>screen.width： {window.screen.width} screen.height：{window.screen.height}</td>
                  <td>innerWidth：{window.innerWidth} innerHeight：{window.innerHeight}</td>
                </tr>
              </tbody>
            </table>
            <div onClick={this.copyToClipboard.bind(this, uaStr)}>
              <h2>当前设备 UserAgent（点击可复制）</h2>
              <div style={{ wordBreak: 'break-all' }}>{uaStr}</div>
            </div>
            <hr />
            <h2>图片懒加载组件</h2>
            <h3>轮播图示意图</h3>
            <p>使用 <code>getWebpByWidth('图片地址', 1000)</code> 获取 Webp 图片。</p>
          </div>
          
          <div className={isPCMode ? 'slider-banner' : 'slider-banner-mobile' }>
            <Slider3D
              source={carousel}
              isCascade={!isPCMode}
            />
          </div>
          <div className='markdown-body'>
            <p>PS：电脑端为 3D 轮播；手机上为平铺轮播。</p>
            <hr />
            <h3>图片列表，一行多列</h3>
          </div>
          <div className='image-list-1'>
            {
              imageList.map((item, index) => {
                return (
                  <div key={index} className='item'>
                    <div className='image-now'>
                      <BetterImage ratio={9 / 16} src={item.picUrl} maxImageWidth={(isPCMode ? 1200 : 600) + getRandom()} />
                    </div>
                    <div className='item-main'>
                      <h3>标题</h3>
                      <p>图片描述：小溪里棒棒哒！</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className='markdown-body'>
            <h3>图片列表，左图右文</h3>
          </div>
          <div className='image-list-2'>
            {
              imageList.map((item, index) => {
                return (
                  <div key={index} className='item'>
                    <div className='image-now'>
                      <BetterImage width={200} height={112} src={item.picUrl} maxImageWidth={(isPCMode ? 800 : 400) + getRandom()} />
                    </div>
                    <div className='item-main'>
                      <h3>标题</h3>
                      <p>图片描述：小溪里棒棒哒！</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <ToastContainer position="bottom-center" />
      </Page>
    )
  }
}

export default withUiMode({
  // 区分模式的宽度
  widthMode: 1000,
})(App)

