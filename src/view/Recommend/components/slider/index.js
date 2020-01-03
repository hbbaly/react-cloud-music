import React, { useState, useEffect } from 'react'
import 'swiper/css/swiper.css'
import Swiper from 'swiper'
import { SliderContainer } from './style'

function Slider(props) {
  const { bannerList } = props
  const [slider, setSlider] = useState(null)
  useEffect(() => {
    if (bannerList.length && !slider) {
      let slider = new Swiper('.slider-container', {
        loop: true,
        autoplay: true,
        autoplayDisableOnInteraction: false,
        pagination: { el: '.swiper-pagination' }
      })
      setSlider(slider)
    }
  }, [bannerList, slider])

  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {bannerList.map(item => (
            <div className="swiper-slide" key={item.id}>
              <div className="slider-nav">
                <img
                  src={item.imageUrl}
                  width="100%"
                  height="100%"
                  alt="推荐"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  )
}
export default React.memo(Slider)
