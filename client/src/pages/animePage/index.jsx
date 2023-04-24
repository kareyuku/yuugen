import {
    Container,
Text, Flex, Button
} from '@chakra-ui/react';
import Navbar from '../../components/navbar';
import ReviewPage from './components/reviewPage';
import EpisodesPage from './components/episodesPage';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAnime } from '../../api/anime';
import AnimeHeader from './components/animeHeader';
import AddEpisode from '../../modals/addEpisode';
import { TabItem, Tabs } from '../../components/tabs';

import {MdVideoLibrary, MdModeComment} from 'react-icons/md';

export default () => {

    const {slug} = useParams();

    const [anime, setAnime] = useState({});
    const [section, setSection] = useState("Odcinki");

    useEffect(() => {
        const changeAnime = async () => {
            const reqAnime = await getAnime(slug);
            setAnime(reqAnime)
        }
        changeAnime();
    }, [])

    if(anime?.err) return (
        <>
            <Navbar/>
            <Container mt={5}  maxW={1500}>
                <Text>Nie znaleziono anime!</Text>
            </Container>
        </>
    )

    return (
        <>
            <Navbar/>
            <AnimeHeader
            image={anime?.img}
            desc={anime?.desc}
            episodeCount={anime?.episodeCount}
            rate={anime?.rate}
            title={anime?.title}
            />
            <Container maxW={1500}>
                <Tabs active={section} onChange={setSection}>
                    <TabItem
                    name={'Odcinki'}
                    icon={MdVideoLibrary}
                    />
                    <TabItem
                    name={'Recenzje'}
                    icon={MdModeComment}
                    />
                </Tabs>
            </Container>
            <Flex flexGrow={1} height={'max-content'} flex={1} bg={'#171a2b'}>
                <Container mt={5} maxWidth={'1500px'}>
                    <Flex className='yuugen__header__wrapper'>
                        <Flex className="yuugen__header__content" flexDir={'column'}>
                            {section == "Odcinki" && <EpisodesPage episodes={anime?.episodes} />}
                            {section == "Recenzje" && <ReviewPage/> }
                        </Flex>
                        <Flex className="yuugen__header__sidebar" fontSize={14}>
                            {/* <Heading>Statystyki</Heading>
                            <Heading>Połączone</Heading> */}
                            <AddEpisode slug={slug} />
                        </Flex>
                    </Flex>
                </Container>
            </Flex>
        </>
    )
}