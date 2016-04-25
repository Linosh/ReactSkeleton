/* eslint no-param-reassign:0 */

export default function setupMocks($, window) {
  const mockjaxFactory = require('jquery-mockjax');
  const mockjax = mockjaxFactory($, window);
  mockjax({
    url: '/signon',
    data: JSON.stringify({
      login: 'goodUser',
      pass: 'goodPwd',
    }),
    status: 200,
    responseText: {
      signonResponse: {
        contextResponse: {
          token: 'e595235a-bfce-4f87-8675-fbbd7209404e',
        },
        resetRequired: 'false',
        expirationTime: '3600',
      },
    },
  });

  // Speed up our tests
  $.mockjaxSettings.responseTime = 0;
  $.mockjaxSettings.contentType = 'application/json';
  $.mockjaxSettings.logging = false;
}

