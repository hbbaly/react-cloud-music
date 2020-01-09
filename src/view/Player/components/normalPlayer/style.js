import styled from 'styled-components'
import { translatePxToRem } from '../../../../utils/base'
import global from '../../../../assets/global'

export const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`
export const PlayerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: url(${props => props.background}) no-repeat;
`
export const PlayerTop = styled(FlexBox)`

`
