import React, {useRef, useEffect} from 'react';
import { ListWrapper } from './style'
import PropTypes from 'prop-types'
import { getName } from '../../../../utils/base'
import Scroll from '../../../../components/scroll'
import { translatePxToRem } from '../../../../utils/base'

function PlayerList(props) {
  const { list, chooseIndex } = props
  const { chooseItem, closeList } = props
  const listScroll = useRef()
  useEffect(() => {
    
    // chooseIndex 改变
    if (chooseIndex >= 10 && listScroll.current) {
      // 延迟，拿到bScroll
      setTimeout(() => {
        listScroll.current.scrollTo(0, -((chooseIndex+1)/10)*400 - ((chooseIndex+1)%10)*40)
      }, 0);
    }
    return () => {
      // cleanup
    };
  }, [chooseIndex])
  return ( 
      <ListWrapper onClick={(e) => closeList(e)}>
        <div className="list-content">
          <div className="list-top">
            <div className="__left">
              顺序播放
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
                    <div className="song-name"><span className="item-index">{index+1}.</span>{item.name}</div>
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
  closeList: null
}
PlayerList.propTypes = {
  list: PropTypes.array,
  chooseIndex: PropTypes.number,
  chooseItem: PropTypes.func,
  closeList: PropTypes.func
}
export default React.memo(PlayerList)