// src/assets/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // 백엔드 주소
  withCredentials: true, // 세션 쿠키 포함해서 보냄
});

export default api;
