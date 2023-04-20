import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import {
    Text, Flex,
    Button, ButtonGroup,
    Menu,
    MenuButton,
    MenuList,
  } from '@chakra-ui/react'

import { MdVideoLibrary } from 'react-icons/md'
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'

export default ({
    currentEpisode
}) => {

    const [currentSource, setSource] = useState("");
    const {episodeNumber, slug} = useParams();

    const PlayerOption = ({
        name, src, author
    }) => {
        return (
            <Flex onClick={() => setSource({name, src, author})} bg={'#131624'} alignItems={'center'} borderRadius={'10px'} p={3} gap={3}>
                <Text>{author} - {name}</Text>
            </Flex>
        )
    }

    useEffect(() => {
        setSource({});
        const sources = currentEpisode?.sources;
        if(sources?.length > 0) setSource(sources[0])
    })

    return (
        <>
            <Flex bg={'#252f49'} mt={3} p={5} style={{borderRadius: '20px 20px 0 0'}} justifyContent={'space-between'} alignItems={'center'} >
                {currentEpisode?.title}
                {currentSource?.src && <Button bg={'#131624'} _active={{bg: '#252f49'}} _hover={{bg: '#252f49'}} >Zgłoś Player</Button>}
            </Flex>

            <Flex>
                {currentSource?.src ? <iframe style={{aspectRatio: 2.5}} width="100%" height="100%" src={currentSource?.src} title="Embed video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowfullscreen"></iframe>
                                : <Text>Upss... nie udało się nam znaleźć tego odcinka!</Text>}
            </Flex>

            <Flex justifyContent={'space-between'} bg={'#131624'} p={5} style={{borderRadius: '0 0 20px 20px'}} >

                <ButtonGroup>
                    <Link to={episodeNumber <= 1 ? "" : `/anime/${slug}/episode/${episodeNumber-1}`}>
                        <Button bg={'#252f49'} _active={{bg: '#252f49'}} _hover={{bg: '#252f49'}} ><FaArrowAltCircleLeft/></Button>
                    </Link>
                    <Link to={`/anime/${slug}/episode/${Number(episodeNumber)+1}`}>
                        <Button bg={'#252f49'} _active={{bg: '#252f49'}} _hover={{bg: '#252f49'}} ><FaArrowAltCircleRight/></Button>
                    </Link>
                </ButtonGroup>

                <Menu>
                    <MenuButton 
                    bg={'#252f49'} _active={{bg: '#252f49'}} _hover={{bg: '#252f49'}} 
                    as={Button} rightIcon={<MdVideoLibrary />}>Player</MenuButton>
                    <MenuList border={'none'} bg={'transparent'} gap={3}>
                        {currentEpisode?.sources?.map(player => <PlayerOption name={player.name} src={player.src} author={player.author} />)}
                    </MenuList>
                </Menu>

            </Flex>
        </>
    )
}