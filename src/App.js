import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config';//renderRoutes 读取路由配置转化为 Route 标签
import { Provider } from 'react-redux'
import { GlobalStyle } from './reset'
import { IconStyle } from './assets/iconfont/iconfont'
import routes from './routes/index.js'
import store from './store'
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <GlobalStyle />
          <IconStyle />
          {renderRoutes(routes)}
        </div>
      </Router>
    </Provider>
  );
}

export default App;
