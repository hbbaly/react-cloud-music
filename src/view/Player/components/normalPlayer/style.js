import styled, { keyframes } from 'styled-components'
import { translatePxToRem } from '../../../../utils/base'
import global from '../../../../assets/global'


export const PositionBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: 100%;
`
export const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const PlayerWrapper = styled(PositionBox)`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 150;
  transform-origin: right bottom;
  &.mini-enter {
    transform: translate3d(0, 100%, 0);
    transition: transform 0.3s;
  }
  &.mini-enter-active {
    transform: translate3d(0, 0, 0);
    transition: transform 0.3s;
  }
  &.mini-exit-active {
    transform: translate3d(0, 100%, 0);
    transition: transform 0.3s;
  }
  .slide-banner-scroll{
    min-height: 1px;
    overflow: hidden;
    .slide-banner-wrapper{
      height: ${translatePxToRem(750)};
      white-space: nowrap;
      font-size: 0;
      .slide-item{
        display: inline-block;
        /* height: ${translatePxToRem(675)}; */
        width: 100%;
        /* text-align: center; */
        margin-top: -${translatePxToRem(125)};
        font-size: 26px;
      }
    }
  }
  .player-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-size: 100%;
    z-index: 100;
    background: #fff;
    .content-wrapper {
      overflow: hidden;
      position: absolute;
      width: 100%;
      height: 100%;
      filter: blur(${translatePxToRem(40)});
      background: url(${props => props.background}) no-repeat;
      z-index: -2;
      opacity: 0.5;
      background-size: cover;
      background-position: 50%;
      .filter {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.2);
      }
    }
  }
  .song-name{
    width: 80%;
    margin: 0 auto;
    font-size: ${translatePxToRem(40)};
    text-align: center;
    color: ${global['theme-color']};
    ${global.noWrap()};
  }
  .player-control{
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: ${translatePxToRem(80)} auto ${translatePxToRem(40)};
    .icon{
      ${global.extendClick()}
      .iconfont{
        font-size: ${translatePxToRem(58)};
      }
    }
  }
  .cd-wrapper{
    width: ${translatePxToRem(540)};
    margin: 0 auto;
    text-align: center;
  }
`
export const PlayerTop = styled(FlexBox)`
  .song-detail-tab,
  .song-lyric {
    width: 40%;
    height: ${translatePxToRem(100)};
    line-height: ${translatePxToRem(100)};
    font-size: ${translatePxToRem(28)};
    text-align: center;
  }
  .song-lyric{
    text-align: left;
  }
  .song-detail-tab_act,.song-lyric_act{
    color: ${global['theme-color']}
  }
  .close-normal{
    width: 20%;
    text-align: center;
    .iconfont{
      display: inline-block;
      font-size: ${translatePxToRem(30)};
      transform: rotate(90deg);
    }
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
export const Rotate = styled.img.attrs(props => ({
  src: props.src
}))`
  overflow: hidden;
  display: inline-block;
  animation: ${rotate} 20s linear infinite;
  width: ${translatePxToRem(540)};
  height: ${translatePxToRem(540)};
  margin: ${translatePxToRem(20)} auto ${translatePxToRem(80)};
  border-radius: 50%;
  transform-origin: center center;
`

export const RateWrapper = styled(FlexBox)`
  justify-content: space-between;
  height: ${translatePxToRem(80)};
  /* margin-top: ${translatePxToRem(40)}; */
  padding: ${translatePxToRem(120)} ${translatePxToRem(40)} 0;
  .__left{
    /* width: 20%; */
    text-align: left;
    font-size: ${translatePxToRem(28)};
    line-height: ${translatePxToRem(80)};
  }
  .rate-num{
    height: ${translatePxToRem(40)};
    padding: 0 ${translatePxToRem(20)};
    line-height: ${translatePxToRem(40)};
    text-align: right;
    /* ${global.extendClick()} */
    &_act{
      background: ${global['theme-color']};
      color: #fff;
      border-radius: ${translatePxToRem(5)};
    }
  }
`

export const ProcressBar = styled(FlexBox)`
  position: relative;
  height: ${translatePxToRem(80)};
  padding: ${translatePxToRem(0)} ${translatePxToRem(40)} 0;
  .__start, .__duration{
    position: absolute;
    bottom: ${translatePxToRem(-10)};
    width: ${translatePxToRem(80)};
  }
  .__start{
    left: ${translatePxToRem(40)};
  }
  .__duration{
    right: ${translatePxToRem(40)};
    text-align: right;
  }
`
export const BarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${translatePxToRem(10)};
  background: #4b4c51;
  .process-bar{
    position: absolute;
    top: 50%;
    left: 0;
    width: 0;
    height: ${translatePxToRem(12)};
    margin-top: -${translatePxToRem(6)};
    /* transition: width 0.1s; */
    background: ${global['theme-color']};
    ${global.extendClick()};
  }
  .process-circle{
    position: absolute;
    top: 50%;
    left: 0;
    width: ${translatePxToRem(20)};
    height: ${translatePxToRem(20)};
    margin-top: -${translatePxToRem(10)};
    border-radius: 50%;
    z-index: 1;
    background: #eee;
    .__circle{
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 100;
      width: ${translatePxToRem(14)};
      height: ${translatePxToRem(14)};
      margin: -${translatePxToRem(7)};
      background: ${global['theme-color']};
      border-radius: 50%;
    }
  }
`