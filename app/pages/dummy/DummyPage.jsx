import React from 'react';
import Header from '../../components/Header/Header';
import * as i18n from '../../assets/i18n/I18N';

export default class DummyPage extends React.Component {

  render() {
    return (
      <div className="container">
         <div className="row margin-bottom-lg">
            <Header optionName={i18n.DummyPage} />
        </div>
          <div className="col-xs-3">
              <h1>hahaha</h1>
          </div>
      </div>
    );
  }
}
