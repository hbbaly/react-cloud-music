import React, { useState, useEffect, useRef, useCallback } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { MiniPlayerWrapper } from './style'
import PlayerList from './components/list'
import NormalPlayer from './components/normalPlayer'
import MiniPlayer from './components/miniPlayer'
import albumStore from '../Album/store'
import store from './store'
import Lyric from '../../utils/lyric-parse'
function Player(props) {
  const { isShowMini, playerList, chooseIndex, songUrl, playMode, lyric } = props
  const { chooseItem, requestSongUrl, setPlayMode, requestSongLyric } = props

  const audioRef = useRef()

  const [lyricAll, setLyricAll] = useState([])
  const [lyricPos, setLyricPos] = useState(0)
  const [showList, setShowList] = useState(false)
  const [showStatus, setShowStatus] = useState(false)
  const [songId, setSongId] = useState(0)
  const [percent, setPercent] = useState(0)
  const [showNormal, setShowNormal] = useState(false)
  const saveIndexRef = useRef(0)
  const savePlayMode = useRef(1)

  useEffect(() => {
    // effect
    if (isShowMini) setShowStatus(true)
    if (playerList.length) {
      setSongId(playerList[chooseIndex].id)
      requestSongUrl(playerList[chooseIndex].id)
      setPercent(0)
      saveIndexRef.current = chooseIndex
    }
    return () => {
      // cleanup
    }
  }, [isShowMini, playerList.length, chooseIndex])

  const [currentSong, setCurrentSong] = useState({ ar: [], name: '' })
  const [songTime, setSongTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

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
    }
    return () => {}
  }, [songUrl.url, chooseIndex])

  const [isStart, setIsStart] = useState(true)

  useEffect(() => {
    // effect
    if (audioRef.current) {
      isStart ? audioRef.current.play() : audioRef.current.pause()
    }
    return () => {
      // cleanup
    }
  }, [isStart])

  const [play, setPlay] = useState(0)
  const chooseMode = (chooseIndex, type = 'next') => {
    if (savePlayMode.current === 1) {
      // 顺序播放
      let index
      if (type === 'next') {
        index = chooseIndex + 1 > playerList.length - 1 ? 0 : chooseIndex + 1
      } else {
        index = chooseIndex - 1 < 0 ? playerList.length - 1 : chooseIndex - 1
      }
      chooseItem(index)
    } else if (savePlayMode.current === 2) {
      // 随机
      let index = Math.floor(Math.random() * playerList.length)
      chooseItem(index)
    } else if (savePlayMode.current === 3) {
      // 单曲循环
      // chooseItem(chooseIndex)
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
  }
  useEffect(() => {
    if (audioRef.current) {
      const nextPlay = () => {
        let index = play + 1
        setPlay(index)
        // 播放下一首
        chooseMode(saveIndexRef.current)
        setPercent(0)
      }
      audioRef.current.addEventListener('ended', function() {
        // 当音轨播放完毕时候做你想做的事情
        console.log('播放完毕')
        nextPlay()
      })
      audioRef.current.addEventListener('durationchange', function() {
        // 当音轨加载完毕求播放时长
        console.log('加载完毕')
        setSongTime(audioRef.current.duration)
      })
      audioRef.current.addEventListener('error', function() {
        // 在发生错误时触发
        console.log('播放失败')
        // 播放下一首
        nextPlay()
      })
    }
    return () => {
      // cleanup
    }
  }, [audioRef.current])

  useEffect(() => {
    // effect
    requestSongLyric(songId)
    return () => {
      // cleanup
    };
  }, [songId])
  const lyricRef = useRef()
  useEffect(() => {
    let arrLyric = lyric.size !== 0 ? lyric : []
    // effect
    if (arrLyric.length) {
      if (lyricRef.current) {
        lyricRef.current.stop()
        // lyricRef.current.seek(0)
        lyricRef.current = null
      }
        lyricRef.current = new Lyric(lyric, (obj) => {
          console.log(obj, '--------');
          if (obj.all) {
            setLyricAll(obj.all)
          } else {
            // 设置歌词的位置
            setLyricPos(obj.index)
          }
        })
        lyricRef.current.togglePlay()
    }
    
    return () => {
      // cleanup
    };
  }, [lyric])
  const audioStart = () => {
    setIsStart(!isStart)
    lyricRef.current.togglePlay()
  }
  const audioNext = () => {
    let index = play + 1
    setPlay(index)
    chooseMode(chooseIndex, 'next')
    setPercent(0)
  }
  const audioPrev = () => {
    let index = play + 1
    setPlay(index)
    chooseMode(chooseIndex, 'prev')
    setPercent(0)
  }
  const onEntered = () => {
    setSongTime(audioRef.current.duration)
  }
  const newCurrentTime = e => {
    setCurrentTime(Math.ceil(e.target.currentTime))
    let percent = isNaN(e.target.currentTime / songTime)
      ? 0
      : e.target.currentTime / songTime
    setPercent(percent)
  }
  const changePlayTime = time => {
    audioRef.current.currentTime = time
    lyricRef.current.seek(time*1000)
  }
  const closeList = e => {
    e.persist()
    // e.target.className !== 'song-name' && setShowList(false)
    setShowList(false)
  }
  const openList = () => {
    setShowList(true)
  }
  const getPlayMode = mode => {
    savePlayMode.current = mode
    setPlayMode(mode)
  }
  const showNormalPlayer = () => {
    !showNormal && setShowNormal(true)
  }
  const closeNormal = () => {
    showNormal && setShowNormal(false)
  }
  const setPlayRate = res => {
    if (!audioRef.current) return
    audioRef.current.playbackRate = res
  }
  const changeLyricLine = (line) => {
    let time  = lyricAll[line].time
    // if (audioRef.current) audioRef.current.currentTime = time
    console.log(time);
    // setPercent(time / songTime)
    
  }
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
        <MiniPlayer
          isStart={isStart}
          currentSong={currentSong}
          percent={percent}
          showNormalPlayer={showNormalPlayer}
          audioStart={audioStart}
          openList={openList}
        />
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
        <NormalPlayer
          showNormal={showNormal}
          currentSong={currentSong}
          closeNormal={closeNormal}
          audioStart={audioStart}
          audioNext={audioNext}
          audioPrev={audioPrev}
          getPlayMode={getPlayMode}
          openList={openList}
          setPlayRate={setPlayRate}
          isStart={isStart}
          duration={songTime}
          currentTime={currentTime}
          percent={percent}
          changePlayTime={changePlayTime}
          index={lyricPos}
          lyric={lyricAll}
          changeLyricLine={changeLyricLine}
        />
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
    playMode: state.getIn(['player', 'playMode']),
    lyric: state.getIn(['player', 'lyric'])
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
  },
  requestSongLyric (id) {
    dispatch(store.actionCreator.requestSongLyric(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player))
