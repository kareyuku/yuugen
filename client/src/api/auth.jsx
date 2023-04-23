import axios from 'axios';

const api = 'http://localhost:3001/api'

const registerUser = async ({
    username, email, password
}) => {
    try {
        const req = await axios.post(`${api}/users/create`, {username, email, password});
        console.log(req)
        return req;
    } catch(err) {
        console.log(123, err.request.response)
    }
}

const loginUser = async ({
    username, password
}) => {
    try {
        const req = await axios.post(`${api}/auth/login`, {username, password}, {withCredentials: true});
        return req.data;
    } catch(err) {
        return null
    }
}

const userData = async () => {
    try {
        const req = await axios.get(`${api}/user`, {withCredentials: true})
        return req.data;
    } catch(err) {
        return null;
    }
}

export { registerUser, loginUser, userData }