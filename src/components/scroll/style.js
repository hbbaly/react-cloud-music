import styled from 'styled-components'

export const ScrollWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
`
export const PulldownScroller = styled.div`
position: absolute
width: 100%
padding: 20px
box-sizing: border-box
transform: translateY(-100%) translateZ(0)
text-align: center
color: #999
z-index: -1
& span{
  display: inline-block;
  width: 100%;
  text-align: center
}
`
export const PullUpContainer = styled.div`
padding: 20px
text-align: center
color: #999
  span {
    display: block;
    width: 100%;
    text-align: center
  }
`