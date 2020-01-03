# 添加px2rem支持移动端

```bash
npm i px2rem lib-flexible -S
```

在[src/index.js](../src/index.js 'index')
引用

```js
import "lib-flexible"
```

在[config/webpack.config.js](../config/webpack.config.js 'config')添加

```js
plugins: () => [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
      // Adds PostCSS Normalize as the reset css with default options,
      // so that it honors browserslist config in package.json
      // which in turn let's users customize the target behavior as per their needs.
      //这里添加
    require('postcss-px2rem')(
      {
        'remUnit': 75,
        'baseDpr': 2
      }
    ),
    postcssNormalize(),
  ]
```

因为使用的是styled-components css in js这种模式, 所以在[](../src/utils/base.js)中添加

```js
export const getName = list => {
  let str = "";
  list.map ((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

export const getFontSize = () => {
  let fs = document.getElementsByTagName('html')[0].style.cssText.split(':')[1].split('px')[0]
  fs = fs.replace(/^\s+|\s+$/g, '')
  return fs
}
```

在[style.js](../src/view/Home/style.js, 'example')中引入

```js
import styled from 'styled-components'
import GlobalStyle from '../../assets/global'

import { translatePxToRem } from '../../utils/base'
export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${GlobalStyle.space_smallest} ${GlobalStyle.space_smaller};
  background: ${GlobalStyle["theme-color"]};
  &>span {
    line-height: ${translatePxToRem(80)};
    color: #f1f1f1;
    font-size: ${translatePxToRem(40)};
    &.iconfont {
      font-size: ${translatePxToRem(50)};
    }
  }
`
```
这样就查看样式就可以得到rem