import styled from 'styled-components'
import style from '../../assets/global'
import { translatePxToRem } from '../../utils/base'
export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: #9e5764;
  transform-origin: right bottom;
  &.fly-enter,
  &.fly-appear {
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active,
  &.fly-appear-active {
    transition: transform 0.3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform 0.3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`
export const TopDesc = styled.div`
  background-size: 100%;
  padding: ${translatePxToRem(10)} ${translatePxToRem(40)};
  padding-bottom: ${props => (props.issinger ? 0 : `${translatePxToRem(100)}`)};
  margin-bottom: ${props => (props.issinger ? 0 : `${translatePxToRem(40)}`)};
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: ${translatePxToRem(550)};
  position: relative;
  .background {
    z-index: -1;
    background-position: 0 0;
    background-size: 100% 100%;
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(${translatePxToRem(40)});
    background: url(${props => props.background}) no-repeat;

    .filter {
      position: absolute;
      z-index: 10;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba (7, 17, 27, 0.2);
    }
  }
  .singer-background {
    z-index: -1;
    background-position: 0 0;
    background-size: 100% 100%;
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(${props => props.background}) no-repeat center center;
    background-size: 100% 100%;
  }
  .add_list {
    position: absolute;
    bottom: 10%;
    left: 50%;
    width: ${translatePxToRem(200)};
    height: ${translatePxToRem(100)};
    margin-left: -${translatePxToRem(100)};
    line-height: ${translatePxToRem(100)};
    background: ${style['theme-color']};
    color: ${style['font-color-light']};
    font-size: 0;
    border-radius: ${translatePxToRem(16)};
    vertical-align: top;
    text-align: center;
    .iconfont {
      vertical-align: top;
      font-size: ${translatePxToRem(24)};
      margin: 0 ${translatePxToRem(0)} 0 ${translatePxToRem(20)};
    }
    span {
      font-size: ${translatePxToRem(34)};
      line-height: ${translatePxToRem(100)};
    }
  }
  .img_wrapper {
    width: ${translatePxToRem(240)};
    height: ${translatePxToRem(240)};
    position: relative;
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: ${translatePxToRem(70)};
      border-radius: ${translatePxToRem(6)};
      background: linear-gradient
        (hsla (0, 0%, 43%, 0.4), hsla (0, 0%, 100%, 0));
    }
    .play_count {
      position: absolute;
      right: ${translatePxToRem(4)};
      top: ${translatePxToRem(4)};
      font-size: ${style['font_small']};
      line-height: ${translatePxToRem(30)};
      color: ${style['font-color-light']};
      .play {
        vertical-align: top;
      }
    }
    img {
      width: ${translatePxToRem(240)};
      height: ${translatePxToRem(240)};
      border-radius: ${translatePxToRem(6)};
    }
  }
  .desc_wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: ${translatePxToRem(240)};
    padding: 0 ${translatePxToRem(20)};
    .title {
      max-height: ${translatePxToRem(140)};
      color: ${style['font-color-light']};
      font-weight: 700;
      line-height: 1.5;
      font-size: ${style['font_small']};
    }
    .person {
      display: flex;
      .avatar {
        width: ${translatePxToRem(40)};
        height: ${translatePxToRem(40)};
        margin-right: ${translatePxToRem(10)};
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        line-height: ${translatePxToRem(40)};
        font-size: ${style['font_small']};
        color: ${style['font-color-desc-v2']};
      }
    }
  }
`

export const Menu = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 ${translatePxToRem(60)} ${translatePxToRem(40)}
    ${translatePxToRem(60)};
  margin: -100px 0 0 0;
  > div {
    display: flex;
    flex-direction: column;
    line-height: ${translatePxToRem(40)};
    text-align: center;
    font-size: ${style['font_small']};
    color: ${style['font-color-light']};
    z-index: 1000;
    font-weight: 500;
    .iconfont {
      font-size: ${translatePxToRem(40)};
    }
  }
`

export const SongList = styled.div`
  border-radius: ${translatePxToRem(20)};
  opacity: 0.98;
  ${props =>
    props.showBackground
      ? `background: ${style['highlight-background-color']}`
      : ''}
  .first_line {
    box-sizing: border-box;
    padding: ${translatePxToRem(20)} 0;
    margin-left: ${translatePxToRem(20)};
    position: relative;
    justify-content: space-between;
    border-bottom: 1px solid ${style['border-color']};
    .play_all {
      display: inline-block;
      line-height: ${translatePxToRem(48)};
      color: ${style['font-color-desc']};
      .iconfont {
        font-size: ${translatePxToRem(48)};
        margin-right: ${translatePxToRem(20)};
        vertical-align: top;
      }
      .sum {
        font-size: ${style['font_small']};
        color: ${style['font-color-desc-v2']};
      }
      > span {
        vertical-align: top;
      }
    }
    .add_list,
    .isCollected {
      display: flex;
      align-items: center;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: ${translatePxToRem(260)};
      line-height: ${translatePxToRem(69)};
      background: ${style['theme-color']};
      color: ${style['font-color-light']};
      font-size: 0;
      border-radius: ${translatePxToRem(6)};
      vertical-align: top;
      .iconfont {
        vertical-align: top;
        font-size: ${translatePxToRem(20)};
        margin: 0 ${translatePxToRem(10)} 0 ${translatePxToRem(20)};
      }
      span {
        font-size: ${translatePxToRem(28)};
        line-height: ${translatePxToRem(69)};
      }
    }
    .isCollected {
      display: flex;
      background: ${style['background-color']};
      color: ${style['font-color-desc']};
    }
  }
`
export const SongItem = styled.ul`
  > li {
    display: flex;
    height: ${translatePxToRem(120)};
    align-items: center;
    .index {
      flex-basis: ${translatePxToRem(120)};
      width: ${translatePxToRem(120)};
      height: ${translatePxToRem(120)};
      line-height: ${translatePxToRem(120)};
      text-align: center;
    }
    .info {
      box-sizing: border-box;
      flex: 1;
      display: flex;
      height: 100%;
      padding: ${translatePxToRem(10)} 0;
      flex-direction: column;
      justify-content: space-around;
      border-bottom: 1px solid ${style['border-color']};
      ${style.noWrap()}
      >span {
        font-size: ${style['font_small']};
        ${style.noWrap()}
      }
      > span:first-child {
        color: ${style['font-color-desc']};
      }
      > span:last-child {
        font-size: ${style['font_small']};
        color: #bba8a8;
      }
    }
  }
`
