import React from 'react'
import './styles.scss'

export default class Page extends React.Component {
  static defaultProps = {
    isPCMode: false,
  }

  render() {
    const { isPCMode } = this.props

    console.log('header isPCMode :>> ', isPCMode);
    return (
      <header>
        <div className={`header-main ${isPCMode ? 'header-pc' : ''}`}>
          <h1 className="logo">
            <a href='/'>
              小溪里 xiaoxili.com
            </a>
          </h1>
          <nav className="main-nav">
            <a href='/'>小溪里</a>
            <a href='/blog' title="小溪里博客">博客</a>
            <a href='https://github.com/shenghanqin/react-ui-mode-cc' title="react-ui-mode-cc">GitHub</a>
            <a href='https://www.npmjs.com/package/@xiaoxili/react-ui-mode-cc' title="react-ui-mode-cc">NPM</a>
          </nav>
        </div>
      </header>
    )
  }
}