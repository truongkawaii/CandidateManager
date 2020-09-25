import axios from 'axios';
import queryString from 'query-string';
import * as URLS from '../constant/constant';

export const axiosClient = axios.create({
  baseURL: URLS.BASE_URL,
  headers: {
    'content-type': 'application/json',
    Accept: 'application/json',
  },
  paramsSerializer: params => {
    return queryString.stringify(params, {
      encode: false,
    });
  },
});
axiosClient.interceptors.request.use(async config => {
  config.headers.Authorization = `Bearer dsfskdsvudidu851d5sf1.sdnfisdujfisdfs.7s515d4f`;
  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    throw error;
  },
);
