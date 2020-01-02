import styled from 'styled-components'
import GlobalStyle from '../../../../assets/global'
import { translatePxToRem } from '../../../../utils/base'
export const SliderContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: auto;
  background: white;
  .before {
    position: absolute;
    top: 0;
    height: 60%;
    width: 100%;
    background: ${GlobalStyle["theme-color"]};
  }
  .slider-container {
    position: relative;
    width: 98%;
    height: ${translatePxToRem(320)};
    overflow: hidden;
    margin: auto;
    border-radius: ${translatePxToRem(12)};
    .slider-nav {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
    }
    .swiper-pagination-bullet-active {
      background: ${GlobalStyle["theme-color"]};
    }
  }
`