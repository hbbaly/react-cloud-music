import styled from 'styled-components'
import style from '../../../../assets/global'

export const CircleWrapper = styled.div`
  position: relative;
  circle {
    stroke-width: 8px;
    transform-origin: center;
    &.progress-background {
      transform: scale(0.9);
      stroke: rgba(212, 68, 57, 0.5);
    }
    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: rgb(212, 68, 57);
    }
  }
`
