import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import HorizontalScroll from './components/horizen'
import { categoryTypes, alphaTypes } from './singersData'
import store from './store'
import SingersList from './components/singerList'
function Singers(props) {
  const { requestSingerList } = props
  const { singerList } = props
  const [chooseKey, setChooseKey] = useState('')
  const [chooseLetterKey, setChooseLetterKey] = useState('')

  useEffect(() => {
    requestSingerList()
    return () => {
      // cleanup
    }
  }, [])

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
          handleClick={key => setChooseKey(key)}
          chooseKey={chooseKey}
        />
      </div>
      <div className="first-letter" ref={letterContainer}>
        <HorizontalScroll
          list={alphaTypes}
          title="首字母"
          handleClick={key => setChooseLetterKey(key)}
          chooseKey={chooseLetterKey}
        />
      </div>
      <div className="singer-wrapper">
        <SingersList scrollHeight={singerHeight} singerList={singerList} />
      </div>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    singerList: state.get('singer').get('singerList')
  }
}
const mapDispatchToProps = dispatch => ({
  requestSingerList(data) {
    dispatch(store.actionCreator.requestSingerList(data))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))
