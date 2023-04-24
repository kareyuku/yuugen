import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true
})

const createEpisode = async ({
    slug, episodeNumber, title, img
}) => {
    const req = await api.post(`/episodes/${slug}`, {number: parseInt(episodeNumber), title, img});
}

export { createEpisode };