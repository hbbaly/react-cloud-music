import React from 'react'
import { ListWrapper, ListContent } from './style'
import PropTypes from 'prop-types'
function HotList(props) {
  const { list } = props
  return (
    <ListWrapper>
      <div className="list-title">热门搜索</div>
      <ListContent>
        {list.map((item, index) => (
          <div key={index} className="list-item">
            {item.first}
          </div>
        ))}
      </ListContent>
    </ListWrapper>
  )
}
HotList.defaultProps = {
  list: []
}
HotList.propTypes = {
  list: PropTypes.array
}
export default React.memo(HotList)
