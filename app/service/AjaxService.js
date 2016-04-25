import Promise from 'promise';

export function signon(username, password) {
  // Some Ajax Call should be here
  return new Promise((fulfill, reject) => {
    if (username === 'admin' && password === 'admin') {
      fulfill({ token: 'OPIUW-ERFJOE-FDKSJ-HFKSD-HJFKS' });
    } else {
      reject('Username or Password is not correct');
    }
  });
}
