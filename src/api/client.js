import axios from 'axios';
console.log(process.env.REACT_APP_BASE_URL);
const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 3000,
});

export default client;
