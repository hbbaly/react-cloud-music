import styled from 'styled-components'
import GlobalStyle from '../../assets/global'

import { translatePxToRem } from '../../utils/base'
export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${GlobalStyle.space_smallest} ${GlobalStyle.space_smaller};
  background: ${GlobalStyle["theme-color"]};
  &>span {
    line-height: ${translatePxToRem(80)};
    color: #f1f1f1;
    font-size: ${translatePxToRem(40)};
    &.iconfont {
      font-size: ${translatePxToRem(50)};
    }
  }
`
const TabOrigin = styled.div`
  height: ${translatePxToRem(88)};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
export const Tab = styled(TabOrigin)`
  background: ${GlobalStyle["theme-color"]};
  a {
    flex: 1;
    padding: ${translatePxToRem(4)} 0;
    font-size: ${translatePxToRem(28)};
    color: #e4e4e4;
    &.selected {
      span {
        padding: ${translatePxToRem(6)} 0;
        font-weight: 700;
        color: #f1f1f1;
        border-bottom: ${translatePxToRem(4)} solid #f1f1f1;
      }
    }
  }
`
export const TabItem = styled(TabOrigin)`
  justify-content: center;
  align-items: center;
`