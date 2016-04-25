/* eslint-env node, mocha */
import chai from 'chai';
import sinon from 'sinon';
import * as ajaxSrv from '../../../app/service/AjaxService';
import * as loginService from '../../../app/service/LoginService';

describe('The Login Service should', () => {
  afterEach(() => {
    if (ajaxSrv.signon.restore) ajaxSrv.signon.restore();
  });

  it('sign-out current user when new one is signing in', () => {
    sinon.stub(ajaxSrv, 'signon')
      .returns(Promise.resolve({ token: 'token' }));

    localStorage.setItem(loginService.LOGIN_TOKEN, 'tokenOld');

    return loginService.login('user', 'pwd').then(() => {
      chai.expect(localStorage.getItem(loginService.LOGIN_TOKEN)).to.equal('token');
    });
  });

  it('when signing in save token to local storage', () => {
    sinon.stub(ajaxSrv, 'signon')
      .returns(Promise.resolve({ token: 'token' }));

    return loginService.login('user', 'pwd').then(() => {
      chai.expect(localStorage.getItem(loginService.LOGIN_TOKEN)).to.equal('token');
    });
  });
});
