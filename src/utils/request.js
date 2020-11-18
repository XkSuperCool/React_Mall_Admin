import axios from 'axios';
// import config from '../config';
import { message as globalMessage } from 'antd';

// const baseURL = process.env.NODE_ENV === 'development' ? config.devBaseURL : config.proBaseURL;

const newAxios = axios.create({
  // baseURL: baseURL,
  timeout: 10000
});

newAxios.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

newAxios.interceptors.response.use((response) => {
  const { statusCode, data, message } = response.data;
  if (statusCode !== 200) {
    globalMessage.error(message ?? '请求出错，请稍后再试!');
    return Promise.reject(message);
  }

  return data;
}, (error) => {
  if (/timeout\sof\s\d+ms\sexceeded/.test(error.message)) {
    // 超时
    globalMessage.error('网络出了点问题，请稍后重试！');
    return;
  }

  if (error && error.response) {
    switch(error.response.status) {
      case '400' :
        globalMessage.error('请求错误!');
        break;
      case '401' :
        globalMessage.error('未授权的访问!');
        break;
      case '404' :
        globalMessage.error('请求的资源不存在!');
        break;
      case '500' :
        globalMessage.error('内部错误请稍后重试!');
        break;
      default :
        globalMessage.error('出现未知错误，请稍后重试!');
    }
  }
});

export default newAxios.request;
