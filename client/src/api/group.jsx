import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true
})


const getGroup = async ({groupId}) => {
    try {
        const req = await api.get(`/groups/${groupId}`);
        return req?.data;
    } catch(err) {
        return err?.response?.data?.message
    }
}

export {getGroup}