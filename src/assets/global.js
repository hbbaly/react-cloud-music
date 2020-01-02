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
  font_largest: '44px',
  font_larger: '40px',
  font_large: '36px',
  font_base: '32px',
  font_small: '28px',
  font_smaller: '24px',
  font_smallest: '20px'

}
// 间距大小
const Space = {
  space_largest: '68px',
  space_larger: '60px',
  space_large: '50px',
  space_base: '40px',
  space_small: '30px',
  space_smaller: '20px',
  space_smallest: '10px'
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