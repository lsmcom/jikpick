import axios from 'axios';

const CONSUMER_KEY = import.meta.env.VITE_SGIS_CONSUMER_KEY;
const CONSUMER_SECRET = import.meta.env.VITE_SGIS_CONSUMER_SECRET;

let accessToken = null;
let tokenIssuedAt = null;

async function fetchAccessToken() {
  const response = await axios.get(
    'https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json',
    {
      params: {
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
      },
    }
  );
  accessToken = response.data.result.accessToken;
  tokenIssuedAt = new Date();
  return accessToken;
}

export async function getAccessToken() {
  const now = new Date();

  if (!accessToken || !tokenIssuedAt) {
    return await fetchAccessToken();
  }

  const elapsedMinutes = (now - tokenIssuedAt) / (1000 * 60);

  if (elapsedMinutes >= 55) {
    return await fetchAccessToken();
  }

  return accessToken;
}