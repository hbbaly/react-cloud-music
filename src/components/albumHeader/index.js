import React from 'react';
import PropTypes from "prop-types";
import { HeaderContainer } from './style'
// 处理函数组件拿不到 ref 的问题，所以用 forwardRef
const Header = React.forwardRef ((props, ref) => {
  const { handleClick, title, isMarquee} = props;
  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back"  onClick={handleClick}>&#xe655;</i>
      {
        isMarquee ? <marquee><h1>{title}</h1></marquee>:
        <h1>{title}</h1>
      }
    </HeaderContainer>
  )
})

Header.defaultProps = {
  handleClick: () => {},
  title: "标题",
  isMarquee: false
};

Header.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  isMarquee: PropTypes.bool
};

export default React.memo (Header);