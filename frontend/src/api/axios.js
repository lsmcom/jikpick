// src/api/axios.js 따로 만들기
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:9090',  // 너 백엔드 서버 주소
  withCredentials: true,             // 필요한 경우 (쿠키 사용 시)
});

export default instance;