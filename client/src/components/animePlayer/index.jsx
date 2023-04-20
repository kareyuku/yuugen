import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import {
    Text, Flex,
    Button, ButtonGroup,
    Menu,
    MenuButton,
    MenuList,
    Heading,
  } from '@chakra-ui/react'

import { MdVideoLibrary } from 'react-icons/md'
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'
import './player.css';

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
        <Flex width={'100%'} flexDir={'column'}>
            <Flex className="yuugen-player">
                {currentSource?.src 
                    ? <iframe className="responsive-iframe" width={'100%'} src={currentSource?.src} title="Embed video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowfullscreen"></iframe>
                    : <Text>Przykro nam, ale nie jesteśmy w stanie odnaleźć tego odcinka.</Text>
                }
                
            </Flex>     

            <Flex className="yuugen-player-footer">

                <ButtonGroup>
                    <Link to={episodeNumber <= 1 ? "" : `/anime/${slug}/episode/${episodeNumber-1}`}>
                        <Button bg={'#131624'} _active={{bg: '#131624'}} _hover={{bg: '#131624'}} ><FaArrowAltCircleLeft/></Button>
                    </Link>
                    <Link to={`/anime/${slug}/episode/${Number(episodeNumber)+1}`}>
                        <Button bg={'#131624'} _active={{bg: '#131624'}} _hover={{bg: '#131624'}} ><FaArrowAltCircleRight/></Button>
                    </Link>
                </ButtonGroup>

                <Menu>
                    <MenuButton 
                    bg={'#131624'} _active={{bg: '#131624'}} _hover={{bg: '#131624'}} 
                    as={Button} rightIcon={<MdVideoLibrary />}>Player</MenuButton>
                    <MenuList border={'none'} bg={'transparent'} gap={3}>
                        {currentEpisode?.sources?.map(player => <PlayerOption name={player.name} src={player.src} author={player.author} />)}
                    </MenuList>
                </Menu>

            </Flex>
        </Flex>
    )
}