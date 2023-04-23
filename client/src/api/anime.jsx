import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api'
})

const findAnime = async ({
    limit, sortBy, page, sortOrder
}) => {
    let query = ""
        limit && (query += `limit=${limit}&`)
        page && (query += `page=${page}&`)
        sortBy && (query += `sort_by=${sortBy}&`)
        sortOrder && (query += `sort_order=${sortOrder}&`)
    const req = await api.get(`/anime?${query}`)
    return req?.data;
}

const getAnime = async (slug) => {
    try {
        const req = await api.get(`/anime/${slug}`)
        if(req?.data)
            return req.data;
    } catch(err) {
        if(err?.response?.data?.message)
            return { err: 'Nie znaleziono anime'}
    }
}

const createAnime = async ({
    title, desc, img, banner, slug, episodeCount
}) => {
    const req = await api.post(`/anime/create`, {title, desc, img, banner, slug, episodeCount}, {withCredentials: true})
    return req;

}

export { getAnime, createAnime, findAnime }