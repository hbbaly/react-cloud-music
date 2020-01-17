import React, { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Container, SearchBoxWrapper } from './style'
import store from './store'
import { connect } from 'react-redux'
import HotList from './components/list'
function Search(props) {
  // 控制动画
  const { requestSearchHot } = props
  const { hotSearch } = props

  const [show, setShow] = useState(false)
  const queryRef = useRef()
  const [showFalse, setShowFalse] = useState(false)
  const [query, setQuery] = useState('')
  const displayStyle = query ? {display: 'block'}: {display: 'none'};

  
  useEffect(() => {
    setShow(true)
    requestSearchHot()
  }, [])
  useEffect(() => {
    if (queryRef.current) queryRef.current.focus()
    return () => {
      // cleanup
    };
  }, [])
  const handleChange = (e) => {
    setQuery(e.target.value)
  }
  const clearQuery = () => {
    setQuery('')
  }
  let contentCom = query ? '' : <HotList list={hotSearch.toJS()} />
  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container>
        {/* <div onClick={() => setShowFalse}> 返回 </div> */}
        <SearchBoxWrapper>
          <i className="iconfont icon-back" onClick={() => props.history.goBack()}>&#xe655;</i>
          <input ref={queryRef} className="box" placeholder="搜索歌曲、歌手、专辑" value={query} onChange={(e) => handleChange(e)}/>
          <i className="iconfont icon-delete" onClick={() => clearQuery()} style={displayStyle}>&#xe600;</i>
        </SearchBoxWrapper>
        {contentCom}
      </Container>
    </CSSTransition>
  )
}
const mapStateToProps = state => {
  return {
    hotSearch: state.getIn(['search', 'hotSearch'])
  }
}
const mapDispatchToProps = dispatch => ({
  requestSearchHot() {
    dispatch(store.actionCreator.requestSearchHot())
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Search)
