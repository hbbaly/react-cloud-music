import React from 'react'
import PropTypes from 'prop-types'
import CircleBar from '../circleBar'
import { getName } from '../../../../utils/base'
function MiniPlayer(props) {
  const { currentSong, isStart, percent } = props
  const { showNormalPlayer, audioStart, openList } = props
  let miniStatusCom = isStart ? (
    <i className="icon-mini iconfont icon-pause">&#xe650;</i>
  ) : (
    <i className="icon-mini iconfont icon-play">&#xe61e;</i>
  )
  return (
    <div className="mini-player">
      <div
        className="player-img-wrapper"
        onClick={() => showNormalPlayer()}
      >
        <img
          className={isStart ? 'player-img-rotate player-img' : 'player-img'}
          src={currentSong.picUrl}
          width="40"
          height="40"
          alt="img"
        />
      </div>
      <div className="player-desc-wrapper" onClick={() => showNormalPlayer()}>
        <h2 className="player-name">{currentSong.name}</h2>
        <p className="player-desc">{getName(currentSong.ar)}</p>
      </div>
      <div className="player-control-wrapper">
        <div className="player-control" onClick={() => audioStart()}>
          <CircleBar radius={56} percent={percent}>
            {miniStatusCom}
          </CircleBar>
        </div>
        <div className="player-control" onClick={openList}>
          <i className="iconfont">&#xe640;</i>
        </div>
      </div>
    </div>
  )
}
MiniPlayer.defaultProps = {
  currentSong: {},
  isStart: false,
  showNormalPlayer: null,
  audioStart: null,
  openList: null,
  percent: 0
}
MiniPlayer.propTypes = {
  currentSong: PropTypes.object,
  isStart: PropTypes.bool,
  showNormalPlayer: PropTypes.func,
  audioStart: PropTypes.func,
  openList: PropTypes.func,
  percent: PropTypes.number
}
export default React.memo(MiniPlayer)
