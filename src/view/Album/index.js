import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, TopDesc, Menu, SongList, SongItem } from './style'
import { CSSTransition } from 'react-transition-group'
import Header from '../../components/albumHeader'
import Scroll from '../../components/scroll'
import { getName, getCount, isEmptyObject } from '../../utils/base'
import style from '../../assets/global'
import store from './store'

const HEADER_HEIGHT = 45
function Top(props) {
  const { albumDetail } = props

  return (
    <div>
      <TopDesc background={albumDetail.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={albumDetail.coverImgUrl} alt="" />
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">
              {Math.floor(albumDetail.subscribedCount / 1000) / 10} 万{' '}
            </span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{albumDetail.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={albumDetail.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{albumDetail.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
      <Menu>
        <div>
          <i className="iconfont">&#xe6ad;</i>
          评论
        </div>
        <div>
          <i className="iconfont">&#xe86f;</i>
          点赞
        </div>
        <div>
          <i className="iconfont">&#xe62d;</i>
          收藏
        </div>
        <div>
          <i className="iconfont">&#xe606;</i>
          更多
        </div>
      </Menu>
    </div>
  )
}
function List(props) {
  const { albumDetail } = props
  return (
    <SongList showBackground={true}>
      <div className="first_line">
        <div className="play_all">
          <i className="iconfont">&#xe6e3;</i>
          <span>
            {' '}
            播放全部{' '}
            <span className="sum">(共 {albumDetail.tracks.length} 首)</span>
          </span>
        </div>
        <div className="add_list">
          <i className="iconfont">&#xe62d;</i>
          <span> 收藏 ({getCount(albumDetail.subscribedCount)})</span>
        </div>
      </div>
      <SongItem>
        {albumDetail.tracks.map((item, index) => {
          return (
            <li key={index}>
              <span className="index">{index + 1}</span>
              <div className="info">
                <span>{item.name}</span>
                <span>
                  {getName(item.ar)} - {item.al.name}
                </span>
              </div>
            </li>
          )
        })}
      </SongItem>
    </SongList>
  )
}
function SingerTop(props) {
  const { detail } = props
  return (
    <div>
      <TopDesc background={detail.picUrl} issinger = {true}>
        <div className="singer-background">
          {/* <div className="filter"></div> */}
        </div>
        <div className="add_list">
          <i className="iconfont">&#xe62d;</i>
          <span> 收藏 </span>
        </div>
      </TopDesc>
    </div>
  )
}
function SingerList(props) {
  const { albumDetail } = props
  return (
    <SongList showBackground={true}>
      <div className="first_line">
        <div className="play_all">
          <i className="iconfont">&#xe6e3;</i>
          <span>
            {' '}
            播放全部 <span className="sum">(共 {albumDetail.length} 首)</span>
          </span>
        </div>
      </div>
      <SongItem>
        {albumDetail.map((item, index) => {
          return (
            <li key={index}>
              <span className="index">{index + 1}</span>
              <div className="info">
                <span>{item.name}</span>
                <span>
                  {item.ar[0].name} - {item.al.name}
                </span>
              </div>
            </li>
          )
        })}
      </SongItem>
    </SongList>
  )
}
function Album(props) {
  console.log(props, '----------')

  const [showStatus, setShowStatus] = useState(true)
  const [title, setTitle] = useState('歌单')
  const [isMarquee, setIsMarquee] = useState(false) // 是否跑马灯

  const headerEl = useRef()

  const { albumDetail:albumDetails, singerSong:singerSongs, singerDetail: singerDetails } = props
  const { requestAlbumDetail, requestSingerSong } = props

  const id = props.match.params.id || 0
  let isSinger = props.match.path.indexOf('singers') >= 0

  let albumDetail = albumDetails.toJS()
  let singerSong = singerSongs.toJS()
  let singerDetail = singerDetails.toJS()
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
  }, [requestAlbumDetail, requestAlbumDetail, id])

  const handleBack = () => {
    setShowStatus(false)
  }
  const headerScroll = pos => {
    let minScrollY = -HEADER_HEIGHT
    let percent = Math.abs(pos.y / minScrollY)
    let headerDom = headerEl.current
    // 滑过顶部的高度开始变化
    if (pos.y < minScrollY) {
      headerDom.style.backgroundColor = style['theme-color']
      headerDom.style.opacity = Math.min(1, (percent - 1) / 2)
      isSinger? setTitle(singerDetail.name) : setTitle(albumDetail.name)
      setIsMarquee(true)
    } else {
      headerDom.style.backgroundColor = ''
      headerDom.style.opacity = 1
      isSinger? setTitle('歌手') : setTitle('歌单')
      setIsMarquee(false)
    }
  }
  let contentCom = ''
  if (isSinger) {
    contentCom = !isEmptyObject(singerDetail) && !isEmptyObject(singerSong) ? ( <div>
      <SingerTop detail={singerDetail} />
      <SingerList albumDetail={singerSong} />
    </div>) : null
  } else {
    contentCom = !isEmptyObject(albumDetail) ?  (<div>
      <Top albumDetail={albumDetail} />
      <List albumDetail={albumDetail} />
    </div>) : null
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
    singerDetail: state.getIn(['album', 'singerDetail'])
  }
}
const mapDispatchToProps = dispatch => ({
  requestAlbumDetail(id) {
    dispatch(store.actionCreator.requestAlbumDetail(id))
  },
  requestSingerSong(id) {
    dispatch(store.actionCreator.requestSingerSong(id))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album))
