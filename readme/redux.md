# redux

[store使用源码](../src/view/Recommend/store/index.js 'redux')

在`Recommend文件夹下新建store文件夹`, 在其内新建`actionCreator, actionType, index.js,reducer`文件

`actionType.js`

```js
const  GET_BANNER_LIST = 'getBannerList'
const GET_RECOMMEND_SINGERS = 'getRecommendSingers'
export default {
  GET_BANNER_LIST,
  GET_RECOMMEND_SINGERS
}
```

`actionCreator.js`

```js
import actionType from './actionType'
import Api from '../../../api'
const getBannerList = (data) => ({type: actionType.GET_BANNER_LIST, data})
const getRecommendSingers = (data) => ({type: actionType.GET_RECOMMEND_SINGERS, data})

const requestBanner = () => {
  return async dispatch => {
    let res = await Api.recommendApi.getBannerList()
    dispatch(getBannerList(res.banners))
  }
}
const requestRecommendSingers = () => {
  return async dispatch => {
    let res = await Api.recommendApi.getRecommendSingers()
    dispatch(getRecommendSingers(res.result))
  }
}
export default {
  requestBanner,
  requestRecommendSingers
}
```

`reducer.js`

```js
import ActionTypes from './actionType'
import { fromJS } from 'immutable'

const defaultValue = fromJS({
  bannerList: [],
  recommendSingers: []
})

const recommend = (state = defaultValue, action) => {
  switch (action.type) {
    case ActionTypes.GET_BANNER_LIST:
      return state.set('bannerList',action.data)
    case ActionTypes.GET_RECOMMEND_SINGERS:
      return state.set('recommendSingers',action.data)
    default:
      return state
  }
}
export default recommend
```

`index.js`

```js
import actionCreator from './actionCreator'
import actionType from './actionType'

export default {
  actionCreator,
  actionType
}
```


`Recommend/index.js`

```js
import React, {useEffect} from 'react'
import {connect} from 'react-redux' // 引入connect
import Slider from './components/slider'
import RecommendList from './components/list'
import store from './store'  // 引入store
function Recommend(props) {
  const { recommendSingers, bannerList } = props
  const { requestBanner, requestRecommendSingers} = props
  useEffect(() => {
    // 请求数据
    requestBanner()
    requestRecommendSingers()
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
```