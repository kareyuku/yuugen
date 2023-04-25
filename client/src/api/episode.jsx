import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});

const createEpisode = async ({ slug, episodeNumber, title, img }) => {
  try {
    const req = await api.post(`/episodes/${slug}`, {
      number: parseInt(episodeNumber),
      title,
      img,
    });
    return { msg: "Pomyślnie dodano odcinek!" };
  } catch (err) {
    const msg = err?.response?.data?.message;
    if (msg) return { err: msg };
  }
};

export { createEpisode };
