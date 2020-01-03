import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import HorizontalScroll from './components/horizen'
import { categoryTypes, alphaTypes } from './singersData'
import store from './store'
import SingersList from './components/singerList'

function Singers(props) {
  const { route } = props
  const {
    requestSingerList,
    setCategory,
    setLetter,
    pullDownRefresh,
    pullUpRequest
  } = props
  const { singerList, offset, category, letter } = props

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
        <SingersList
          scrollHeight={singerHeight}
          singerList={singerList}
          requestPullDown={async () => await pullDownRefresh()}
          requestPullUp={async () => await pullUpRequest(offset + 1)}
        />
      </div>
      {renderRoutes(route.routes)}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    singerList: state.getIn(['singer', 'singerList']),
    offset: state.getIn(['singer', 'offset']),
    category: state.getIn(['singer', 'category']),
    letter: state.getIn(['singer', 'letter'])
  }
}
const mapDispatchToProps = dispatch => ({
  requestSingerList(data) {
    dispatch(store.actionCreator.requestSingerList(data))
  },
  async pullDownRefresh() {
    dispatch(store.actionCreator.setOffset(0))
    dispatch(store.actionCreator.requestSingerList())
  },
  async pullUpRequest(data) {
    dispatch(store.actionCreator.setOffset(data))
    await dispatch(store.actionCreator.requestSingerList())
  },
  setCategory(data) {
    dispatch(store.actionCreator.setCategory(data))
  },
  setLetter(data) {
    dispatch(store.actionCreator.setLetter(data))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))
