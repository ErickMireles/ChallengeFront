import axios from 'axios';
const SERVER_URL = 'https://jsonplaceholder.typicode.com';
const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 30000,
});
 
export default instance;
