import React from 'react'
import { renderRoutes } from 'react-router-config'
import { NavLink } from 'react-router-dom'
import { Top, Tab, TabItem } from './style'
import Player from '../Player'
function Home(props) {
  const { route } = props
  return (
    <div>
      <header className="app-header">
        <Top>
          <span className="iconfont menu">&#xe65c;</span>
          <span className="title">cloud-music</span>
          <span className="iconfont search" onClick={() => props.history.push ('/search')}>&#xe62b;</span>
        </Top>
        <Tab>
          <NavLink to="/recommend" activeClassName="selected"><TabItem><span > 推荐 </span></TabItem></NavLink>
          <NavLink to="/singers" activeClassName="selected"><TabItem><span > 歌手 </span></TabItem></NavLink>
          <NavLink to="/rank" activeClassName="selected"><TabItem><span > 排行榜 </span></TabItem></NavLink>
        </Tab>
      </header>
      <Player />
      {renderRoutes(route.routes)}
    </div>
  )
}
export default React.memo(Home)