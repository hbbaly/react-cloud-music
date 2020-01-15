import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle
} from 'react'
import PropTypes from 'prop-types'
import { PickerWrapper, PickerPanelWrapper, PickerContentWrapper, WheelWrapper } from './style'
import BScroll from '@better-scroll/core'
import WheelScroll from '@better-scroll/wheel'

BScroll.use(WheelScroll)

const Wheel = (props) => {
  const { data, index: selectedIndex } = props
  const wheelRef = useRef()
  const pickerRef = useRef()
  const createWheel = useCallback(() => {
    if (!wheelRef.current) return
    if (pickerRef.current) {
      pickerRef.current.refresh()
      return false
    }
    pickerRef.current = new BScroll(wheelRef.current, {
      wheel: {
        selectedIndex: selectedIndex,
        rotate: 5,
        wheelWrapperClass: 'wheel-scroll',
        wheelItemClass: 'wheel-item',
        wheelDisabledItemClass: 'wheel-disabled-item'
      },
      probeType: 3
    })
    pickerRef.current.on('scrollEnd', () => {
      console.log('滚动结束');
    })
  }, [data.length])
  const show = useCallback(() => {
    if (!pickerRef.current) {
      // waiting for DOM rendered
      createWheel()
    } else {
      pickerRef.current.enable()
      pickerRef.current.wheelTo(selectedIndex)
    }
  },[data.length])
  useEffect(() => {
    show()
    return () => {
      // cleanup
    };
  }, [data.length, wheelRef.current])
  useEffect(() => {
    if (!pickerRef.current) return 
    pickerRef.current.wheelTo(selectedIndex, 200)
    return () => {
      // cleanup
    };
  }, [selectedIndex])
  const isMoving = () => {
    return pickerRef.current.pending
  }
  const hide = () => {
    // this.state = STATE_HIDE
    // if wheel is in animation, clear timer in it
    pickerRef.current.disable()
  }
  const refresh = () => {
    setTimeout(() => {
      pickerRef.current.refresh()
    }, 0);
  }
  const wheelTo = () => {
    pickerRef.current.wheelTo(selectedIndex, 200)
  }
  return (
    <PickerWrapper onClick="_cancel">
      <PickerPanelWrapper>
        {/* <div className="picker-choose border-bottom-1px">
          <span className="cancel" onClick="_cancel">
            Cancel
          </span>
          <span className="confirm" onClick="_confirm">
            Confirm
          </span>
          <h1 className="picker-title">Title</h1>
        </div> */}
        <PickerContentWrapper>
          <div className="mask-top border-bottom-1px"></div>
          <div className="mask-bottom border-top-1px"></div>
          <WheelWrapper>
            <div className="wheel" ref={wheelRef}>
              <ul className="wheel-scroll">
                {data.map((item, index) => (
                  <li
                    key={index}
                    className={
                      item.disabled
                        ? 'wheel-item wheel-disabled-item'
                        : 'wheel-item'
                    }
                  >
                    {item.txt}
                  </li>
                ))}
              </ul>
            </div>
          </WheelWrapper>
        </PickerContentWrapper>
        <div className="picker-footer"></div>
      </PickerPanelWrapper>
    </PickerWrapper>
  )
}
Wheel.defaultProps = {
  data: [],
  index: 0,
  changeLyricLine: null
}
Wheel.propTypes = {
  data: PropTypes.oneOfType(['array', 'object']),
  index: PropTypes.number,
  changeLyricLine: PropTypes.func
}
export default React.memo(Wheel)
