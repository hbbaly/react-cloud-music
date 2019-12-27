import React from 'react'
import PropTypes from 'prop-types'
import Scroll from '../../../../components/scroll'
import { List, ListItem } from './style'
function SingersList(props) {
  const { singerList, scrollHeight } = props

  return (
    <Scroll
      scrollHeight={scrollHeight}
      data={singerList}
      pullDownRefresh={{ threshold: 70, stop: 60 }}
      pullUpLoad={true}
    >
      <List>
        {singerList.map((item, index) => {
          return (
            <ListItem key={item.accountId + '' + index}>
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
  scrollHeight: ''
}
SingersList.propTypes = {
  singerList: PropTypes.array,
  scrollHeight: PropTypes.string
}
export default React.memo(SingersList)
