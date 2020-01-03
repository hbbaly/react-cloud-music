import React from 'react'
import PropTypes from 'prop-types'
import { TopDesc, Menu } from '../../style'
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
function SingerTop(props) {
  const { detail } = props
  return (
    <div>
      <TopDesc background={detail.picUrl} issinger={true}>
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
function TopCom(props) {
  const { isSinger } = props
  let com = ''
  if (isSinger) {
    com = SingerTop(props)
  } else {
    com = Top(props)
  }
  return com
}
TopCom.defaultProps = {
  albumDetail: {},
  detail: {},
  isSinger: false
}
TopCom.propTypes = {
  albumDetail: PropTypes.object,
  detail: PropTypes.object,
  isSinger: PropTypes.bool
}
export default React.memo(TopCom)
