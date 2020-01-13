import React, { useState, useRef, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import animations from 'create-keyframe-animation'
import {
  PlayerWrapper,
  PlayerTop,
  Rotate,
  RateWrapper,
  ProcressBar,
  BarWrapper
} from './style'
import { getName } from '../../../../utils/base'
function NormalPlayer(props) {
  const {
    showNormal,
    currentSong,
    isStart,
    currentTime,
    duration,
    percent
  } = props

  const {
    closeNormal,
    audioStart,
    audioNext,
    audioPrev,
    getPlayMode,
    openList,
    setPlayRate,
    changePlayTime
  } = props

  const rateArr = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0, 3.0]
  const [rateIndex, setRateIndex] = useState(2)

  const normalPlayerRef = useRef()
  const cdWrapperRef = useRef()

  const enter = () => {
    normalPlayerRef.current.style.display = 'block'
    const { x, y, scale } = _getPosAndScale()
    let animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`
      }
    }
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 800,
        easing: 'linear'
      }
    })
    animations.runAnimation(cdWrapperRef.current, 'move')
  }

  // 计算偏移的辅助函数
  const _getPosAndScale = () => {
    const targetWidth = 40
    const paddingLeft = 40
    const paddingBottom = 30
    const paddingTop = 80
    const width = window.innerWidth * 0.8
    const scale = targetWidth / width
    // 两个圆心的横坐标距离和纵坐标距离
    const x = -(window.innerWidth / 2 - paddingLeft)
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
    return {
      x,
      y,
      scale
    }
  }
  const afterEnter = () => {
    // 进入后解绑帧动画
    const cdWrapperDom = cdWrapperRef.current
    animations.unregisterAnimation('move')
    cdWrapperDom.style.animation = ''
  }
  const leave = () => {
    if (!cdWrapperRef.current) return
    const cdWrapperDom = cdWrapperRef.current
    cdWrapperDom.style.transition = 'all 0.4s'
    const { x, y, scale } = _getPosAndScale()
    cdWrapperDom.style[
      'transform'
    ] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
  }

  const afterLeave = () => {
    if (!cdWrapperRef.current) return
    const cdWrapperDom = cdWrapperRef.current
    cdWrapperDom.style.transition = ''
    cdWrapperDom.style['transform'] = ''
    // normalPlayerRef.current.style.display = "none";
  }

  const [playMode, setPlayMode] = useState(1)
  const choosePlayMode = e => {
    if (playMode >= 3) {
      setPlayMode(1)
      getPlayMode(1)
    } else {
      setPlayMode(playMode + 1)
      getPlayMode(playMode + 1)
    }
  }
  const setRate = index => {
    setRateIndex(index)
    let res = rateArr[index]
    setPlayRate(res)
  }

  const chooseMode = () => {
    let content
    if (playMode === 1) {
      content = '&#xe625;'
    } else if (playMode === 2) {
      content = '&#xe61b;'
    } else {
      content = '&#xe653;'
    }
    return content
  }

  const solveTime = time => {
    let min = parseInt(time / 60),
      sec = Math.floor(time % (min * 60))
    let solve_time = time >= 60 ? `${min}:${add0(sec)}` : `0:${add0(time)}`
    return solve_time
  }

  const add0 = num => {
    return num >= 10 ? num : `0${num}`
  }
  
  const barRef = useRef()
  const barWrapperRef = useRef()
  const circleRef = useRef()
  const getPosition = (width) => {
    barRef.current.style.width = width * percent + 'px'
    circleRef.current.style.left = width * percent + 'px'
  }
  useEffect(() => {
    if (!barRef.current || !barWrapperRef.current) return
    let width = barWrapperRef.current.clientWidth
    getPosition(width)
    return () => {
      // cleanup
    }
  }, [percent])

  const progressClick = e => {
    e.persist()
    let barLeft = barRef.current.getBoundingClientRect()
    let width = e.pageX - barLeft.left
    let wrapperWidth = barWrapperRef.current.clientWidth
    let time = (width * duration) / wrapperWidth
    getPosition(width)
    changePlayTime(time)
  }
  const [barData, setBarData] = useState({})
  const processTouchStart = e => {
    e.persist()
    const touchData = {}
    touchData.isStart = true
    touchData.x = e.touches[0].pageX
    touchData.barWidth = barRef.current.clientWidth
    setBarData(touchData)
  }
  const processTouchMove = e => {
    e.persist()
    if (!barData.isStart) return
    const moveX = Math.max(0, e.touches[0].pageX - barData.x + barData.barWidth)
    const barWidth = barWrapperRef.current.clientWidth
    const offsetDistance = Math.min(moveX, barWidth)
    getPosition(offsetDistance)
    let time = (offsetDistance * duration) / barWidth
    changePlayTime(time)
  }
  const processTouchEnd = e => {
    e.persist()
    const endTouch = JSON.parse(JSON.stringify(barData))
    endTouch.initiated = false
    setBarData(endTouch)
    const barWidth = barWrapperRef.current.clientWidth
    let time = (barRef.current.clientWidth * duration) / barWidth
    changePlayTime(time)
  }
  return (
    <CSSTransition
      in={showNormal}
      timeout={300}
      classNames="mini"
      appear={true}
      unmountOnExit
      // onExited={}
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
    >
      <PlayerWrapper background={currentSong.picUrl} ref={normalPlayerRef}>
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
          <div className="cd-wrapper" ref={cdWrapperRef}>
            <Rotate
              className="song-img"
              src={currentSong.picUrl + '?param=400x400'}
            ></Rotate>
          </div>
          <div className="song-name">
            {currentSong.name} - {getName(currentSong.ar)}
          </div>
          <RateWrapper>
            <div className="__left">速度</div>
            {rateArr.map((item, index) => (
              <div
                key={index}
                className={
                  rateIndex === index ? 'rate-num rate-num_act' : 'rate-num'
                }
                onClick={() => setRate(index)}
              >
                {item}
              </div>
            ))}
          </RateWrapper>
          <ProcressBar>
            <div className="__start">{solveTime(currentTime)}</div>
            <BarWrapper
              ref={barWrapperRef}
              onTouchStart={event => processTouchStart(event)}
              onTouchMove={event => processTouchMove(event)}
              onTouchEnd={event => processTouchEnd(event)}
              onClick={event => progressClick(event)}
            >
              <div className="process-bar" ref={barRef}></div>
              <div className="process-circle" ref={circleRef}>
                <div className="__circle"></div>
              </div>
            </BarWrapper>
            <div className="__duration">{solveTime(duration)}</div>
          </ProcressBar>
          <div className="player-control">
            <div className="icon i-left" onClick={() => choosePlayMode()}>
              <i
                className="iconfont"
                dangerouslySetInnerHTML={{ __html: chooseMode() }}
              ></i>
            </div>
            <div className="icon i-left" onClick={() => audioPrev()}>
              <i className="iconfont">&#xe6e1;</i>
            </div>
            <div className="icon i-center" onClick={() => audioStart()}>
              {isStart ? (
                <i className="iconfont">&#xe723;</i>
              ) : (
                <i className="iconfont">&#xe731;</i>
              )}
            </div>
            <div className="icon i-right" onClick={() => audioNext()}>
              <i className="iconfont">&#xe718;</i>
            </div>
            <div className="icon i-right" onClick={() => openList()}>
              <i className="iconfont">&#xe640;</i>
            </div>
          </div>
        </div>
      </PlayerWrapper>
    </CSSTransition>
  )
}
NormalPlayer.defaultProps = {
  showNormal: false,
  currentSong: {},
  closeNormal: null,
  audioStart: null,
  audioNext: null,
  audioPrev: null,
  getPlayMode: null,
  openList: null,
  setPlayRate: null,
  isStart: true,
  currentTime: 0,
  duration: 0,
  percent: 0,
  changePlayTime: null
}
NormalPlayer.propTypes = {
  showNormal: PropTypes.bool,
  currentSong: PropTypes.object,
  closeNormal: PropTypes.func,
  audioStart: PropTypes.func,
  audioNext: PropTypes.func,
  audioPrev: PropTypes.func,
  getPlayMode: PropTypes.func,
  openList: PropTypes.func,
  setPlayRate: PropTypes.func,
  isStart: PropTypes.bool,
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  percent: PropTypes.number,
  changePlayTime: PropTypes.func
}
export default React.memo(NormalPlayer)
