import styled from 'styled-components'
import { translatePxToRem } from '../../utils/base'
import global from '../../assets/global'
export const MiniPlayerWrapper = styled.div`
  display: flex;
  position: fixed;
  z-index: 10000;
  width: 100%;
  height: ${translatePxToRem(140)};
  bottom: 0%;
  left: 0;
  background: #fff;
  transform-origin: right bottom;
  &.mini-enter {
    transform: translate3d (0, 100%, 0);
  }
  &.mini-enter-active {
    transform: translate3d (0, 0, 0);
    transition: all 0.6s;
  }
  &.mini-exit-active {
    transform: translate3d (0, 100%, 0);
    transition: all .6s
  }
  .player-img-wrapper{
    width: 20%;
    .player-img{
      width: ${translatePxToRem(100)};
      height: ${translatePxToRem(100)};
      margin: ${translatePxToRem(20)};
      border-radius: 50%;
    }
    .player-img-rotate{
      animation: rotate 4s linear infinite;
    }
    @keyframes rotate {
      0% {
        transform: rotate(0deg)
      }
      50% {
        transform: rotate(180deg)
      }
      100% {
        transform: rotate(361deg)
      }
    }
  }
  
  .player-desc-wrapper{
    width: 50%;
    margin-top: ${translatePxToRem(20)};
    .player-name{
      height: ${translatePxToRem(50)};
      font-size: ${translatePxToRem(global.font_small)};
      line-height: ${translatePxToRem(50)};
      font-weight: bold;
      ${global.noWrap()}
    }
    .player-desc{
      height: ${translatePxToRem(50)};
      font-size: ${translatePxToRem(global.font_smaller)};
      line-height: ${translatePxToRem(50)};
      color: #666;
      ${global.noWrap()}
    }
  }
  .player-control-wrapper{
    display: flex;
    width: 30%;
    justify-content: space-around;
    align-items: center;
    .player-control{
      ${global.noWrap ()}
      .iconfont{
        font-size: ${translatePxToRem(50)};
        color: ${global['theme-color']}
      }
      .icon-mini{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-57%);
        font-size: ${translatePxToRem(26)};
      }
    }
  }
`