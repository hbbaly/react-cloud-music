import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { List, ListItem, SongList } from '../../style'
function OfficalList(props) {
  const { list, global } = props
  // 这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
  const renderSongList = list => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          )
        })}
      </SongList>
    ) : null
  }
  const enterDetail = detail => {
    props.history.push(`/rank/${detail.id}`)
  }
  return (
    <List globalRank={global}>
      {list.map(item => {
        return (
          <ListItem
            key={item.id}
            tracks={item.tracks}
            onClick={() => enterDetail(item)}
          >
            <div className="img_wrapper">
              <img src={item.coverImgUrl} alt="" />
              <div className="decorate"></div>
              <span className="update_frequecy">{item.updateFrequency}</span>
            </div>
            {renderSongList(item.tracks)}
          </ListItem>
        )
      })}
    </List>
  )
}

OfficalList.defaultProps = {
  list: [],
  global: false
}
OfficalList.propTypes = {
  list: PropTypes.array,
  global: PropTypes.bool
}
export default React.memo(withRouter(OfficalList))
