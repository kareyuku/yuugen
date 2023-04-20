import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true
})

const createSource = async ({
    slug, episodeNumber, group, name, link
}) => {
    const req = await api.post(`/episodes/${slug}/${episodeNumber}`, {group, name, link});
}

export { createSource };