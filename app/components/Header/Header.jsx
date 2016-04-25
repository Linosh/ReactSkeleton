import React from 'react';

import './Header.scss';

export default class Header extends React.Component {
  static propTypes() {
    return {
      optionName: React.PropTypes.String, operationName: React.PropTypes.String,
    };
  }

  render() {
    return (
      <div className="app-logo-container">
        <div className="col-xs-3 col-xs-offset-1" >
          <h1>{this.props.optionName}</h1>
          <h4>{this.props.operationName}</h4>
        </div>
        <div className="col-xs-1 col-xs-offset-5" >
          <div className="app-logo-img" ></div>
        </div>
      </div>
    );
  }
}

