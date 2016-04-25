/* eslint-env node, mocha */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import $ from 'jquery';
import chai from 'chai';
import sinon from 'sinon';

import * as ajaxSrv from '../../../../app/service/AjaxService';
import LoginPage from '../../../../app/pages/login/LoginPage';

const assert = chai.assert;


describe('When User opens main Page', () => {
  before(() => {
    ReactDOM.render(<LoginPage />, document.getElementById('app'));
  });

  afterEach(() => {
    if (ajaxSrv.signon.restore) ajaxSrv.signon.restore();
  });

  it('He should see login form', () => {
    assert.isDefined($('#loginForm')[0]);
    assert.isDefined($('#nameInputId')[0]);
    assert.isDefined($('#inputPassword')[0]);
  });

  it('and SignIn button should be disabled', () => {
    assert.isTrue($('#signIn').is(':disabled'));
  });

  it('even when he inputs either login or password SignIn button still should be disabled', () => {
    $('#nameInputId').val('user');

    ReactTestUtils.Simulate.change($('#nameInputId')[0]);

    assert.isTrue($('#signIn').is(':disabled'));

    $('#nameInputId').val('');
    $('#inputPassword').val('pwd');

    ReactTestUtils.Simulate.change($('#nameInputId')[0]);
    ReactTestUtils.Simulate.change($('#inputPassword')[0]);

    assert.isTrue($('#signIn').is(':disabled'));
  });

  describe('When he input login and password', () => {
    it('SignIn button should be enabled', () => {
      $('#nameInputId').val('usr');
      $('#inputPassword').val('pwd');

      ReactTestUtils.Simulate.change($('#nameInputId')[0]);
      ReactTestUtils.Simulate.change($('#inputPassword')[0]);

      assert.isTrue($('#signIn').is(':enabled'));
    });

    describe('When user press SignIn', () => {
      it('on success login he should switch on Dummy Page page', () => {
        sinon.stub(ajaxSrv, 'signon')
          .returns(Promise.resolve('UPOIUPOIU_RWEREW_REWRWE'));

        return new LoginPage().onLogin('', '')
          .then(() => window.location.pathname)
          .should.eventually.equal('/dummyPage');
      });

      it('in case wrong credential he should see error message', () => {
        sinon.stub(ajaxSrv, 'signon')
          .returns(Promise.reject('User Not Found'));

        return new LoginPage().onLogin('', '')
          .then(() => $("div#errorsPanel:contains('User Not Found')").length)
          .should.eventually.equal(1);
      });
    });
  });
});
