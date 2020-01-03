import styled from 'styled-components'
import { translatePxToRem } from '../../../../utils/base'
export const ScrollWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`
export const ScrollTitle = styled.div`
  overflow: hidden;
  height: ${translatePxToRem(100)};
  padding: 0 ${translatePxToRem(20)};
  line-height: ${translatePxToRem(100)};
  font-size: ${translatePxToRem(28)};
  color: #f60;
`
export const ScrollContent = styled.div`
  display: flex;
  overflow: hidden;
  height: ${translatePxToRem(100)};
  line-height: ${translatePxToRem(100)};
  .scroll-item {
    width: auto;
    padding-left: ${translatePxToRem(20)};
    font-size: ${translatePxToRem(28)};
  }
  .selected {
    color: #d44439;
  }
`
