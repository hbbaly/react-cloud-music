import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import Slider from './components/slider'
import RecommendList from './components/list'
import store from './store'
import Loading from '../../components/loading'
function Recommend(props) {
  const { route } = props

  const { recommendSingers, bannerList } = props
  const { requestBanner, requestRecommendSingers } = props
  
  useEffect(() => {
    Loading.open()
    const requestData = async () => {
      if (!bannerList.size) await requestBanner()
      if (!recommendSingers.size) await requestRecommendSingers()
      // Loading.close()
    }
    requestData()
    return () => {}
  }, [])

  return (
    <div>
      <Slider bannerList={bannerList} />
      <RecommendList recommendList={recommendSingers} />
      {renderRoutes(route.routes)}
    </div>
  )
}
const mapStateToProps = state => {
  return {
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendSingers: state.getIn(['recommend', 'recommendSingers'])
  }
}
const mapDispatchToProps = dispatch => ({
  requestBanner() {
    dispatch(store.actionCreator.requestBanner())
  },
  requestRecommendSingers() {
    dispatch(store.actionCreator.requestRecommendSingers())
  }
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend))
