import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api'
})

const getAnime = async (slug) => {
    const req = await api.get(`/anime/${slug}`)
    if(req?.data)
        return req.data;
    else 
        return "uwu"
}

const createAnime = async ({
    title, desc, img, banner, slug
}) => {
    const req = await api.post(`/anime/create`, {title, desc, img, banner, slug}, {withCredentials: true})
    return req;

}

export { getAnime, createAnime }