import styled from 'styled-components'
import GlobalStyle from '../../assets/global'
export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${GlobalStyle.space_smallest} ${GlobalStyle.space_smaller};
  background: ${GlobalStyle["theme-color"]};
  &>span {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
    &.iconfont {
      font-size: 25px;
    }
  }
`
const TabOrigin = styled.div`
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
export const Tab = styled(TabOrigin)`
  background: ${GlobalStyle["theme-color"]};
  a {
    flex: 1;
    padding: 2px 0;
    font-size: 14px;
    color: #e4e4e4;
    &.selected {
      span {
        padding: 3px 0;
        font-weight: 700;
        color: #f1f1f1;
        border-bottom: 2px solid #f1f1f1;
      }
    }
  }
`
export const TabItem = styled(TabOrigin)`
  justify-content: center;
  align-items: center;
`