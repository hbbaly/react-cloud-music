import styled from 'styled-components';
import style from '../../assets/global';
import { translatePxToRem } from '../../utils/base'
export const HeaderContainer = styled.div`
  position: fixed;
  padding: ${translatePxToRem(10)} ${translatePxToRem(20)};
  height: ${translatePxToRem(40)};
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: ${translatePxToRem(40)};
  color: ${style ["font-color-light"]};
  .back {
    margin-right: ${translatePxToRem(10)};
    font-size: ${translatePxToRem(40)};
    width: ${translatePxToRem(40)};
  }
  >h1 {
    font-size: ${style ["font_base"]};
    font-weight: 700;
  }
  marquee{
    h1{
      font-size: ${style ["font_base"]};
      font-weight: 700;
    }
  }
`