import styled from 'styled-components'
import global from '../../../../assets/global'

import { translatePxToRem } from '../../../../utils/base'

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const ListWrapper = styled(FlexBox)`
  padding: ${translatePxToRem(30)};
  flex-direction: column;
  .list-title{
    padding-top: ${translatePxToRem(30)};
    margin-bottom: ${translatePxToRem(40)};
    font-size: ${translatePxToRem(30)};
    color: rgb(187, 168, 168);
  }
`
export const ListContent = styled(FlexBox)`
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
  .list-item{
    font-size: ${translatePxToRem(30)};
    color: rgb(46, 48, 48);
    padding: ${translatePxToRem(10)} ${translatePxToRem(20)};
    margin: 0px ${translatePxToRem(40)} ${translatePxToRem(20)} 0px;
    border-radius: ${translatePxToRem(12)};
    background: rgb(255, 255, 255);
  }
`