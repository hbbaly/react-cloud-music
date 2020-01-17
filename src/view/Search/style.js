import styled from 'styled-components'
import style from '../../assets/global'
import { translatePxToRem } from '../../utils/base'
export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  overflow: hidden;
  background: #f2f3f4;
  transform-origin: right bottom;
  &.fly-enter,
  &.fly-appear {
    transform: translate3d(100%, 0, 0);
  }
  &.fly-enter-active,
  &.fly-appear-active {
    transition: all 0.3s;
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: all 0.3s;
    transform: translate3d(100%, 0, 0);
  }
`
export const SearchBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 ${translatePxToRem(12)};
  padding-right: ${translatePxToRem(40)};
  height: ${translatePxToRem(80)};
  background: ${style['theme-color']};
  .icon-back {
    font-size: ${translatePxToRem(48)};
    color: ${style['font-color-light']};
  }
  .box {
    flex: 1;
    margin: 0 ${translatePxToRem(10)};
    line-height: ${translatePxToRem(36)};
    background: ${style['theme-color']};
    color: ${style['highlight-background-color']};
    font-size: ${translatePxToRem(32)};
    outline: none;
    border: none;
    border-bottom: 1px solid ${style['border-color']};
    &::placeholder {
      font-size: ${translatePxToRem(32)};
      color: ${style['font-color-light']};
    }
  }
  .icon-delete {
    font-size: ${translatePxToRem(32)};
    color: ${style['background-color']};
  }
`
