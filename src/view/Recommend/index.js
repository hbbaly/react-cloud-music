import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import Slider from './components/slider'
import RecommendList from './components/list'
import store from './store'
import Loading from '../../components/loading'
function Recommend(props) {
  const { recommendSingers, bannerList } = props
  const { requestBanner, requestRecommendSingers} = props
  useEffect(() => {
    Loading.open()
    const requestData = async () => {
      if (!bannerList.size) await requestBanner()
      if (!recommendSingers.size) await requestRecommendSingers()
      Loading.close()
    }
    requestData()
    return () => {
    };
  }, [])
  return (
    <div>
      <Slider bannerList={bannerList} />
      <RecommendList recommendList={recommendSingers} />
    </div>
  )
}
const mapStateToProps = (state) => {
  return ({
    bannerList: state.get('recommend').get('bannerList'),
    recommendSingers: state.get('recommend').get('recommendSingers')
  })
}
const mapDispatchToProps = (dispatch) => ({
  requestBanner(){
    dispatch(store.actionCreator.requestBanner())
  },
  requestRecommendSingers(){
    dispatch(store.actionCreator.requestRecommendSingers())
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))