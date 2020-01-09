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
  justify-content: space-around;
`
export const PlayerWrapper = styled(PositionBox)`
  transform-origin: right bottom;
  &.mini-enter {
    transform: translate3d(0, 100%, 0);
    transition: transform 0.5s;
  }
  &.mini-enter-active {
    transform: translate3d(0, 0, 0);
    transition: transform 0.5s;
  }
  &.mini-exit-active {
    transform: translate3d(0, 100%, 0);
    transition: transform 0.5s;
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
      z-index: -1;
      opacity: 0.5;
      background-size: cover;
      background-position: 50%;
      .filter {
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.2);
      }
    }
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
  display: inline-block;
  animation: ${rotate} 20s linear infinite;
  width: ${translatePxToRem(240)};
  height: ${translatePxToRem(240)};
  border-radius: 50%;
  overflow: hidden;
`
