import React, { useState, useRef, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { Container } from './style'
import { CSSTransition } from 'react-transition-group'
import Header from '../../components/albumHeader'
import Scroll from '../../components/scroll'
import { isEmptyObject } from '../../utils/base'
import style from '../../assets/global'
import store from './store'
import TopCom from './components/top'
import ListCom from './components/list'
const HEADER_HEIGHT = 45

function Album(props) {
  const {
    albumDetail: albumDetails,
    singerSong: singerSongs,
    singerDetail: singerDetails
  } = props
  const { requestAlbumDetail, requestSingerSong, setChooseIndex } = props

  let albumDetail = albumDetails.toJS()
  let singerSong = singerSongs.toJS()
  let singerDetail = singerDetails.toJS()

  const [showStatus, setShowStatus] = useState(true)
  const [title, setTitle] = useState('歌单')
  const [isMarquee, setIsMarquee] = useState(false) // 是否跑马灯

  const headerEl = useRef()

  const id = props.match.params.id || 0
  let isSinger = props.match.path.indexOf('singers') >= 0

  useEffect(() => {
    if (isSinger) {
      // 歌手歌曲
      setTitle('歌手')
      requestSingerSong(id)
    } else {
      // 歌单
      requestAlbumDetail(id)
    }
    return () => {
      // cleanup
    }
  }, [id])

  const handleBack = useCallback(() => {
    setShowStatus(false)
  }, [])
  const headerScroll = useCallback(
    pos => {
      let minScrollY = -HEADER_HEIGHT
      let percent = Math.abs(pos.y / minScrollY)
      let headerDom = headerEl.current
      // 滑过顶部的高度开始变化
      if (pos.y < minScrollY) {
        headerDom.style.backgroundColor = style['theme-color']
        headerDom.style.opacity = Math.min(1, (percent - 1) / 2)
        isSinger ? setTitle(singerDetail.name) : setTitle(albumDetail.name)
        setIsMarquee(true)
      } else {
        headerDom.style.backgroundColor = ''
        headerDom.style.opacity = 1
        isSinger ? setTitle('歌手') : setTitle('歌单')
        setIsMarquee(false)
      }
    },
    [singerDetail, singerSong, albumDetail]
  )
  const { setShowMiniStatus, setPlayerList } = props
  const { isShowMini } = props
  const songPlay = useCallback((index = 0, type='list') => {
    if (!isShowMini) {
      setShowMiniStatus(true)
    }
    let data = isSinger ? singerSong : albumDetail.tracks
    setPlayerList(data)

    if ( type === 'list') {
      setChooseIndex(index)
    }
  },[index, type])
  let contentCom = ''
  if (isSinger) {
    contentCom =
      !isEmptyObject(singerDetail) && !isEmptyObject(singerSong) ? (
        <div>
          <TopCom detail={singerDetail} isSinger={true} />
          <ListCom isShowMini={isShowMini} albumDetail={singerSong} isSinger={true} songPlay={songPlay}/>
        </div>
      ) : null
  } else {
    contentCom = !isEmptyObject(albumDetail) ? (
      <div>
        <TopCom albumDetail={albumDetail} />
        <ListCom isShowMini={isShowMini} albumDetail={albumDetail} songPlay={songPlay} />
      </div>
    ) : null
  }
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container>
        <Header
          ref={headerEl}
          title={title}
          handleClick={handleBack}
          isMarquee={isMarquee}
        />

        <Scroll listenScroll={true} onScroll={headerScroll}>
          {contentCom}
        </Scroll>
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = state => {
  return {
    albumDetail: state.getIn(['album', 'albumDetail']),
    singerSong: state.getIn(['album', 'singerSong']),
    singerDetail: state.getIn(['album', 'singerDetail']),
    isShowMini: state.getIn(['album', 'isShowMini'])
  }
}
const mapDispatchToProps = dispatch => ({
  requestAlbumDetail(id) {
    dispatch(store.actionCreator.requestAlbumDetail(id))
  },
  requestSingerSong(id) {
    dispatch(store.actionCreator.requestSingerSong(id))
  },
  setShowMiniStatus (data) {
    dispatch(store.actionCreator.setIsShowMini(data))
  },
  setPlayerList (data) {
    dispatch(store.actionCreator.setPlayerList(data))
  },
  setChooseIndex (index) {
    dispatch(store.actionCreator.setChooseIndex(index))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album))
