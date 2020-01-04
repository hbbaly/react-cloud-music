import React, { useState, useEffect, useRef } from 'react'
import animations from 'create-keyframe-animation'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { MiniPlayerWrapper } from './style'
import { getName } from '../../utils/base'
import CircleBar from './components/circleBar'
import PlayerList from './components/list'
function Player(props) {
  console.log(props, '======');
  
  const currentSong = {
    al: {
      picUrl:
        'https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg'
    },
    name: '木偶人',
    ar: [{ name: '薛之谦' }]
  }
  const [isStart, setIsStart] = useState(true)

  const audioStart = () => {
    setIsStart(!isStart)
  }

  const audioRef = useRef()
  const imgRef = useRef()

  const [showStatus, setShowStatus] = useState(false)
  const { isShowMini } = props

  useEffect(() => {
    // effect
    if (isShowMini) setShowStatus(true)
    return () => {
      // cleanup
    }
  }, [isShowMini])

  const [songTime, setSongTime] = useState(0)
  const [percent, setPercent] = useState(0)
  useEffect(() => {
    // effect
    if (audioRef.current) {
      isStart ? audioRef.current.play() : audioRef.current.pause()
    }
    // let animation = [
    //   {
    //     opacity: 0
    //   },
    //   {
    //     opacity: 0.8
    //   }
    // ]
    // animations.registerAnimation({
    //   name: 'move', //动画名称
    //   animation: animation
    // })
    // animations.runAnimation(imgRef.current, 'move', function() {})
    return () => {
      // cleanup
    }
  }, [isStart])
  const onEntered = () => {
    setSongTime(audioRef.current.duration)
  }
  const newCurrentTime = (e) => {
    let percent = isNaN(e.target.currentTime/songTime) ? 0 : e.target.currentTime/songTime
    setPercent(percent)
  }
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="mini"
      appear={true}
      unmountOnExit
      onEntered={()=>onEntered()}
      // onExited={}
    >
      <div>
        <MiniPlayerWrapper>
          <div className="player-img-wrapper" ref={imgRef}>
            <img
              className={
                isStart ? 'player-img-rotate player-img' : 'player-img'
              }
              src={currentSong.al.picUrl}
              width="40"
              height="40"
              alt="img"
            />
          </div>
          <div className="player-desc-wrapper">
            <h2 className="player-name">{currentSong.name}</h2>
            <p className="player-desc">{getName(currentSong.ar)}</p>
          </div>
          <div className="player-control-wrapper">
            <div className="player-control" onClick={() => audioStart()}>
              <CircleBar radius={56} percent={percent}>
                <i
                  className={`${
                    isStart
                      ? 'icon-mini iconfont icon-pause'
                      : 'icon-mini iconfont icon-play'
                  }`}
                >
                  &#xe650;
                </i>{' '}
              </CircleBar>
            </div>
            <div className="player-control">
              <i className="iconfont">&#xe640;</i>
            </div>
          </div>
        </MiniPlayerWrapper>
        <audio
          ref={audioRef}
          onTimeUpdate={newCurrentTime}
          src="https://music.163.com/song/media/outer/url?id=417859631.mp3"
          autoPlay
          hidden
        ></audio>
        <PlayerList />
      </div>
    </CSSTransition>
  )
}
const mapStateToProps = state => {
  return {
    isShowMini: state.getIn(['album', 'isShowMini'])
  }
}
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player))
