import styled from 'styled-components'
import global from '../../assets/global'
import { translatePxToRem } from '../../utils/base'
export const PickerWrapper = styled.div`
  /* position: fixed;
  left: 0;
  top: ${translatePxToRem(100)};
  z-index: 100; */
  width: 100%;
  height: ${translatePxToRem(800)};
  overflow: hidden;
  text-align: center;
  font-size: ${translatePxToRem(28)};
  /* background-color: rgba(37, 38, 45, 0.4); */
  background: transparent;
  .picker-footer {
    height: ${translatePxToRem(40)};
  }
`
export const PickerPanelWrapper = styled.div`
  /* position: absolute;
  z-index: 600;
  top: ${translatePxToRem(0)}; */
  width: 100%;
  margin-top: ${translatePxToRem(100)};
  height: ${translatePxToRem(600)};
  /* background: white; */
  background: transparent;
  .picker-choose {
    position: relative;
    height: ${translatePxToRem(120)};
    color: #999;
    .picker-title {
      margin: 0;
      line-height: ${translatePxToRem(120)};
      font-weight: normal;
      text-align: center;
      font-size: ${translatePxToRem(36)};
      color: #333;
    }
    .confirm,
    .cancel {
      position: absolute;
      top: ${translatePxToRem(12)};
      padding: ${translatePxToRem(32)};
      font-size: ${translatePxToRem(28)};
    }
    .confirm {
      right: 0;
      color: #007bff;
      &:active {
        color: #5aaaff;
      }
    }
    .cancel {
      left: 0;
      &:active {
        color: #c2c2c2;
      }
    }
  }
`

export const PickerContentWrapper = styled.div`
    position: relative;
    top: ${translatePxToRem(40)};
    .mask-top,.mask-bottom {
      z-index: 10;
      width: 100%;
      height: ${translatePxToRem(250)};
      pointer-events: none;
      transform: translateZ(0);
    }
    .mask-top {
      position: absolute;
      top: 0;
      height: ${translatePxToRem(270)};
      background: linear-gradient(0deg,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8));
    }

    .mask-bottom {
      position: absolute;
      bottom: ${translatePxToRem(0)};
      background: linear-gradient(180deg,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8));
    }
`

export const WheelWrapper = styled.div`
  display: flex;
  padding: 0 ${translatePxToRem(32)};
  .wheel {
    -ms-flex: 1 1 0.000000001px;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    -webkit-flex-basis: 0.000000001px;
    flex-basis: 0.000000001px;
    width: 1%;
    height: ${translatePxToRem(600)};
    overflow: hidden;
    font-size: ${translatePxToRem(36)};
    .wheel-scroll {
      padding: 0;
      margin-top: ${translatePxToRem(270)};
      line-height: ${translatePxToRem(72)};
      list-style: none;
      .wheel-item {
        list-style: none;
        height: ${translatePxToRem(72)};
        overflow: hidden;
        white-space: nowrap;
        color: #333;
        &.wheel-disabled-item {
          opacity: 0.2;
        }
      }
    }
  }
`
