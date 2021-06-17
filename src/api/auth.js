import client from './client';

export const login = ({ username, password }) =>
  client.post('/api/user/login', { username, password });

export const register = ({ username, password }) =>
  client.post('/api/user/register', { username, password });

export const getUser = () => client.get('/api/user/check');
