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