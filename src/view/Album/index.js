import React, { useState, useRef, useEffect } from 'react'
import { Container, TopDesc, Menu, SongList, SongItem } from './style'
import { CSSTransition } from 'react-transition-group'
import Header from '../../components/albumHeader'
import Scroll from '../../components/scroll'
import { getName, getCount } from '../../utils/base'
import style from '../../assets/global'
const currentAlbum = {
  creator: {
    avatarUrl:
      'http://p1.music.126.net/O9zV6jeawR43pfiK2JaVSw==/109951164232128905.jpg',
    nickname: '浪里推舟'
  },
  coverImgUrl:
    'http://p2.music.126.net/ecpXnH13-0QWpWQmqlR0gw==/109951164354856816.jpg',
  subscribedCount: 2010711,
  name: '听完就睡，耳机是天黑以后柔软的梦境',
  tracks: [
    {
      name: '我真的受伤了',
      ar: [{ name: '张学友' }, { name: '周华健' }],
      al: {
        name: '学友 热'
      }
    },
    {
      name: '我真的受伤了',
      ar: [{ name: '张学友' }, { name: '周华健' }],
      al: {
        name: '学友 热'
      }
    },
    {
      name: '我真的受伤了',
      ar: [{ name: '张学友' }, { name: '周华健' }],
      al: {
        name: '学友 热'
      }
    },
    {
      name: '我真的受伤了',
      ar: [{ name: '张学友' }, { name: '周华健' }],
      al: {
        name: '学友 热'
      }
    },
    {
      name: '我真的受伤了',
      ar: [{ name: '张学友' }, { name: '周华健' }],
      al: {
        name: '学友 热'
      }
    },
    {
      name: '我真的受伤了',
      ar: [{ name: '张学友' }, { name: '周华健' }],
      al: {
        name: '学友 热'
      }
    },
    {
      name: '我真的受伤了',
      ar: [{ name: '张学友' }, { name: '周华健' }],
      al: {
        name: '学友 热'
      }
    },
    {
      name: '我真的受伤了',
      ar: [{ name: '张学友' }, { name: '周华健' }],
      al: {
        name: '学友 热'
      }
    },
    {
      name: '我真的受伤了',
      ar: [{ name: '张学友' }, { name: '周华健' }],
      al: {
        name: '学友 热'
      }
    },
    {
      name: '我真的受伤了',
      ar: [{ name: '张学友' }, { name: '周华健' }],
      al: {
        name: '学友 热'
      }
    },
    {
      name: '我真的受伤了',
      ar: [{ name: '张学友' }, { name: '周华健' }],
      al: {
        name: '学友 热'
      }
    }
  ]
}
const HEADER_HEIGHT = 45;
function Album(props) {

  const [showStatus, setShowStatus] = useState(true)
  const [title, setTitle] = useState ("歌单");
  const [isMarquee, setIsMarquee] = useState (false) // 是否跑马灯

  const albumTop = useRef()
  const headerEl = useRef ();
  const handleBack = () => {
    setShowStatus(false)
  }
  const headerScroll = (pos) => {
    let minScrollY = -HEADER_HEIGHT;
    let percent = Math.abs (pos.y/minScrollY);
    let headerDom = headerEl.current;
    // 滑过顶部的高度开始变化
    if (pos.y < minScrollY) {
      headerDom.style.backgroundColor = style["theme-color"];
      headerDom.style.opacity = Math.min (1, (percent-1)/2);
      setTitle (currentAlbum.name);
      setIsMarquee (true);
    } else {
      headerDom.style.backgroundColor = "";
      headerDom.style.opacity = 1;
      setTitle ("歌单");
      setIsMarquee (false);
    }
  }
  function Top(props) {
    return (
      <div ref={albumTop}>
        <TopDesc background={currentAlbum.coverImgUrl}>
          <div className="background">
            <div className="filter"></div>
          </div>
          <div className="img_wrapper">
            <div className="decorate"></div>
            <img src={currentAlbum.coverImgUrl} alt="" />
            <div className="play_count">
              <i className="iconfont play">&#xe885;</i>
              <span className="count">
                {Math.floor(currentAlbum.subscribedCount / 1000) / 10} 万{' '}
              </span>
            </div>
          </div>
          <div className="desc_wrapper">
            <div className="title">{currentAlbum.name}</div>
            <div className="person">
              <div className="avatar">
                <img src={currentAlbum.creator.avatarUrl} alt="" />
              </div>
              <div className="name">{currentAlbum.creator.nickname}</div>
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
  function List() {
    return (
        <SongList showBackground={true}>
          <div className="first_line">
            <div className="play_all">
              <i className="iconfont">&#xe6e3;</i>
              <span>
                {' '}
                播放全部{' '}
                <span className="sum">(共 {currentAlbum.tracks.length} 首)</span>
              </span>
            </div>
            <div className="add_list">
              <i className="iconfont">&#xe62d;</i>
              <span> 收藏 ({getCount(currentAlbum.subscribedCount)})</span>
            </div>
          </div>
          <SongItem>
            {currentAlbum.tracks.map((item, index) => {
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
        <Header ref={headerEl} title={title} handleClick={handleBack} isMarquee={isMarquee} />
        <Scroll
          listenScroll={true}
          onScroll={headerScroll}
        >
          <div>
            <Top />
            <List />
          </div>
        </Scroll>
      </Container>
    </CSSTransition>
  )
}

export default React.memo(Album)
