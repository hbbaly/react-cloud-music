# 推荐页面编写

[页面源码](../src/view/Recommend/index.js 'recommend')

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


