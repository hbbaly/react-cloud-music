import BetterScroll from '@better-scroll/core'
import PullDownPlugin from '@better-scroll/pull-down'
import PullUpPlugin from '@better-scroll/pull-up'
import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle
} from 'react'
import PropTypes from 'prop-types'

import { ScrollWrapper } from './style'
import PullDownCom from './pullDown'
import PullUpDom from './pullUp'

BetterScroll.use(PullDownPlugin)
BetterScroll.use(PullUpPlugin)


const Scroll = forwardRef((props, ref) => {
  const DIRECTION_H = 'horizontal'
  const DIRECTION_V = 'vertical'

  const { click, probeType, startX, freeScroll, startY, direction, scrollWidth, scrollContent, scrollHeight } = props

  const ScrollContainer = useRef()
  const [bScroll, setBScroll] = useState()

  useEffect(() => {
    if (!ScrollContainer) {
      return false
    }
    if (bScroll) {
      bScroll.refresh()
    } else {
    let options = {
      probeType,
      click,
      scrollY: freeScroll || direction === DIRECTION_V,
      scrollX: freeScroll || direction === DIRECTION_H,
      pullDownRefresh,
      pullUpLoad,
      startY,
      startX,
      freeScroll
    }
    let scroll = new BetterScroll(ScrollContainer.current, options)
    setBScroll(scroll)
  }
    return () => {
      setBScroll(null)
    }
  }, [ScrollContainer])

  const {
    listenScroll,
    listenScrollEnd,
    listenBeforeScroll,
    pullDownRefresh,
    pullUpLoad,
    data,
    onScroll
  } = props
  const {requestPullDown, requestPullUp } = props
  const [BeforePullDown, setBeforePullDown] = useState(true)
  const [IsPullingDown, setIsPullingDown] = useState(false)
  const [IsPullUpLoad, setIsPullUpLoad] = useState(false)

  //监听滚动事项
  useEffect(() => {
    if (!bScroll) return
    bScroll.refresh()
    if (listenScroll) {
      // probeType为0无效
      bScroll.on('scroll', pos => {
        // 监听滚动, 这个是图片懒加载的操作
        onScroll(pos)
      })
    }
    if (listenScrollEnd) {
      bScroll.on('scrollEnd', pos => {})
    }
    if (listenBeforeScroll) {
      bScroll.on('beforeScrollStart', () => {})
      bScroll.on('scrollStart', () => {})
    }

    return () => {
      bScroll.off('scroll')
    }
  }, [bScroll, onScroll])

  //下啦刷新
  useEffect(() => {
    if (!bScroll) return
    bScroll.refresh()

    if (pullDownRefresh) {
      bScroll.on('pullingDown', async () => {
        console.log('下啦刷新')

        // 必须要写，不然不能出发下一次
        setBeforePullDown(false)
        setIsPullingDown(true)

        await requestPullDown()

        setIsPullingDown(false)

        await new Promise(resolve => {
          setTimeout(() => {
            bScroll.finishPullDown()
            resolve()
          }, 600)
        })
        setTimeout(() => {
          setBeforePullDown(true)
          bScroll.refresh()
        }, 800)
      })
    }
    return () => {
      bScroll.off('pullingDown')
    }
  }, [bScroll, data.length])


  // 上啦加载
  useEffect(() => {
    
    if (!bScroll) return
    bScroll.refresh()
    bScroll.scrollTo(0,0)  // 这个必须有，否则切换tag不会触发上啦
    if (pullUpLoad) {
      bScroll.on('pullingUp', async () => {
        console.log('上啦')
        setIsPullUpLoad(true)
        
        await requestPullUp()

        setTimeout(() => {
          bScroll.finishPullUp()
          bScroll.refresh()
          setIsPullUpLoad(false)
        }, 300);
      })
    }
    return () => {
      bScroll.off('pullingUp')
    }
  }, [bScroll, data.length])

  // 向父组件暴漏方法
  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
    },
    // 给外界暴露 getBScroll 方法，提供 bs 实例
    getBScroll() {
      console.log('hbbb', bScroll)
      if (bScroll) {
        return bScroll
      }
    }
  }))
  if (direction === DIRECTION_V) {
    return (
        <ScrollWrapper ref={ScrollContainer} style={{height:scrollHeight}}>
          <div>
          <PullDownCom
            beforePullDown={BeforePullDown}
            isPullingDown={IsPullingDown}
          />
            {props.children}
              <PullUpDom isPullUpLoad={IsPullUpLoad} />
            </div>
          
        </ScrollWrapper>
    )
  } else {
    return(
        <ScrollWrapper style={{width:scrollWidth}} ref={ScrollContainer} >
          <div style={{display: 'flex',width: scrollContent}} >
            {props.children}
          </div>
        </ScrollWrapper>
    )
  }
})

Scroll.defaultProps = {
  click: true,
  probeType: 3,
  startX: 0,
  startY: 0,
  listenScroll: false,
  listenBeforeScroll: false,
  listenScrollEnd: false,
  enabled: false,
  direction: 'vertical', // 'horizontal'
  pullDownRefresh: null,
  pullUpLoad: false,
  refreshDelay: 200,
  refresh: null,
  destroy: null,
  freeScroll: false,
  onScroll: null,
  data: [],
  scrollContent: '100%',
  scrollWidth: '100%',
  scrollHeight: '100%'
}
Scroll.propTypes = {
  click: PropTypes.bool,
  probeType: PropTypes.number,
  listenScroll: PropTypes.bool,
  freeScroll: PropTypes.bool,
  startX: PropTypes.number,
  startY: PropTypes.number,
  listenBeforeScroll: PropTypes.bool,
  listenScrollEnd: PropTypes.bool,
  enabled: PropTypes.bool,
  direction: PropTypes.string,
  pullDownRefresh: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  pullUpLoad: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  refreshDelay: PropTypes.number,
  refresh: PropTypes.func,
  destroy: PropTypes.func,
  onScroll: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  wrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  scrollWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  scrollContent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  scrollHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  requestPullDown: PropTypes.func,
  requestPullUp: PropTypes.func
}
export default Scroll
