import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { PullUpContainer } from "./style";
const PullUpCom = forwardRef((props, ref) => {
  const { isPullUpLoad } = props;
  const isPullUpLoadDom = !isPullUpLoad ? (
    <div className="before-trigger">
      <span className="pullup-txt">Pull up and load more</span>
    </div>
  ) : (
    <div className="after-trigger">
      <span className="pullup-txt">Loading...</span>
    </div>
  );
  return <PullUpContainer>{isPullUpLoadDom}</PullUpContainer>;
});
PullUpCom.defaultProps = {
  isPullUpLoad: false
};
PullUpCom.PropTypes = {
  isPullUpLoad: PropTypes.bool
};
export default React.memo(PullUpCom);
