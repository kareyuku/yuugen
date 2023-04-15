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
        console.log(123, err.request.response.toJson())
    }
}

const loginUser = async ({
    username, password
}) => {
    try {
        const req = await axios.post(`${api}/auth/login`, {username, password});
        return "Zalogowano!"
    } catch(err) {
        return "Nie poprawna nazwa użytkownika bądź hasło."
    }
}

export { registerUser, loginUser }