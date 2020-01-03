import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import store from './store'
import { filterIndex } from '../../utils/base'
import { Container } from './style'
import Scroll from '../../components/scroll'
import OfficalList from './components/officeList'
function Rank(props) {
  const { topListDetail } = props
  const { requestTopList } = props
  const { route } = props
  let globalStartIndex = filterIndex(topListDetail)
  let officialList = topListDetail.slice(0, globalStartIndex)
  let globalList = topListDetail.slice(globalStartIndex)

  useEffect(() => {
    requestTopList()
    return () => {}
  }, [])
  return (
    <Container>
      <Scroll data={topListDetail}>
        <div>
          <h1 className="offical"> 官方榜 </h1>
          <OfficalList list={officialList} />
          <h1 className="global"> 全球榜 </h1>
          <OfficalList list={globalList} global={true} />
        </div>
      </Scroll>
      {renderRoutes(route.routes)}
    </Container>
  )
}
const mapStateToProps = state => {
  return {
    topListDetail: state.getIn(['rank', 'topListDetail'])
  }
}
const mapDispatchToProps = dispatch => ({
  requestTopList() {
    dispatch(store.actionCreator.requestTopListDetail())
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank))
