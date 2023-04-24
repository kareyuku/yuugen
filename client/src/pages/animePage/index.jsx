import {
    Container,
    Tabs, TabList, TabPanels, Tab, TabPanel, Text, Flex, Button
} from '@chakra-ui/react';
import Navbar from '../../components/navbar';
import ReviewPage from './components/reviewPage';
import EpisodesPage from './components/episodesPage';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAnime } from '../../api/anime';
import AnimeHeader from './components/animeHeader';
import AddEpisode from '../../modals/addEpisode';

export default () => {

    const {slug} = useParams();

    const [anime, setAnime] = useState({});

    useEffect(() => {
        const changeAnime = async () => {
            const reqAnime = await getAnime(slug);
            setAnime(reqAnime)
            console.log(anime)
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
            <Flex flexGrow={1} height={'max-content'} flex={1} bg={'#171a2b'}>
                <Container mt={5} maxWidth={'1500px'}>
                    <Flex className='yuugen__header__wrapper'>
                        <Flex className="yuugen__header__content">
                            <Tabs width={'100%'}>
                                <TabList>
                                    <Tab>Odcinki</Tab>
                                    <Tab>Recenzje</Tab>
                                </TabList>

                                <TabPanels>
                                    <TabPanel> <EpisodesPage episodes={anime?.episodes}/> </TabPanel>
                                    <TabPanel> <ReviewPage/> </TabPanel>
                                </TabPanels>
                            </Tabs>
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