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
function Album(props) {
  const [showStatus, setShowStatus] = useState(true)
  const [title, setTitle] = useState('歌单')
  const [isMarquee, setIsMarquee] = useState(false) // 是否跑马灯

  const headerEl = useRef()

  const { albumDetail: albumDetails } = props
  const { requestAlbumDetail } = props
  const id = props.match.params.id || 0
  let albumDetail = albumDetails.toJS ();
  useEffect( () => {
    requestAlbumDetail(id)
    return () => {
      // cleanup
    }
  }, [requestAlbumDetail, id])

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
      setTitle(albumDetail.name)
      setIsMarquee(true)
    } else {
      headerDom.style.backgroundColor = ''
      headerDom.style.opacity = 1
      setTitle('歌单')
      setIsMarquee(false)
    }
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
        {!isEmptyObject(albumDetail) ? (
          <Scroll listenScroll={true} onScroll={headerScroll}>
            <div>
              <Top albumDetail={albumDetail} />
              <List albumDetail={albumDetail} />
            </div>
          </Scroll>
        ) : null}
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = state => {
  return {
    albumDetail: state.getIn(['album', 'albumDetail'])
  }
}
const mapDispatchToProps = dispatch => ({
  requestAlbumDetail(id) {
    dispatch(store.actionCreator.requestAlbumDetail(id))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album))
