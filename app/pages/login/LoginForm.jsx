import React from 'react';
import * as i18n from '../../assets/i18n/I18N';

export default class LoginForm extends React.Component {
  static propTypes() {
    return {
      onLogin: React.PropTypes.func,
    };
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.refs.signInBtn.disabled = true;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onLogin(this.refs.usernameRef.value, this.refs.passwordRef.value);
  }

  handleChange(e) {
    e.preventDefault();
    this.refs.signInBtn.disabled =
      (this.refs.usernameRef.value.trim() === '' ||
      this.refs.passwordRef.value.trim() === '');
  }

  render() {
    return (
      <div>
        <form id="loginForm" className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="nameInputId" className="col-xs-4 control-label"> { i18n.Username } </label>
            <div className="col-xs-6">
              <input ref="usernameRef"
                type="text"
                className="form-control"
                id="nameInputId"
                placeholder={ i18n.Username }
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword" className="col-xs-4 control-label"> { i18n.Password } </label>
            <div className="col-xs-6">
              <input ref="passwordRef"
                type="password"
                className="form-control" id="inputPassword"
                placeholder={ i18n.Password }
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-4 col-sm-6">
              <button
                ref="signInBtn"
                type="submit"
                className="btn btn-primary"
                id="signIn"
              >
                { i18n.SignIn }
              </button>
            </div>
          </div>
        </form>
      </div>);
  }
}
