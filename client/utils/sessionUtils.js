import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
const api = 'https://localhost:3000';

const sessionUtils = {
  checkSession: () => {
    return fetch('http://localhost:3000/api/session', {
      method: 'GET'
    })
    .then(function (response) {
      // if (response.status === 404) {
      //   alert('Session not found :(');
      //   browserHistory.push('/login');
      // } else if (response.status === 401) {
      //   alert('Session is not logged in :(');
      //   browserHistory.push('/login');
      // }
    })
    .catch(error => {
      console.log(error, 'There was an error getting the session!');
    });
  },
  signout: () => {
    return fetch('http://localhost:3000/api/session', {
      method: 'delete'
    })
    .catch(error => {
      console.log(error, 'There was an error getting the session!');
    });
  }
};

export default sessionUtils;
