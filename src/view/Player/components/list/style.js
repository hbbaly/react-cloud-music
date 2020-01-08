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
    background: #ddd;
    .list-top{
      display: flex;
      width: 100%;
      height: ${translatePxToRem(80)};
      justify-content: space-between;
      background: #ccc;
      .__left, .__right{
        line-height:${translatePxToRem(80)};
        font-size: ${translatePxToRem(28)};
        &:hover{
          ${global['theme-color']};
        }
      }
      .__left{
        margin-left: ${translatePxToRem(30)}
      }
      .__right{
        margin-right: ${translatePxToRem(30)}
      }
    }
  }
  .list-item-wrapper{
    overflow-y: scroll;
    padding: 0 ${translatePxToRem(30)};
    .list-item{
      display: flex;
      height: ${translatePxToRem(80)};
      line-height: ${translatePxToRem(80)};
      .song-name{
        width: 50%;
        ${global.noWrap()}
        .item-index{
          display: inline-block;
          margin-right: ${translatePxToRem(8)};
        }
      }
      .singer-name{
        width: 30%;
        ${global.noWrap()}
      }
      .song-duration{
        width: 20%;
        text-align: right;
      }
    }
    .list-item-act{
      position: relative;
      color: ${global['theme-color']};
      &:before{
        content: '';
        position:absolute;
        top: 50%;
        left: -${translatePxToRem(26)};
        width: ${translatePxToRem(20)};
        height: ${translatePxToRem(20)};
        margin-top: -${translatePxToRem(10)};
        background:  ${global['theme-color']};
        border-radius: 50%;
      }
    }
  }
`