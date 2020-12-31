import React from 'react'
import './styles.scss'

export default class Footer extends React.Component {

  static defaultProps = {
    isPCMode: false,
  }

  render() {
    const { isPCMode } = this.props
    return (
      <footer className="footer">
        <div className={`footer-main ${isPCMode ? 'footer-pc' : ''}`}>
          <a href='/' className="footer-logo">
            <h3>小溪里 xiaoxili.com</h3>
          </a>
          <section className="footer-links">
            <dl>
              <dt><img src="https://image-hosting.xiaoxili.com/img/20200712164455.png" alt="关于我们" />关于</dt>
              <dd><a href="/about.html">关于小溪里</a></dd>
              <dd><a href="/about.html">关于 Hi Our</a></dd>
            </dl>
            <dl>
              <dt><img src="https://image-hosting.xiaoxili.com/img/20200712164456.png" alt="相关资源" />社区</dt>
              <dd><a href="https://cloudbase.net">云开发 CloudBase</a></dd>
              <dd><a href="https://taro.jd.com">Taro</a></dd>
              <dd><a href="https://tuture.co">图雀社区</a></dd>
            </dl>
            {/* <dl>
              <dt><img src={require("../../img/footer-a@2x.png")} alt="友情链接" />友情链接</dt>
            </dl> */}
          </section>
        </div>
        <div className="footer-copyright">
          Copyright © 2020. All Rights Reserved.<br /><a href="http://www.beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">沪ICP备20020594号-2</a>
        </div>

      </footer>
    )
  }
}