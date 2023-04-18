import {
    Container, Input, Text
} from '@chakra-ui/react';
import Navbar from '../../components/navbar';
import { createAnime } from '../../api/anime';

export default () => {

    const addAnime = () => {
        createAnime({
            
        });
    }

    return (
        <>
        <Navbar/>
        <Container mt={3}>
            <Text>Nazwa Anime</Text>
            <Input placeholder='Wpisz nazwę anime...' className='melancholy__search' />
            <Text>Angielska Nazwa Anime</Text>
            <Input placeholder='Wpisz angielską nazwę anime...' className='melancholy__search' />
            <Text>Liczba Odcinków</Text>
            <Input type={'number'} placeholder='Wpisz ilość odcinków...' className='melancholy__search' />
            <button className='melancholy__button'>Dodaj Anime</button>
        </Container>

        </>
    )
}