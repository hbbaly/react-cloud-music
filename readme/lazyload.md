# 使用 react-lazyload 懒加载图片

[react-lazyload](https://github.com/twobin/react-lazyload 'lazyload')

[示例](./src/view/Recommend/components/list/index.js)

```jsx
import React, { useRef, useState, useEffect } from 'react'
import LazyLoad, { forceCheck } from 'react-lazyload'
// ......
function RecommendList(props) {
  // ......
  return (
    <ListWrapper >
        // ......
          {recommendList.map((item, index) => (
            <ListItem key={item.id} onClick={() => goDetail(item.id)}>
              <div className="img_wrapper">
                <div className="decorate"></div>
                {/* 加此参数可以减小请求的图片资源大小 */}
                <LazyLoad
                  placeholder={
                    <img
                      width="120"
                      height="120"
                      src={require('../../../../assets/images/music.png')}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={item.picUrl + '?param=300x300'}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
          // ......
      </Scroll>
    </ListWrapper>
  )
}
export default React.memo(withRouter(RecommendList))

```

### 简单用法

```bash
npm install --save react-lazyload
```

```js
import React from 'react'
import ReactDOM from 'react-dom'
import LazyLoad from 'react-lazyload'
import MyComponent from './MyComponent'

const App = () => {
  return (
    <div className="list">
      <LazyLoad height={200}>
        <img src="tiger.jpg" /> /* Lazy loading images is supported out of box,
        no extra config needed, set `height` for better experience */
      </LazyLoad>
      <LazyLoad height={200} once>
        /* Once this component is loaded, LazyLoad will not care about it
        anymore, set this to `true` if you're concerned about improving
        performance */
        <MyComponent />
      </LazyLoad>
      <LazyLoad height={200} offset={100}>
        /* This component will be loaded when it's top edge is 100px from
        viewport. It's useful to make user ignorant about lazy load effect. */
        <MyComponent />
      </LazyLoad>
      <LazyLoad>
        <MyComponent />
      </LazyLoad>
    </div>
  )
}

ReactDOM.render(<App />, document.body)
```

更多的用法请移步：
[react-lazyload](https://github.com/twobin/react-lazyload 'lazyload')
