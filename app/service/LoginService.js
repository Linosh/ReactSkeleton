import * as ajaxSrv from './AjaxService';

// this exports need only for testing
export const LOGIN_TOKEN = 'loginTokenKey';

/**
 * Check if user is logged in then allow to go to URL, if not - return to root page
 * @param nextState requesting page url
 * @param replace function to replace new url by predefined one
 */
export function requireAuth(nextState, replace) {
  if (!localStorage.getItem(LOGIN_TOKEN)) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

/**
 * Logout current user by removing token from local storage
 */
export function logout() {
  localStorage.removeItem(LOGIN_TOKEN);
}

/**
 * When login is successful then save auth token into local storage
 *
 * @param user
 * @param pwd
 * @returns Promise with result of login request
 */
export function login(user, pwd) {
  logout();
  return ajaxSrv
    .signon(user, pwd)
    .then(data => {
      localStorage.setItem(LOGIN_TOKEN, data.token);
    });
}
