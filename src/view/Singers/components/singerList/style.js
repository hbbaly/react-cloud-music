import styled from 'styled-components'
import style from '../../../../assets/global'
import { translatePxToRem } from '../../../../utils/base'
export const ListContainer = styled.div`
  position: fixed;
  top: ${translatePxToRem(320)};
  left: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
`

export const List = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  overflow: hidden;
  .title {
    margin: ${translatePxToRem(20)} 0 ${translatePxToRem(20)}
      ${translatePxToRem(20)};
    color: ${style['font-color-desc']};
    font-size: ${translatePxToRem(28)};
  }
`
export const ListItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin: 0 ${translatePxToRem(10)};
  padding: ${translatePxToRem(10)} 0;
  align-items: center;
  border-bottom: ${translatePxToRem(1)} solid ${style['border-color']};
  .img_wrapper {
    margin-right: ${translatePxToRem(40)};
    img {
      border-radius: ${translatePxToRem(6)};
      width: ${translatePxToRem(100)};
      height: ${translatePxToRem(100)};
    }
  }
  .name {
    font-size: ${translatePxToRem(28)};
    color: ${style['font-color-desc']};
    font-weight: 500;
  }
`
