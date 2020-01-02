import React, { useRef, useState, useEffect } from 'react'
import LazyLoad, { forceCheck } from 'react-lazyload'
import { withRouter } from 'react-router-dom'
import { ListWrapper, ListItem, List } from './style'
import { getCount } from '../../../../utils/base'
import Scroll from '../../../../components/scroll'
function RecommendList(props) {
  const listScroll = useRef()
  const { recommendList } = props
  
  const goDetail = (id) => {
    props.history.push (`/recommend/${id}`)
  }

  return (
        
    <ListWrapper >
      <h1 className="title"> 推荐歌单 </h1>
      <Scroll
        scrollHeight='400px'
        ref={listScroll}
        data={recommendList}
        listenScroll={true}
        onScroll={forceCheck}
      >
        <List>
          {recommendList.map((item, index) => (
            <ListItem key={item.id} onClick={() => goDetail(item.id)}>
              <div className="img_wrapper">
                <div className="decorate"></div>
                {/* 加此参数可以减小请求的图片资源大小 */}
                <LazyLoad
                  placeholder={
                    <img
                      width="120"
                      height="120"
                      src={require('../../../../assets/images/music.png')}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={item.picUrl + '?param=300x300'}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          ))}
        </List>
      </Scroll>
    </ListWrapper>
  )
}
export default React.memo(withRouter(RecommendList))
