# 配置路由

## 安装依赖

```bash
npm i react-router react-router-dom react-router-config -S
```

在src目录下新建routes文件夹专门处理路由问题

新建index.js

```js
import React from 'react'
import { Redirect } from 'react-router-dom'
import Home from '../view/Home'
import Recommend from '../view/Recommend';
import Singers from '../view/Singers';
import Rank from '../view/Rank';

export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => (
          <Redirect to={"/recommend"}/>
        )
      },
      {
        path: "/recommend",
        component: Recommend
      },
      {
        path: "/singers",
        component: Singers
      },
      {
        path: "/rank",
        component: Rank
      }
    ]
  }
]
```

在view文件夹下面依次建立相应的文件夹及文件

在app.js中引入

```js
import React from 'react';
//
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config';//renderRoutes 读取路由配置转化为 Route 标签
import routes from './routes/index.js'
//
import { GlobalStyle } from './reset'
import { IconStyle } from './assets/iconfont/iconfont'
function App() {
  return (
    <Router>
      <div className="App">
        <GlobalStyle />
        <IconStyle />
        {renderRoutes(routes)}
      </div>
    </Router>
  );
}

export default App;
```

这里只能显示home，在地址后面加上 /recommend，却并没有显示 Recommend 组件相应的内容，因为 renderRoutes 这个方法只渲染一层路由，之前 Home 处于数组第一层，后面的功能组件在第二层，当然不能正常渲染啦。其实要解决这个问题也非常简单，只需在 `Home` 中再次调用 `renderRoutes` 即可。

`Home/index.js`

```js
import React from 'react'
import { renderRoutes } from 'react-router-config'
function Home(props) {
  const { route } = props
  return (
    <div>
      <div>Home</div>
      {renderRoutes(route.routes)}
    </div>
  )
}
export default React.memo(Home)
```
