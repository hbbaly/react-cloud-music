import React from 'react';
import { PlayerTop } from './style'
function NormalPlayer(props) {
  return (
    <div>
      <PlayerTop>
        <div className="song-detail-tab">
          歌曲
        </div>
        <div className="song-lyric">
          歌词
        </div>
      </PlayerTop>
    </div>
  )
}
export default React.memo(NormalPlayer)