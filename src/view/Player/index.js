import React, { useState, useEffect, useRef, useCallback } from 'react'
import animations from 'create-keyframe-animation'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { MiniPlayerWrapper } from './style'
import { getName } from '../../utils/base'
import CircleBar from './components/circleBar'
import PlayerList from './components/list'
import NormalPlayer from './components/normalPlayer'
import albumStore from '../Album/store'
import store from './store'

function Player(props) {
  const { isShowMini, playerList, chooseIndex, songUrl, playMode } = props
  const { chooseItem, requestSongUrl, setPlayMode } = props

  const audioRef = useRef()
  const imgRef = useRef()

  const [showList, setShowList] = useState(false)
  const [showStatus, setShowStatus] = useState(false)
  const [songId, setSongId] = useState(0)
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    // effect
    if (isShowMini) setShowStatus(true)
    if (playerList.length) {
      setSongId(playerList[chooseIndex].id)
      requestSongUrl(playerList[chooseIndex].id)
      setPercent(0)
    }
    return () => {
      // cleanup
    }
  }, [isShowMini, playerList.length, chooseIndex])

  const [currentSong, setCurrentSong] = useState({ ar: [], name: '' })
  const [songTime, setSongTime] = useState(0)

  useEffect(() => {
    if (playerList.length) {
      let data = {
        ar: playerList[chooseIndex].ar,
        name: playerList[chooseIndex].name,
        picUrl: playerList[chooseIndex].al.picUrl,
        url: songUrl.url
      }
      setCurrentSong(data)
      setPercent(0)

      if (songUrl.url && audioRef.current.duration) {
        setSongTime(audioRef.current.duration)
      }
    }
    return () => {}
  }, [songUrl.url, chooseIndex])
  
  const [isStart, setIsStart] = useState(true)

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
      audioRef.current.addEventListener('ended', function() {
        // 当音轨播放完毕时候做你想做的事情
        console.log('播放完毕')
        // 播放下一首
        chooseMode()
        setPercent(0)
      })
      function chooseMode() {
        if (playMode === 1) {
          // 顺序播放
          chooseItem(chooseIndex + 1)
        } else if (playMode === 2) {
          // 随机
          let index = Math.floor(Math.random() * playerList.length)
          chooseItem(index)
        } else if (playMode === 3) {
          chooseItem(chooseIndex)
        }
      }
    }
    return () => {
      // cleanup
    }
  }, [audioRef.current])

  const audioStart = () => {
    setIsStart(!isStart)
  }
  const onEntered = () => {
    setSongTime(audioRef.current.duration)
  }
  const newCurrentTime = e => {
    let percent = isNaN(e.target.currentTime / songTime)
      ? 0
      : e.target.currentTime / songTime
    setPercent(percent)
  }
  const closeList = e => {
    e.persist()
    // e.target.className !== 'song-name' && setShowList(false)
    setShowList(false)
  }
  const openList = () => {
    setShowList(true)
  }
  const getPlayMode = useCallback((mode = 1) => {
    setPlayMode(mode)
  }, [mode])
  
  return (
    <CSSTransition
      in={showStatus}
      timeout={500}
      classNames="mini"
      appear={true}
      unmountOnExit
      onEntered={() => onEntered()}
      // onExited={}
    >
      <MiniPlayerWrapper>
        <div className="player-img-wrapper" ref={imgRef}>
          <img
            className={isStart ? 'player-img-rotate player-img' : 'player-img'}
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
        <audio
          ref={audioRef}
          onTimeUpdate={newCurrentTime}
          src={currentSong.url}
          autoPlay
          hidden
        ></audio>
        <PlayerList
          list={playerList}
          showList={showList}
          chooseIndex={chooseIndex}
          chooseItem={chooseItem}
          closeList={closeList}
          mode={playMode}
          getPlayMode={getPlayMode}
        />
        <NormalPlayer />
      </MiniPlayerWrapper>
    </CSSTransition>
  )
}
const mapStateToProps = state => {
  return {
    isShowMini: state.getIn(['album', 'isShowMini']),
    playerList: state.getIn(['album', 'playerList']).toJS(),
    chooseIndex: state.getIn(['album', 'chooseIndex']),
    songUrl: state.getIn(['player', 'songUrl']),
    playMode: state.getIn(['player', 'playMode'])
  }
}
const mapDispatchToProps = dispatch => ({
  chooseItem(index) {
    dispatch(albumStore.actionCreator.setChooseIndex(index))
  },
  requestSongUrl(id) {
    dispatch(store.actionCreator.requestSongUrl(id))
  },
  setPlayMode(mode) {
    dispatch(store.actionCreator.setPlayMode(mode))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player))
