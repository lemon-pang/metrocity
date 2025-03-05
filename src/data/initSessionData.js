import axios from "axios";

export const initSessionData = () => {
    const sessionUser = sessionStorage.getItem('users');
    const sessionUserVersion = sessionStorage.getItem('userVersion');

    axios.get('/data/users.json')
        .then(res => {
            const { users, version } = res.data;
            if (!sessionUser || sessionUserVersion !== version) {
                sessionStorage.setItem('users', JSON.stringify(users));
                sessionStorage.setItem('userVersion', version);
            }
        })
        .catch(err => { console.error('유저 데이터 로딩 실패 : ', err) })
};