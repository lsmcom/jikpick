import axios from 'axios';
import { getAccessToken } from './tokenManager';

// 시/도 목록 가져오기
export const getSidoList = async () => {
    const token = await getAccessToken();
    const response = await axios.get('https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json', {
        params: {
            accessToken: token,
        },
    });
    return response.data.result;
};

// 시/군/구 목록 가져오기
export const getSigunguList = async (sidoCd) => {
    const token = await getAccessToken();
    const response = await axios.get('https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json', {
        params: {
            accessToken: token,
            sido_cd: sidoCd,
        },
    });
    return response.data.result;
};

// 동/읍/면 목록 가져오기
export const getDongList = async (sidoCd, sggCd) => {
    const token = await getAccessToken();
    const response = await axios.get('https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json', {
        params: {
            accessToken: token,
            sido_cd: sidoCd,
            sgg_cd: sggCd,
        },
    });
    return response.data.result;
};