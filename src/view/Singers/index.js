import React from 'react'
import HorizontalScroll from './components/horizen'
import { categoryTypes, alphaTypes } from './singersData'

function Singers(props) {
  return (
    <div>
      <div className="hot-category">
        <HorizontalScroll list={categoryTypes} title='热门维修'/>
      </div>
      <div className="first-letter">
        <HorizontalScroll list={alphaTypes} title='首字母'/>
      </div>
    </div>
  )
}
export default React.memo(Singers)