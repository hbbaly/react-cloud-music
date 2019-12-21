## React Hooks 

hooks出现很久了，之前只是看过文档，没有进行实战，刚好在掘金看到了[react-cloud-music](https://github.com/sanyuan0704/react-cloud-music)的项目, 觉得还不错，就买了下来，学习一下, 加入了自己的理解和书写习惯，巩固和深入学习Hooks s。

## react相关练习项目
[React+React-Router+redux+styled-components简单仿简书](https://github.com/hbbaly/react-practice/tree/master/demo/jianshu)

[React入门](https://github.com/hbbaly/react-practice)

[React-Router入门](https://github.com/hbbaly/react-practice/tree/master/router)

[redux简单入门](https://github.com/hbbaly/react-redux)

[styled-components入门](https://github.com/hbbaly/styled-components-learn)

## 安装脚手架

```bash
npx create-react-app cloud-music
```

### 添加styled-components

```bash
npm i -S styled-components
```
#### 引入reset.css

`src`目录创建一个`reset.js`

```js
import { createGlobalStyle} from 'styled-components'
export const GlobalStyle = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
`
```

定义一个全局`reset`样式, 在`app.js`中引用

```js
...
import { GlobalStyle } from './reset'

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      ......
    </div>
  );
}
export default App;

```

### 引用iconfont字体图标

到[iconfont](https://www.iconfont.cn/home/index?spm=a313x.7781069.1998910419.2)下载自己所需的字体图标库到本地

在`src`目录下新建`assets`文件夹，在其内新建`iconfont`文件夹，

把后缀为`.ttf,.woff,.svg,.css, .eot`文件放入`iconfont`,把`.css`文件改为`.js`，内容变成

```js
import {createGlobalStyle} from 'styled-components'
export const IconStyle = createGlobalStyle`
@font-face {font-family: "iconfont";
  src: url('./iconfont.eot?t=1544620732610'); /* IE9*/
  src: url('./iconfont.eot?t=1544620732610#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,...... // 内容省略
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`

```

在app.js中引入字体图标库

```js
......
import { IconStyle } from './assets/iconfont/iconfont'
function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <IconStyle />
      ......
    </div>
  );
}

export default App;
```

到这里字体图标库及`styled-components`都已成功引用


## 配置路由

### 安装依赖

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

### 定义全局样式变量

`assets/global.js`

```js
// 扩大可点击区域
const extendClick = () => {
  return `
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: -10px; bottom: -10px; left: -10px; right: -10px;
    };
  `
}
// 一行文字溢出部分用... 代替
const noWrap = () => {
  return `
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `
}
// 文字大小处理
const FontSize = {
  font_largest: '22px',
  font_larger: '20px',
  font_large: '18px',
  font_base: '16px',
  font_small: '14px',
  font_smaller: '12px',
  font_smallest: '10px'

}
// 间距大小
const Space = {
  space_largest: '34px',
  space_larger: '30px',
  space_large: '25px',
  space_base: '20px',
  space_small: '15px',
  space_smaller: '10px',
  space_smallest: '5px'
}
//颜色处理
const Color = {
  'theme-color': '#d44439',
  'theme-color-shadow': 'rgba (212, 68, 57, .5)',
  'font-color-light': '#f1f1f1',
  'font-color-desc': '#2E3030',
  'font-color-desc-v2': '#bba8a8',// 略淡
  "border-color": '#e4e4e4',
  'background-color': '#f2f3f4',
  'background-color-shadow': 'rgba (0, 0, 0, 0.3)',
  'highlight-background-color': '#fff',
}
export default {
  extendClick,
  noWrap,
  ...FontSize,
  ...Space,
  ...Color
}
```

### 编写通用头部样式

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

![](./readme/1.png)

## redux迁入

```bash
npm i redux redux-thunk redux-immutable react-redux immutable -S
```

这里如果不熟悉redux可以查看[react-redux](https://github.com/hbbaly/react-redux)

##  推荐页面编写

### 轮播图的编写

```bash
npm i -S swiper
```

`view/Recommend/slider/index.js`

```js
import React, {useState, useEffect} from "react";
import "swiper/css/swiper.css";
import Swiper from "swiper";
import { SliderContainer } from './style'

function Slider(props) {
  const { bannerList } = props;

  const [slider, setSlider] = useState(null)
  useEffect(() => {
    if (bannerList.length && !slider) {
      let slider = new Swiper (".slider-container", {
        loop: true,
        autoplay: true,
        autoplayDisableOnInteraction: false,
        pagination: {el:'.swiper-pagination'}
      })
      setSlider(slider);
    }
  }, [bannerList, slider]) // 监控只要bannerList，slider中有变化， 就会重新执行

  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {bannerList.map(item => (
            <div className="swiper-slide" key={item.id}>
              <div className="slider-nav">
                <img
                  src={item.imageUrl}
                  width="100%"
                  height="100%"
                  alt="推荐"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  );
}
export default React.memo(Slider);
```


`view/Recommend/slider/style.js`

```js
import styled from 'styled-components'
import GlobalStyle from '../../../../assets/global'
export const SliderContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: auto;
  background: white;
  .before {
    position: absolute;
    top: 0;
    height: 60%;
    width: 100%;
    background: ${GlobalStyle["theme-color"]};
  }
  .slider-container {
    position: relative;
    width: 98%;
    height: 160px;
    overflow: hidden;
    margin: auto;
    border-radius: 6px;
    .slider-nav {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
    }
    .swiper-pagination-bullet-active {
      background: ${GlobalStyle["theme-color"]};
    }
  }
`
```
在`view/Recommend/index.js`中使用组件

```js
import React from 'react'
import Slider from './components/slider'
function Recommend(params) {
  //mock 数据
  const bannerList = [1,2,3,4].map (item => {
    return { imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg" }
  })
  return (
    <div>
      <Slider bannerList={bannerList} />
    </div>
  )
}
export default React.memo(Recommend)
```

### 推荐列表编写

`view/Recommend/list/index.js`

```js
import React from "react";
import { ListWrapper, ListItem, List } from "./style";
import { getCount } from "../../../../utils/base";
function RecommendList(props) {
  return (
    <ListWrapper>
      <h1 className="title"> 推荐歌单 </h1>
      <List>
        {props.recommendList.map((item, index) => (
          <ListItem key={item.id + index}>
            <div className="img_wrapper">
              <div className="decorate"></div>
              {/* 加此参数可以减小请求的图片资源大小 */}
              <img
                src={item.picUrl + "?param=300x300"}
                width="100%"
                height="100%"
                alt="music"
              />
              <div className="play_count">
                <i className="iconfont play">&#xe885;</i>
                <span className="count">{getCount(item.playCount)}</span>
              </div>
            </div>
            <div className="desc">{item.name}</div>
          </ListItem>
        ))}
      </List>
    </ListWrapper>
  );
}
export default React.memo(RecommendList);
```

样式`view/Recommend/list/style.js`

```js
import styled from "styled-components";
import style from "../../../../assets/global";

export const ListWrapper = styled.div`
  max-width: 100%;
  .title {
    font-weight: 700;
    padding-left: 6px;
    font-size: 14px;
    line-height: 60px;
    color: ${style["font-color"]};
  }
`;
export const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const ListItem = styled.div`
  position: relative;
  width: 32%;
  .img_wrapper {
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient (hsla(0, 0%, 43%, 0.4), hsla(0, 0%, 100%, 0));
    }
    position: relative;
    height: 0;
    padding-bottom: 100%;
    .play_count {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${style["font-size-s"]};
      line-height: 15px;
      color: ${style["font-color-light"]};
      .play {
        vertical-align: top;
      }
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
  }
  .desc {
    overflow: hidden;
    margin-top: 2px;
    padding: 0 2px;
    height: 50px;
    text-align: left;
    font-size: ${style["font-size-s"]};
    line-height: 1.4;
    color: ${style["font-color-desc"]};
  }
`;
```


## 使用better-scroll优化列表体验

```bash
npm i @better-scroll/core@next @better-scroll/pull-down@next @better-scroll/pull-up@next -S
```

`components/scroll/index.js`

```js
import BetterScroll from "better-scroll";
import PullDown from "@better-scroll/pull-down";
import Pullup from "@better-scroll/pull-up";
import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle } from "react";
import { ScrollWrapper } from "./style";
import PropTypes from "prop-types";
import PullDownCom from './pullDown'
import PullUpDom from './pullUp'
BetterScroll.use(PullDown);
BetterScroll.use(Pullup);

const Scroll = forwardRef((props, ref) => {
  const DIRECTION_H = "horizontal";
  const DIRECTION_V = "vertical";
  const ScrollContainer = useRef();
  const { click, probeType, startX, freeScroll, startY, direction } = props;
  const [bScroll, setBScroll] = useState();
  useEffect(() => {
    if (!ScrollContainer) {
      return;
    }
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
    };
    let scroll = new BetterScroll(ScrollContainer.current, options);
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    };
  }, []);
  const {
    listenScroll,
    listenScrollEnd,
    listenBeforeScroll,
    pullDownRefresh,
    pullUpLoad
  } = props;
  const [BeforePullDown, setBeforePullDown] = useState(true);
  const [IsPullingDown, setIsPullingDown] = useState(false);
  const [IsPullUpLoad, setIsPullUpLoad] = useState(false);
  useEffect(() => {
    if (!bScroll) return;
    if (bScroll) {
      bScroll.refresh();
    }
    if (listenScroll) {
      // probeType为0无效
      bScroll.on("scroll", pos => {
        // 监听滚动
      });
    }
    if (listenScrollEnd) {
      bScroll.on("scrollEnd", pos => {});
    }
    if (listenBeforeScroll) {
      bScroll.on("beforeScrollStart", () => {});
      bScroll.on("scrollStart", () => {});
    }
    if (pullDownRefresh) {
      bScroll.on("pullingDown", async () => {
        // 必须要写，不然不能出发下一次
        setBeforePullDown(false);
        setIsPullingDown(true);

        await new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, 500);
        });

        setIsPullingDown(false);

        await new Promise(resolve => {
          setTimeout(() => {
            bScroll.finishPullDown();
            resolve();
          }, 600);
        });
        setTimeout(() => {
          setBeforePullDown(true);
          bScroll.refresh();
        }, 800);
      });
    }
    if (pullUpLoad) {
      bScroll.on("pullingUp", async () => {
        console.log("上啦");
        setIsPullUpLoad(true);

        await new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, 500);
        });
        bScroll.finishPullUp();
        bScroll.refresh();
        setIsPullUpLoad(false);
      });
    }
    return () => {
      bScroll.off("scroll");
    };
  }, [bScroll]);
  // 判断bScroll是否存在，存在刷新
  // 下啦判断
  // 向父组件暴漏方法
  useImperativeHandle(ref, () => ({
        refresh () {
          if (bScroll) {
            bScroll.refresh ();
            bScroll.scrollTo (0, 0);
          }
        },
        // 给外界暴露 getBScroll 方法，提供 bs 实例
        getBScroll () {
          console.log('hbbb', bScroll)
          if (bScroll) {
            return bScroll;
          }
        }
  }))
  return (
      <div>
        <PullDownCom beforePullDown = {BeforePullDown} isPullingDown={IsPullingDown}/>
        <ScrollWrapper ref={ScrollContainer}>
          <div>
            {props.children}
            <PullUpDom isPullUpLoad = {IsPullUpLoad}/>
          </div>
        </ScrollWrapper>
      </div>
  );
});
Scroll.defaultProps = {
  click: false,
  probeType: 2,
  startX: 0,
  startY: 0,
  listenScroll: false,
  listenBeforeScroll: false,
  listenScrollEnd: false,
  enabled: false,
  direction: "vertical", // 'horizontal'
  pullDownRefresh: false,
  pullUpLoad: false,
  refreshDelay: 200,
  refresh: null,
  destroy: null,
  freeScroll: false
};
Scroll.PropTypes = {
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
  pullDownRefresh: PropTypes.bool | PropTypes.object,
  pullUpLoad: PropTypes.object | PropTypes.bool,
  refreshDelay: PropTypes.number,
  refresh: PropTypes.func,
  destroy: PropTypes.func
};
export default Scroll;
```

### forwardRef 使用

`React.forwardRef` 会创建一个React组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中。

### useImperativeHandle

```js
useImperativeHandle(ref, createHandle, [deps])
```
`useImperativeHandle` 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。`useImperativeHandle` 应当与 `forwardRef` 一起使用

```js
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

在本例中，渲染 `<FancyInput ref={inputRef} />` 的父组件可以调用 `inputRef.current.focus()`。



`pullDown.js`

```js
import React, { forwardRef } from 'react';
import PropTypes from "prop-types";
import { PulldownScroller } from "./style";
const PullDownCom = forwardRef((props) => {
  const {beforePullDown, isPullingDown} = props
  const refreshCom = beforePullDown ? <span>Pull Down and refresh</span> : "";
  const loadingCom =
    !beforePullDown && isPullingDown ? <span>Loading...</span> : "";
  const successCom =
    !beforePullDown && !isPullingDown ? <span>Refresh success</span> : "";
  return (
    <PulldownScroller>
      <div className="pulldown-wrapper">
        {refreshCom}
        <div>
          {loadingCom}
          {successCom}
        </div>
      </div>
    </PulldownScroller>
  );
})
PullDownCom.defaultProps = {
  beforePullDown: true,
  isPullingDown: false
}
PullDownCom.PropTypes = {
  beforePullDown: PropTypes.bool,
  isPullingDown: PropTypes.bool
}
export default React.memo(PullDownCom)
```

`pullUp.js`

```js
import React, { forwardRef } from 'react';
import PropTypes from "prop-types";
import { PullUpContainer } from "./style";
const PullUpCom = forwardRef((props) => {
  const { isPullUpLoad } = props
  const isPullUpLoadDom = !isPullUpLoad ? (
    <div className="before-trigger">
      <span className="pullup-txt">Pull up and load more</span>
    </div>
  ) : (
    <div className="after-trigger">
      <span className="pullup-txt">Loading...</span>
    </div>
  )
  return(
    <PullUpContainer>
      {isPullUpLoadDom}
    </PullUpContainer>
  );
})
PullUpCom.defaultProps = {
  isPullUpLoad: false
}
PullUpCom.PropTypes = {
  isPullUpLoad: PropTypes.bool,
}
export default React.memo(PullUpCom)
```

这样Scroll组件就已经完成， 主要还是要熟悉[better-scroll](https://github.com/ustbhuangyi/better-scroll)才能对其进行各种各样的自定义样式。