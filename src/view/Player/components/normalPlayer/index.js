import React from 'react'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import { PlayerWrapper, PlayerTop, Rotate } from './style'
import { getName } from '../../../../utils/base'
function NormalPlayer(props) {
  const { showNormal, currentSong } = props

  const { closeNormal } = props

  return (
    <CSSTransition
      in={showNormal}
      timeout={300}
      classNames="mini"
      appear={true}
      unmountOnExit
      // onExited={}
    >
      <PlayerWrapper background={currentSong.picUrl}>
        <div className="player-wrapper">
          <div className="content-wrapper">
            <div className="filter"></div>
          </div>
          <PlayerTop>
            <div className="close-normal" onClick={() => closeNormal()}>
              <i className="iconfont icon-back">&#xe662;</i>
            </div>
            <div className="song-detail-tab">歌曲</div>
            <div className="song-lyric">歌词</div>
          </PlayerTop>
          <Rotate src={currentSong.picUrl + '?param=400x400'}>
          </Rotate>
        </div>
      </PlayerWrapper>
    </CSSTransition>
  )
}
NormalPlayer.defaultProps = {
  showNormal: false,
  currentSong: {},
  closeNormal: null
}
NormalPlayer.propTypes = {
  showNormal: PropTypes.bool,
  currentSong: PropTypes.object,
  closeNormal: PropTypes.func
}
export default React.memo(NormalPlayer)
