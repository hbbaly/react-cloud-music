import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef
} from 'react'
import styled from 'styled-components'
import { prefixStyle, translatePxToRem } from '../../utils/base'
import style from '../../assets/global'

const Container = styled.div`
  .icon_wrapper {
    position: fixed;
    z-index: 1000;
    margin-top: -${translatePxToRem(20)};
    margin-left: -${translatePxToRem(20)};
    color: ${style['theme-color']};
    font-size: ${translatePxToRem(68)};
    display: none;
    transition: transform 1s cubic-bezier(0.62, -0.1, 0.86, 0.57);
    transform: translate3d(0, 0, 0);
    .iconfont{
      font-size: ${translatePxToRem(48)};
    }
    > div {
      transition: transform 1s;
    }
  }
`

const MusicNote = forwardRef((props, ref) => {
  const iconsRef = useRef()
  // 容器中有 3 个音符，也就是同时只能有 3 个音符下落
  const ICON_NUMBER = 3

  const transform = prefixStyle('transform')

  // 原生 DOM 操作，返回一个 DOM 节点对象
  const createNode = txt => {
    const template = `<div class='icon_wrapper'>${txt}</div>`
    let tempNode = document.createElement('div')
    tempNode.innerHTML = template
    return tempNode.firstChild
  }

  useEffect(() => {
    for (let i = 0; i < ICON_NUMBER; i++) {
      let node = createNode(`<div class="iconfont">&#xe642;</div>`)
      iconsRef.current.appendChild(node)
    }
    // 类数组转换成数组，当然也可以用 [...xxx] 解构语法或者 Array.from ()
    let domArray = [...iconsRef.current.children]
    domArray.forEach(item => {
      item.running = false
      item.addEventListener(
        'transitionend',
        function() {
          this.style['display'] = 'none'
          this.style[transform] = `translate3d(0, 0, 0)`
          this.running = false

          let icon = this.querySelector('div')
          icon.style[transform] = `translate3d(0, 0, 0)`
        },
        false
      )
    })
  }, [])
  const startAnimation = ({ x, y }) => {
    for (let i = 0; i < ICON_NUMBER; i++) {
      let domArray = [...iconsRef.current.children]
      let item = domArray[i]
      // 选择一个空闲的元素来开始动画
      if (item.running === false) {
        item.style.left = x + 'px'
        item.style.top = y + 'px'
        item.style.display = 'inline-block'

        setTimeout(() => {
          item.running = true
          item.style[transform] = `translate3d(0, 750px, 0)`
          let icon = item.querySelector('div')
          icon.style[transform] = `translate3d(-40px, 0, 0)`
        }, 20)
        break
      }
    }
  }
  // 外界调用的 ref 方法
  useImperativeHandle(ref, () => ({
    startAnimation
  }))
  return <Container ref={iconsRef}></Container>
})

export default React.memo(MusicNote)
