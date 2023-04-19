import { ButtonGroup, Container } from "@chakra-ui/react"
import Navbar from "../../components/navbar"
import { MdVideoLibrary } from 'react-icons/md'
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Text, Flex,
    Button,
    Menu,
    MenuButton,
    MenuList,
  } from '@chakra-ui/react'
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const episodes = [
    {
        episodeNumber: 1,
        title: 'Dziewczyna do wynajęcia',
        animeSlug: 'Rent a Girlfriend!',
        players: [
            { name: 'CDA', src: 'https://ebd.cda.pl/620x395/139628438d', author: 'bartus'},
            { name: 'Mega.nz', src: 'https://mega.nz/embed/tugXhLbZ#SDY0BQJu8bumzk1YN23Ee3NxQsdgdo_lzGAax2U-x4I', author: 'bartus'},
            { name: 'Ok.ru', src: 'https://ok.ru/videoembed/4904378960555', author: 'bartus'},
            { name: 'Sibnet', src: 'https://video.sibnet.ru/shell.php?videoid=5100317', author: 'bartus'}
        ]
    },
    {
        episodeNumber: 2,
        title: 'Dziewczyna do wynajęcia 2',
        animeSlug: 'Rent a Girlfriend!',
        players: [
            { name: 'Ok.ru', src: 'https://ok.ru/videoembed/4904378960555', author: 'bartus'},
            { name: 'Sibnet', src: 'https://video.sibnet.ru/shell.php?videoid=5100317', author: 'bartus'}
        ]
    }
]

export default () => {
    const {name, episodeNumber} = useParams();
    const [currentEpisode, setCurrentEpisode] = useState({})
    const [currentPlayer, setCurrentPlayer] = useState({});
    const PlayerOption = ({
        name, src, author
    }) => {
        return (
            <Flex onClick={() => setCurrentPlayer({name, src, author})} bg={'#131624'} alignItems={'center'} borderRadius={'10px'} p={3} gap={3}>
                <Text>{author} - {name}</Text>
            </Flex>
        )
    }

    const prevEpisode = () => {
        const episodeInformation = episodes.find(ep => ep.animeSlug == 'Rent a Girlfriend!' && ep.episodeNumber == Number(episodeNumber) - 1);
        if(episodeInformation) {
            setCurrentEpisode(episodeInformation);
            if(episodeInformation?.players[0]) setCurrentPlayer(episodeInformation?.players[0])
        } else { setCurrentPlayer({}); setCurrentEpisode({}) }
    }

    const nextEpisode = () => {
        const episodeInformation = episodes.find(ep => ep.animeSlug == 'Rent a Girlfriend!' && ep.episodeNumber == Number(episodeNumber) + 1);
        if(episodeInformation) {
            setCurrentEpisode(episodeInformation);
            if(episodeInformation?.players[0]) setCurrentPlayer(episodeInformation?.players[0])
        } else { setCurrentPlayer({}); setCurrentEpisode({}) }
    }

    useEffect(() => {
        const episodeInformation = episodes.find(ep => ep.animeSlug == 'Rent a Girlfriend!' && ep.episodeNumber == Number(episodeNumber));
        console.log(episodes[0], name, episodeNumber)

        if(episodeInformation) {
            setCurrentEpisode(episodeInformation);
            if(episodeInformation?.players[0]) setCurrentPlayer(episodeInformation?.players[0])
        }
    }, [])

    return (
        <>
            <Navbar/>
            <Container maxW={'1500px'}>
                <Breadcrumb mt={5}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='#'>Główna Strona</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/anime/${name}`}>{name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='#'>Odcinek {episodeNumber}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Flex bg={'#131624'} mt={3} p={5} style={{borderRadius: '20px 20px 0 0'}} justifyContent={'space-between'} alignItems={'center'} >
                    {currentEpisode?.title}
                    {currentPlayer?.src && <Button bg={'#252f49'} _active={{bg: '#252f49'}} _hover={{bg: '#252f49'}} >Zgłoś Player</Button>}
                </Flex>
                <Flex>
                    {currentPlayer?.src ? <iframe style={{aspectRatio: 2.5}} width="100%" height="100%" src={currentPlayer?.src} title="Embed video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowfullscreen"></iframe>
                                    : <Text>Upss... nie udało się nam znaleźć tego odcinka!</Text>}
                </Flex>
                <Flex justifyContent={'space-between'} bg={'#131624'} p={5} style={{borderRadius: '0 0 20px 20px'}} >
                    <ButtonGroup>
                        <Link onClick={prevEpisode} to={episodeNumber <= 1 ? "" : `/anime/${name}/episode/${episodeNumber-1}`}>
                            <Button bg={'#252f49'} _active={{bg: '#252f49'}} _hover={{bg: '#252f49'}} ><FaArrowAltCircleLeft/></Button>
                        </Link>
                        <Link onClick={nextEpisode} to={`/anime/${name}/episode/${Number(episodeNumber)+1}`}>
                            <Button bg={'#252f49'} _active={{bg: '#252f49'}} _hover={{bg: '#252f49'}} ><FaArrowAltCircleRight/></Button>
                        </Link>
                    </ButtonGroup>
                    <Menu>
                        <MenuButton bg={'#252f49'} _active={{bg: '#252f49'}} _hover={{bg: '#252f49'}} as={Button} rightIcon={<MdVideoLibrary />}>
                            Player
                        </MenuButton>
                        <MenuList border={'none'} bg={'transparent'} gap={3}>
                            {currentEpisode?.players?.map(player => <PlayerOption name={player.name} src={player.src} author={player.author} />)}
                        </MenuList>
                        </Menu>
                </Flex>
            </Container>
        </>       
    )
}