import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Scroll from '../../../../components/scroll'
import { List, ListItem } from './style'
function SingersList(props) {
  const { singerList, scrollHeight } = props
  const { requestPullUp, requestPullDown } = props

  const enterDetail = detail => {
    props.history.push(`/singers/${detail.id}`)
  }

  return (
    <Scroll
      scrollHeight={scrollHeight}
      data={singerList}
      pullDownRefresh={{ threshold: 70, stop: 60 }}
      pullUpLoad={true}
      requestPullDown={requestPullDown}
      requestPullUp={requestPullUp}
    >
      <List>
        {singerList.map((item, index) => {
          return (
            <ListItem
              key={item.accountId + '' + index}
              onClick={() => enterDetail(item)}
            >
              <div className="img_wrapper">
                <img
                  src={`${item.picUrl}?param=300x300`}
                  width="100%"
                  height="100%"
                  alt="music"
                />
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          )
        })}
      </List>
    </Scroll>
  )
}
SingersList.defaultProps = {
  singerList: [],
  scrollHeight: '',
  requestPullDown: null,
  requestPullUp: null
}
SingersList.propTypes = {
  singerList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  scrollHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  requestPullDown: PropTypes.func,
  requestPullUp: PropTypes.func
}
export default React.memo(withRouter(SingersList))
