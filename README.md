## React Hooks

hooks 出现很久了，之前只是看过文档，没有进行实战，刚好在掘金看到了[react-cloud-music](https://github.com/sanyuan0704/react-cloud-music)的项目, 觉得还不错，就买了下来，学习一下, 加入了自己的理解和书写习惯，巩固和深入学习 Hooks。

## react 相关练习项目

[React+React-Router+redux+styled-components 简单仿简书](https://github.com/hbbaly/react-practice/tree/master/demo/jianshu)

[React 入门](https://github.com/hbbaly/react-practice)

[React-Router 入门](https://github.com/hbbaly/react-practice/tree/master/router)

[redux 简单入门](https://github.com/hbbaly/react-redux)

[styled-components 入门](https://github.com/hbbaly/styled-components-learn)

## 安装脚手架

```bash
npx create-react-app cloud-music
```

```bash
npm i
```

## 目录结构

![目录结构](./readme/2.png)

- api: 放置接口
- assets: 静态资源
- components: 公用组件（一般3及3个公用以上）
- config: 环境配置
- routes: 路由
- store: redux
- utils: 工具函数
- view: 页面
- reset.js: 重制样式
- setupProxy.js: 本地跨域

## 项目预览

![首页](./readme/1.gif)
![播放器](./readme/2.gif)

## Audio相关知识

[Audio参考资料](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio 'audio')
[Audio相关事件](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Media_events 'handle')

## Hooks中获取最值

放弃`class`改用`Hooks`, 你就要忘记`class`编码思想, 在用下去是要掉坑里面的。 

比如求去最新值：

在`class`中不存在这个问题, `hooks`存在,每次获取的都是当前渲染是的值, 不是最新值, 获取最新值使用ref来获取

[这里有一篇非常好的文章](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

### 添加 styled-components

[use styled-components](./readme/styled-components.md 'use styled-components')

### 引用 iconfont 字体图标

[use iconfont](./readme/iconfont.md 'use iconfont')

### 配置路由

[use router-config](./readme/router.md 'use router-config')

### 定义全局样式变量

[global variables](./readme/variables.md 'global variables')

### 添加px2rem支持移动端

[use px2rem](./readme/px2rem.md 'use px2rem')

### 编写通用头部样式

[common header](./readme/header.md 'common header')

## recommend 页面编写

[recommend page](./readme/recommend.md 'recommend page')

## 使用 better-scroll 优化列表体验

[use better-scroll](./readme/bs.md 'use better-scroll')

### forwardRef 使用

`React.forwardRef` 会创建一个 React 组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中。

### useImperativeHandle

```js
useImperativeHandle(ref, createHandle, [deps])
```

`useImperativeHandle` 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。`useImperativeHandle` 应当与 `forwardRef` 一起使用

### 使用 react-lazyload 懒加载图片

[react-lazyload](./readme/lazyload.md 'react-lazyload')

## 配置环境变量

```bash
cnpm i -D cross-env
```

```js
// package.json
"scripts": {
    "start": "cross-env NODE_ENV=development node scripts/start.js",
    "build": "cross-env NODE_ENV=production node scripts/build.js",
    "test": "node scripts/test.js"
  },
```

`config`文件夹内新建`default, index, development, production`文件
配置相应的内容并导出

`index.js`

```js
import developConfig from './development'
import prodConfig from './production'
import defaultConfig from './default'

const configEnv =
  process.env.NODE_ENV === 'development' ? developConfig : prodConfig
const config = Object.assign(defaultConfig, configEnv)
export default config
```

## 请求数据以及使用 redux

### axios 简单封装

[use axios](./readme/axios.md 'use axios')

## 跨域问题解决

[resolve kors](./readme/kors.md 'resolve kors')

这样跨域就完成了， **后台接口使用[网易云 API](https://github.com/Binaryify/NeteaseCloudMusicApi)下载项目本地运行，记得改端口！！！**

## 添加 api

[create api](./readme/api.md 'create api')

## redux

```bash
npm i redux redux-thunk redux-immutable react-redux immutable -S
```

这里如果不熟悉 redux 可以查看[react-redux](https://github.com/hbbaly/react-redux)

[use redux](./readme/redux.md 'use redux')

这样 recommend 页面数据完成， 后面页面就这样使用 redux

## 其他页面

其他页面也没什么问题，通过 recommend 页面我们学会了使用 redux，其他页面可以参照 recommend 页面来

这里最难的应该是播放器, 那个页面了, 划分好组件, 一步步来也是没问题的。

## react-transition-group使用

[参考资料](https://reactcommunity.org/react-transition-group/css-transition)

[GitHub](https://github.com/reactjs/react-transition-group)

这里主要用到的事 `CSSTransition`来做一些过度的效果

## create-keyframe-animation

[GitHub](https://github.com/HenrikJoreteg/create-keyframe-animation)

动画效果, 如全屏播放器的图片入场，退出的效果