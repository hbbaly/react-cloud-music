import React, { useState, useEffect, useRef } from 'react'
import animations from 'create-keyframe-animation'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { MiniPlayerWrapper } from './style'
import { getName } from '../../utils/base'
import CircleBar from './components/circleBar'
import PlayerList from './components/list'
import albumStore from '../Album/store'
import store from './store'
function Player(props) {
  const { playerList, chooseIndex, songUrl } = props
  const { chooseItem, requestSongUrl } = props
  const [isStart, setIsStart] = useState(true)

  const audioStart = () => {
    setIsStart(!isStart)
  }

  const audioRef = useRef()
  const imgRef = useRef()

  const [showStatus, setShowStatus] = useState(false)
  const { isShowMini } = props

  const [showList, setShowList] = useState(false)

  const [songId, setSongId] = useState(0)

  const [currentSong, setCurrentSong] = useState({ar: [], name: ''})

  useEffect(() => {
    // effect
    if (isShowMini) setShowStatus(true)
    if (playerList.length) {
      setSongId(playerList[chooseIndex].id)
      requestSongUrl(playerList[chooseIndex].id)

    }
    return () => {
      // cleanup
    }
  }, [isShowMini, playerList.length, chooseIndex])

  useEffect(() => {
    if (playerList.length) {
      let data = {
        ar: playerList[chooseIndex].ar,
        name: playerList[chooseIndex].name,
        picUrl: playerList[chooseIndex].al.picUrl,
        url: songUrl.url
      }
      setCurrentSong(data)

    }
    return () => {
      
    };
  }, [songUrl, chooseIndex])
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

  useEffect(() => {
    if (audioRef.current) {
    audioRef.current.addEventListener("ended", function() {
      // 当音轨播放完毕时候做你想做的事情
      console.log('播放完毕');
    });
  }
    return () => {
      // cleanup
    };
  }, [audioRef])
  const onEntered = () => {
    setSongTime(audioRef.current.duration)
  }
  const newCurrentTime = e => {
    let percent = isNaN(e.target.currentTime / songTime)
      ? 0
      : e.target.currentTime / songTime
    setPercent(percent)
  }
  const closeList = (e) => {
    e.persist();
    // e.target.className !== 'song-name' && setShowList(false)
    setShowList(false)
  }
  const openList = () => {
    setShowList(true)
  }
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="mini"
      appear={true}
      unmountOnExit
      onEntered={() => onEntered()}
      // onExited={}
    >
      <div>
        <MiniPlayerWrapper>
          <div className="player-img-wrapper" ref={imgRef}>
            <img
              className={
                isStart ? 'player-img-rotate player-img' : 'player-img'
              }
              src={currentSong.picUrl}
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
            <div className="player-control" onClick={openList}>
              <i className="iconfont">&#xe640;</i>
            </div>
          </div>
        </MiniPlayerWrapper>
        <audio
          ref={audioRef}
          onTimeUpdate={newCurrentTime}
          src={currentSong.url}
          autoPlay
          hidden
        ></audio>
        {showList ? (
          <PlayerList
            list={playerList}
            chooseIndex={chooseIndex}
            chooseItem={chooseItem}
            closeList={closeList}
          />
        ) : null}
      </div>
    </CSSTransition>
  )
}
const mapStateToProps = state => {
  return {
    isShowMini: state.getIn(['album', 'isShowMini']),
    playerList: state.getIn(['album', 'playerList']).toJS(),
    chooseIndex: state.getIn(['album', 'chooseIndex']),
    songUrl: state.getIn(['player', 'songUrl']),
  }
}
const mapDispatchToProps = dispatch => ({
  chooseItem(index) {
    dispatch(albumStore.actionCreator.setChooseIndex(index))
  },
  requestSongUrl (id) {
    dispatch(store.actionCreator.requestSongUrl(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player))
