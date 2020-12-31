import React from 'react'
// import PropTypes from 'prop-types'
// import BetterImage from '@xiaoxili/react-better-image-cc';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import './styles.scss'


export default class SliderMobile extends React.Component {

  static defaultProps = {
    source: [],
    settings: {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    }
  }

  render() {
    const { source, settings } = this.props
    
    return (
      <div className="slider-mobile" id="slide">
        <Slider {...settings}>
          {
            source.map((item, index) => {
              const { picUrl } = item
              return (
                <div className="slider-mobile-item" key={index}>
                  <img src={picUrl} alt={'' + index} />
                </div>
              )
            })
          }
        </Slider>
      </div>

    )
  }
}