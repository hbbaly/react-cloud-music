import React from 'react';
import { ListWrapper } from './style'
function PlayerList(props) {
  return (
    <ListWrapper>
      <div className="list-content">
        <div className="list-top">
          <div className="__left">
            顺序播放
          </div>
          <div className="__right">
            删除
          </div>
        </div>
      </div>
    </ListWrapper>
  )
}

export default React.memo(PlayerList)