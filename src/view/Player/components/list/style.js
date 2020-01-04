import styled from 'styled-components'
import { translatePxToRem } from '../../../../utils/base'
import global from '../../../../assets/global'
export const ListWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100000;
  background: rgba(0,0,0,.1);
  .list-content{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${translatePxToRem(900)};
    background: #f60;
    .list-top{
      display: flex;
      width: 100%;
      height: ${translatePxToRem(60)};
      justify-content: space-between;
    }
  }
`