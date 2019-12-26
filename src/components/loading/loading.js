import React from 'react';
import { LoadingWrapper } from './style'
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
function Loading(props) {
  const { tip } = props
  return (
    <LoadingWrapper>
      <div className="loading-mask">
          <div className="loading-outter">
              <div className="loading-wrap">
                <img src={require('../../assets/images/loading.png')} className="loading-ring" />
              </div>
              {/* <div className="loading-rect" /> */}
              <div className="loading-text">{ tip }</div>
          </div>
      </div>
    </LoadingWrapper>
  )
}
Loading.propTypes = {
  tip: PropTypes.string,
};
Loading.newInstance = function newNotificationInstance(properties) {
  let props = properties || {};
  let div = document.createElement('div');
  document.body.appendChild(div);
  let notification = ReactDOM.render(React.createElement(Loading, props), div);
  return {
      destroy() {
          ReactDOM.unmountComponentAtNode(div);
          document.body.removeChild(div);
      },
  };
};
export default Loading