# 定义全局样式变量

[变量源码](../src/assets/global.js 'variables')

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