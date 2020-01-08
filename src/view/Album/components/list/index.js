import React from 'react'
import PropTypes from 'prop-types'
import { SongList, SongItem } from '../../style'
import { getName, getCount } from '../../../../utils/base'
function List(props) {
  const { albumDetail } = props
  const { songPlay } = props
  return (
    <SongList showBackground={true}>
      <div className="first_line">
        <div className="play_all" onClick={() => songPlay(0, 'all')}>
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
            <li key={index}  onClick={() => songPlay(index)}>
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
function SingerList(props) {
  const { albumDetail  } = props
  const { songPlay } = props
  return (
    <SongList showBackground={true}>
      <div className="first_line">
        <div className="play_all" onClick={() => songPlay(0, 'all')}>
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
            <li key={index} onClick={() => songPlay(index)}>
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
function ListCom(props) {
  const { isSinger } = props
  let com = ''
  if (isSinger) {
    com = SingerList(props)
  } else {
    com = List(props)
  }
  return com
}
ListCom.defaultProps = {
  albumDetail: {},
  isSinger: false,
  songPlay: null
}
ListCom.propTypes = {
  albumDetail: PropTypes.object,
  isSinger: PropTypes.bool,
  songPlay: PropTypes.func
}
export default React.memo(ListCom)
