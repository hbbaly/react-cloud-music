import styled from "styled-components";

export const ScrollWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`
export const ScrollTitle = styled.div`
  overflow: hidden;
  height: 50px;
  padding: 0 10px;
  line-height: 50px;
  color: #f60;
`
export const ScrollContent = styled.div`
  display: flex;
  overflow: hidden;
  height: 50px;
  line-height: 50px;
  .scroll-item{
    width: auto;
    padding-left: 10px;
  }
  .selected{
    color: #d44439;
  }
`