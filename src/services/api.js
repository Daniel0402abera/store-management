import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://storemanagementapi.onrender.com/',
});

export default instance;
