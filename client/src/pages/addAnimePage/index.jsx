import {
    Button,
    Container, Input, Text
} from '@chakra-ui/react';
import Navbar from '../../components/navbar';
import { createAnime } from '../../api/anime';
import { useState } from 'react';

export default () => {

    const [animeName, setAnimeName] = useState("");
    const [slug, setSlug] = useState("");
    const [desc, setDesc] = useState("");
    const [tags, setTags] = useState([]);
    const [img, setImg] = useState("");
    const [banner, setBanner] = useState("");
    const [episodeCount, setEpisodeCount] = useState(0);

    const addAnime = () => {
        createAnime({
            title: animeName, banner, desc, img, slug, episodeCount
        });
    }

    return (
        <>
        <Navbar/>
        <Container mt={3}>
            
            <Text>Nazwa Anime</Text>
            <Input value={animeName} onChange={(e) => setAnimeName(e.target.value)} placeholder='Wpisz nazwę anime...' className='melancholy__search' />

            <Text>Slug</Text>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder='Wpisz slug ...' className='melancholy__search' />

            <Text>Opis Anime</Text>
            <Input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder='Wpisz opis anime...' className='melancholy__search' />
            
            <Text>Obrazek Anime</Text>
            <Input value={img} onChange={(e) => setImg(e.target.value)} placeholder='Podaj link do obrazka anime...' className='melancholy__search' />

            <Text>Banner Anime</Text>
            <Input value={banner} onChange={(e) => setBanner(e.target.value)} placeholder='Podaj link do banneru anime..' className='melancholy__search' />

            <Text>Liczba Odcinków</Text>
            <Input value={episodeCount} onChange={(e) => setEpisodeCount(e.target.value)} type={'number'} placeholder='Wpisz ilość odcinków...' className='melancholy__search' />

            <Button onClick={addAnime}>Dodaj Anime</Button>
        </Container>

        </>
    )
}