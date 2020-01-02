import styled from "styled-components";
import style from "../../../../assets/global";
import { translatePxToRem } from '../../../../utils/base'
export const ListWrapper = styled.div`
  max-width: 100%;
  .title {
    font-weight: 700;
    padding-left: ${translatePxToRem(12)};
    font-size: ${translatePxToRem(28)};
    line-height: ${translatePxToRem(120)};
    color: ${style["font-color"]};
  }
`;
export const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const ListItem = styled.div`
  position: relative;
  width: ${translatePxToRem(240)};
  .img_wrapper {
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: ${translatePxToRem(70)};
      border-radius: ${translatePxToRem(6)};
      background: linear-gradient (hsla(0, 0%, 43%, 0.4), hsla(0, 0%, 100%, 0));
    }
    position: relative;
    height: 0;
    padding-bottom: 100%;
    .play_count {
      position: absolute;
      right: ${translatePxToRem(4)};
      top: ${translatePxToRem(4)};
      font-size: ${style['font_base']};
      line-height: ${translatePxToRem(30)};
      color: ${style["font-color-light"]};
      .play {
        vertical-align: top;
      }
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: ${translatePxToRem(6)};
    }
  }
  .desc {
    overflow: hidden;
    margin-top: ${translatePxToRem(4)};
    padding: 0 ${translatePxToRem(4)};
    height: ${translatePxToRem(100)};
    text-align: left;
    font-size: ${style["font_smaller"]};
    line-height: 1.4;
    color: ${style["font-color-desc"]};
  }
`;
