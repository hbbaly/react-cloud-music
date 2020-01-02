# 编写通用头部样式

`view/Home/style.js`

```js
import styled from 'styled-components'
import GlobalStyle from '../../assets/global'
export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${GlobalStyle.space_smallest} ${GlobalStyle.space_smaller};
  background: ${GlobalStyle["theme-color"]};
  &>span {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
    &.iconfont {
      font-size: 25px;
    }
  }
`
const TabOrigin = styled.div`
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
export const Tab = styled(TabOrigin)`
  background: ${GlobalStyle["theme-color"]};
  a {
    flex: 1;
    padding: 2px 0;
    font-size: 14px;
    color: #e4e4e4;
    &.selected {
      span {
        padding: 3px 0;
        font-weight: 700;
        color: #f1f1f1;
        border-bottom: 2px solid #f1f1f1;
      }
    }
  }
`
export const TabItem = styled(TabOrigin)`
  justify-content: center;
  align-items: center;
`
```

`view/Home/index.js`

```js
import React from 'react'
import { renderRoutes } from 'react-router-config'
import { NavLink } from 'react-router-dom'
import { Top, Tab, TabItem } from './style'
function Home(props) {
  const { route } = props
  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">cloud-music</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeClassName="selected"><TabItem><span > 推荐 </span></TabItem></NavLink>
        <NavLink to="/singers" activeClassName="selected"><TabItem><span > 歌手 </span></TabItem></NavLink>
        <NavLink to="/rank" activeClassName="selected"><TabItem><span > 排行榜 </span></TabItem></NavLink>
      </Tab>
      {renderRoutes(route.routes)}
    </div>
  )
}
export default React.memo(Home)
```

通用的头部就编写完成了