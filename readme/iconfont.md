# 引用iconfont字体图标

[iconfont使用源码](../src/assets/iconfont/iconfont.js 'iconfont')

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
