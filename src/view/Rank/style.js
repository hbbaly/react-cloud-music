import styled from 'styled-components'
import style from '../../assets/global'
import { translatePxToRem } from '../../utils/base'
// Props 中的 globalRank 和 tracks.length 均代表是否为全球榜

export const Container = styled.div`
  position: fixed;
  top: ${translatePxToRem(180)};
  bottom: 0;
  width: 100%;
  .offical,
  .global {
    margin: ${translatePxToRem(20)} ${translatePxToRem(10)};
    padding-top: ${translatePxToRem(30)};
    font-weight: 700;
    font-size: ${style['font_small']};
    color: ${style['font-color-desc']};
  }
`
export const List = styled.ul`
  margin-top: ${translatePxToRem(20)};
  padding: 0 ${translatePxToRem(10)};
  display: ${props => (props.globalRank ? 'flex' : '')};
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  background: ${style['background-color']};
  &::after {
    content: '';
    display: block;
    width: 32vw;
  }
`
export const ListItem = styled.li`
  display: ${props => (props.tracks.length ? 'flex' : '')};
  padding: ${translatePxToRem(6)} 0;
  border-bottom: 1px solid ${style['border-color']};
  .img_wrapper {
    width: ${props => (props.tracks.length ? '27vw' : '32vw')};
    height: ${props => (props.tracks.length ? '27vw' : '32vw')};
    border-radius: ${translatePxToRem(6)};
    position: relative;
    .decorate {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: ${translatePxToRem(70)};
      border-radius: ${translatePxToRem(6)};
      background: linear-gradient
        (hsla (0, 0%, 100%, 0), hsla (0, 0%, 43%, 0.4));
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: ${translatePxToRem(6)};
    }
    .update_frequecy {
      position: absolute;
      left: ${translatePxToRem(14)};
      bottom: ${translatePxToRem(14)};
      font-size: ${style['font_small']};
      color: ${style['font-color-light']};
    }
  }
`
export const SongList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: ${translatePxToRem(20)}
  > li {
    font-size: ${style['font_small']};
    color: grey;
  }
`
