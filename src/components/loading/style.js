import styled from 'styled-components'
export const LoadingWrapper = styled.div`
transition: opacity .3s linear;
width: 100%;
height: 100%;
position: fixed;
display: block;
text-align: center;
top: 0;
background-color: transparent;//背景透明
z-index: 9999;
&:after{
    content: "";
    display: inline-block;
}
.loading-mask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .2);
}
.loading-outter {
  position: relative;
  top: 50%;
  margin-top: 14px;
  display: inline-block;
  vertical-align: middle;
  background-color: #222;
  border-radius: 18px;
}
.loading-wrap {
  width: 48px;
  height: 48px;
  margin: 20px auto 0px;
}
.loading-ring {
  width: 48px;
  height: 48px;
  transform-origin:50% 50%;
  transform: translateZ(0);
  animation: circle 2s  linear infinite;
  border-radius: 50%;
}
@keyframes circle
{
from {transform:rotate(0deg);}
to {transform:rotate(360deg);}
}
.loading-rect {
  height: 6px;
  width: 6px;
  background-color: #FD404A;
  border-radius: 3px;
  -webkit-transform: rotate3D(0, 0, 1, 45deg);
  position: absolute;
  left: 10px;
  top: 10px;
}

.loading-text {
  text-align: left;
  color: #fff;
  font-size: 12px;
  font-family: sans-serif;
  line-height: 28px;
  padding-left: 26px;
  padding-right:26px;
  margin-bottom: 10px
}

.loading-enter,
.loading-leave-active {
  opacity: 0;
}
`