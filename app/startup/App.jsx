// Framework dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';


// App dependencies
import LoginPage from '../pages/login/LoginPage';
import DummyPage from '../pages/dummy/DummyPage';
import { requireAuth } from '../service/LoginService';

export default class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory} >
        <Route path="/" component={LoginPage} />
        <Route path="/dummyPage" component={DummyPage} onEnter={requireAuth} />
      </Router>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

