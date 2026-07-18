import request from 'superagent';

import { handleError, handleSuccess } from '_utils/api';

export const postRegister = user =>
  request.post('https://your-render-app.onrender.com/api/auth/register')
    .send(user)
    .then(handleSuccess)
    .catch(handleError);

export const postLogin = user =>
  request.post('https://your-render-app.onrender.com/api/auth/login')
    .send(user)
    .then(handleSuccess)
    .catch(handleError);

export const postLogout = () =>
  request.post('https://your-render-app.onrender.com/api/auth/logout')
    .then(handleSuccess)
    .catch(handleError);
