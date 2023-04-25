import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true
})

const createSource = async ({
    slug, episodeNumber, group, name, link
}) => {
    const body = group ? {group, name, link} : {name, link}
    try {
        const req = await api.post(`/episodes/${slug}/${episodeNumber}`, body);
        return {msg: "Pomyślnie, dodano Player!"}
    } catch {
        return {err: "Nie udało się"}
    }
}

export { createSource };