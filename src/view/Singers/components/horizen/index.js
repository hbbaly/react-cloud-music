import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Scroll from '../../../../components/scroll'
import { ScrollWrapper, ScrollTitle, ScrollContent } from './style'

function HorizontalScroll(props) {
  const { title, list, handleClick, chooseKey } = props
  const scrollTitle = useRef()
  const scrollCon = useRef()

  const [scrollWidth, setScrollWidth] = useState(0)
  const [width, setWidth] = useState(6000)
  
  useEffect(() => {
    let windowWidth =
      document.body.clientWidth || document.documentElement.clientWidth

    let titleWidth =
      (scrollTitle.current && scrollTitle.current.clientWidth) || 0

    setScrollWidth(windowWidth - titleWidth)

    let widthAll = 0
    scrollCon.current.querySelectorAll('.scroll-item').forEach(item => {
      let itemWidth = item.clientWidth
      widthAll += itemWidth
    })
    setWidth(widthAll + 15)

    return () => {
      setWidth(0)
    }
  }, [list])
  let titleCom = title && <ScrollTitle ref={scrollTitle}>{title}</ScrollTitle>
  return (
    <ScrollWrapper>
      {titleCom}
      <ScrollContent ref={scrollCon}>
        <Scroll
          scrollWidth={`${scrollWidth}px`}
          scrollContent={`${width}px`}
          direction={'horizontal'}
          data={list}
        >
          {list.map((item, index) => (
            <div key={index} className={chooseKey === item.key ? 'scroll-item selected': 'scroll-item'} onClick={() => handleClick(item.key)}>
              {item.name}
            </div>
          ))}
        </Scroll>
      </ScrollContent>
    </ScrollWrapper>
  )
}
HorizontalScroll.defaultProps = {
  title: '',
  list: [],
  handleClick: null,
  chooseKey: ''
}
HorizontalScroll.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array,
  handleClick:PropTypes.func,
  chooseKey: PropTypes.string
}
export default HorizontalScroll
