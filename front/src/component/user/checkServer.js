import axios from 'axios';

export const checkSever = async () => {
    try{
        // 서버 상태 확인 요청
        await axios.get(`${process.env.REACT_APP_URL}/확인 요청`);
    }catch (error) {
        // 서버와 연결이 끊겼을때 토큰 삭제
        console.error('서버와 연결이 끊어졌습니다. 토큰을 삭제합니다');

        // 토큰 삭제 로직
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpirationTime');
    }
};