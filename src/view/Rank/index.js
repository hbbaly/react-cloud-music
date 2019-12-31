import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import store from './store'
import { filterIndex } from '../../utils/base'
import { Container, List, ListItem, SongList} from './style'
import Scroll from '../../components/scroll'

// 这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
const renderRankList = (list, global) => {

  return (
    <List globalRank={global}>
      {
      list.map ((item) => {
        return (
          <ListItem key={item.coverImgId} tracks={item.tracks}>
            <div className="img_wrapper">
              <img src={item.coverImgUrl} alt=""/>
              <div className="decorate"></div>
              <span className="update_frequecy">{item.updateFrequency}</span>
            </div>
            { renderSongList (item.tracks)  }
          </ListItem>
        )
      })
    } 
    </List>
  )
}
const renderSongList = (list) => {
  return list.length ? (
    <SongList>
      {
        list.map ((item, index) => {
          return <li key={index}>{index+1}. {item.first} - {item.second}</li>
        })
      }
    </SongList>
  ) : null;
}


function Rank(props) {
  const { topListDetail } = props
  const { requestTopList } = props

  let globalStartIndex = filterIndex (topListDetail);
  let officialList = topListDetail.slice (0, globalStartIndex);
  let globalList = topListDetail.slice (globalStartIndex);
  useEffect(() => {
    requestTopList()
    return () => {
      
    };
  }, [])
  return (
    <Container>
      <Scroll
        data={topListDetail}>
        <div>
          <h1 className="offical"> 官方榜 </h1>
            { renderRankList (officialList) }
          <h1 className="global"> 全球榜 </h1>
            { renderRankList (globalList, true) }
        </div>
      </Scroll> 
      {renderRoutes (props.route.routes)}
    </Container>
  )
}
const mapStateToProps = (state) => {
  return ({
    topListDetail: state.getIn(['rank', 'topListDetail'])
  })
}
const mapDispatchToProps = (dispatch) => ({
  requestTopList(){
    dispatch(store.actionCreator.requestTopListDetail())
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank))