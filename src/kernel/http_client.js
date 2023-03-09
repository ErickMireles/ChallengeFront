import AxiosClient from '../config/axios';

export default {
    doGet(endPoint) {
      return AxiosClient.get(endPoint);
    },
  };