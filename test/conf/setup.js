/* eslint func-names: 0*/

const jsdom = require('jsdom');
const mockCssModules = require('mock-css-modules');
const chai = require('chai');
const dash = require('lodash');
const chaiAsPromised = require('chai-as-promised');

function MockStorage() {
  const storage = this;
  const data = {};

  this.key = function (key) {
    return data[key];
  };

  this.setItem = function (key, value) {
    data[key] = value;
    storage.length = dash.size(data);
  };

  this.getItem = function (key) {
    return data[key];
  };

  this.removeItem = function (key) {
    const value = data[key];
    delete data[key];
    return value;
  };

  this.clear = function () {
    const keys = dash.keys(data);
    keys.forEach(key => {
      delete data[key];
    });
    storage.length = 0;
  };

  this.length = dash.size(data);

  this.__protected = function () {
    return { data };
  };
}

// setup jsdom as fake DOM model for tests
global.document = jsdom.jsdom('<!doctype html><html><body><div id="app"></div></body></html>',
  { url: 'http://localhost:8080/' });
global.window = document.defaultView;
global.navigator = { userAgent: 'node.js' };

global.window.localStorage = new MockStorage();
global.window.sessionStorage = new MockStorage();

// take all properties of the window object and also attach it to the
// mocha global object
// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
for (const key in global.window) {
  if (!global.window.hasOwnProperty(key)) continue;
  if (key in global) continue;

  global[key] = global.window[key];
}

// mock all imports for styles
mockCssModules.register(['.sass', '.scss', 'css']);

// setup chai asserts
chai.should();
chai.use(chaiAsPromised);
