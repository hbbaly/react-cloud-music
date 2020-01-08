import React, {useRef, useEffect, useState} from 'react';
import { ListWrapper } from './style'
import PropTypes from 'prop-types'
import { getName } from '../../../../utils/base'
import Scroll from '../../../../components/scroll'
import { translatePxToRem } from '../../../../utils/base'

function PlayerList(props) {
  const { list, chooseIndex, mode } = props
  const { chooseItem, closeList, getPlayMode } = props
  const listScroll = useRef()
  const allPlayMode = {
    1: '顺序播放',
    2: '无序播放',
    3: '单曲循环'
  }
  const [playMode, setPlayMode] = useState(mode)

  useEffect(() => {
    
    // chooseIndex 改变
    if (chooseIndex >= 10 && listScroll.current) {
      // 延迟，拿到bScroll
      setTimeout(() => {
        listScroll.current.scrollTo(0, -(chooseIndex*2-5)*40)
      }, 0);
    }
    return () => {
      // cleanup
    };
  }, [chooseIndex])

  const choosePlayMode = (e) => {
    e.persist();
    e.stopPropagation();
    if (playMode >= 3) {
      setPlayMode(1)
      getPlayMode(1)
    } else {
      setPlayMode(playMode + 1)
      getPlayMode(playMode + 1)
    }
  }
  return ( 
      <ListWrapper onClick={(e) => closeList(e)}>
        <div className="list-content">
          <div className="list-top">
            <div className="__left" onClick={choosePlayMode}>
              {allPlayMode[playMode]}
            </div>
            <div className="__right">
              收回
            </div>
          </div>
          <Scroll
            scrollHeight={translatePxToRem(820)}
            ref={listScroll}
            data={list}>
            <div className="list-item-wrapper">
              {
                list.map((item, index) => (
                  <div className={chooseIndex === index ?  'list-item-act list-item': 'list-item'} onClick={() => chooseItem(index)} key={index}>
                    <div className="song-name"><span className="item-index"></span>{item.name}</div>
                    <div className="singer-name">{getName(item.ar)}</div>
                    {/* <div className="song-duration">34:10</div> */}
                  </div>
                ))
              }
            </div>
          </Scroll>
        </div>
      </ListWrapper>
  )
}
PlayerList.defaultProps = {
  list: [],
  chooseIndex: 0,
  chooseItem: null,
  closeList: null,
  getPlayMode: null,
  mode: 1
}
PlayerList.propTypes = {
  list: PropTypes.array,
  chooseIndex: PropTypes.number,
  chooseItem: PropTypes.func,
  closeList: PropTypes.func,
  getPlayMode: PropTypes.func,
  mode: PropTypes.number
}
export default React.memo(PlayerList)