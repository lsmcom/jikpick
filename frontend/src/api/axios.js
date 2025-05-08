// src/api/axios.js 따로 만들기
import axios from 'axios';

const instance = axios.create({
  withCredentials: true,             // 필요한 경우 (쿠키 사용 시)
});

export default instance;