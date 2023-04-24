import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true
})


const getProfile = async ({username}) => {
    try {
        const req = await api.get(`/users/${username}`);
        return req?.data;
    } catch(err) {
        return err?.response?.data?.message
    }
}

export {getProfile}