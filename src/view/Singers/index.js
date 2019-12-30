import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import HorizontalScroll from './components/horizen'
import { categoryTypes, alphaTypes } from './singersData'
import store from './store'
import SingersList from './components/singerList'
function Singers(props) {
 

  const { requestSingerList, setCategory, setLetter, pullDownRefresh} = props
  const { singerList, offset, category, letter, limit } = props

  
  useEffect(() => {
    requestSingerList()
    return () => {
      // cleanup
    }
  }, [category, letter])

  const [singerHeight, setSingerHeight] = useState(0)
  const catContainer = useRef()
  const letterContainer = useRef()

  useEffect(() => {
    // effect
    let allHeight =
      window.innerHeight ||
      document.body.clientHeight ||
      document.documentElement.clientHeight
    let catHeight = catContainer.current.clientHeight
    let letterHeight = letterContainer.current.clientHeight
    let headerHeight = document.querySelector('.app-header').clientHeight
    setSingerHeight(allHeight - catHeight - letterHeight - headerHeight)
    return () => {
      // cleanup
    }
  }, [])
  function requestUp() { 
    // setOffset(offset + 1)
   }
  // 拉动垂立
  return (
    <div>
      <div className="hot-category" ref={catContainer}>
        <HorizontalScroll
          list={categoryTypes}
          title="热门维修"
          handleClick={key => setCategory(key)}
          chooseKey={category}
        />
      </div>
      <div className="first-letter" ref={letterContainer}>
        <HorizontalScroll
          list={alphaTypes}
          title="首字母"
          handleClick={key => setLetter(key)}
          chooseKey={letter}
        />
      </div>
      <div className="singer-wrapper">
        <SingersList scrollHeight={singerHeight} singerList={singerList} requestPullDown = {() => pullDownRefresh({limit, cat: `${category}`, initial: `${letter}`, offset: `${offset}`})} requestPullUp = {requestUp} />
      </div>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    singerList: state.getIn(['singer', 'singerList']),
    offset: state.getIn(['singer','offset']),
    category: state.getIn(['singer', 'category']),
    letter: state.getIn(['singer', 'letter'])
  }
}
const mapDispatchToProps = dispatch => ({

  requestSingerList(data) {
    dispatch(store.actionCreator.requestSingerList(data))
  },
  pullDownRefresh (data) {
    // dispatch(store.actionCreator.setOffset(0))
    dispatch(store.actionCreator.requestSingerList(data))
  },
  pullUpRequest (data) {
    // dispatch(store.actionCreator.setOffset(0))
    dispatch(store.actionCreator.requestSingerList(data))
  },
  setCategory (data) {
    dispatch(store.actionCreator.setCategory(data))
  },
  setLetter (data) {
    dispatch(store.actionCreator.setLetter(data))
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))
