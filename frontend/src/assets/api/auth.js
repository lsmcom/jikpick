// src/api/auth.js
import api from './axios';

export async function join(id, pass, name) {
  const response = await api.post('/join', { id, pass, name });
  return response.data;
}
