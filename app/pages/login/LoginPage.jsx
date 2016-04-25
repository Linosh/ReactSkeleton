import React from 'react';
import { browserHistory } from 'react-router';
import $ from 'jquery';

// Components
import Header from '../../components/Header/Header';
import LoginForm from './LoginForm';
import * as personService from '../../service/LoginService';

// i18n
import * as i18n from '../../assets/i18n/I18N';

export default class LoginPage extends React.Component {

  onLogin(username, pwd) {
    return personService.login(username, pwd).then(
      () => browserHistory.push('/dummyPage'),
      errorMsg => $('#errorsPanel').text(errorMsg));
  }

  render() {
    return (
      <div className="container" >
        <div className="row margin-bottom-lg" >
          <Header optionName={i18n.Header} operationName={i18n.AppLogIn} />
        </div>
        <div className="row" >
          <div className="col-xs-4" >
            <LoginForm onLogin={this.onLogin} />
          </div>
          <div className="col-xs-3">
            <div id="errorsPanel" className="text-danger bg-warning" >
            </div>
          </div>
        </div>
      </div>
    );
  }
}

