import React from 'react'
import { CircleWrapper } from './style'
function CircleBar(props) {
  const { radius, percent } = props
  // 整个背景的周长
  const dashArray = Math.PI * 100
  // 没有高亮的部分，剩下高亮的就是进度
  const dashOffset = (1 - percent) * dashArray

  return (
    <CircleWrapper>
      <svg
        width={radius}
        height={radius}
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="progress-background"
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
        />
        <circle
          className="progress-bar"
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
      </svg>
      {props.children}
    </CircleWrapper>
  )
}
export default React.memo(CircleBar)
