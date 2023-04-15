import { Container } from "@chakra-ui/react"
import Navbar from "../../components/navbar"
import AnimeBanner from "../../components/animeBanner"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    Text, Flex
  } from '@chakra-ui/react'
import { useParams } from "react-router-dom"
import { useState } from "react"
import { FaFlag } from "react-icons/fa"

const players = [
    { name: 'CDA', src: 'https://ebd.cda.pl/620x395/139628438d', author: 'bartus'},
    { name: 'Mega.nz', src: 'https://mega.nz/embed/tugXhLbZ#SDY0BQJu8bumzk1YN23Ee3NxQsdgdo_lzGAax2U-x4I', author: 'bartus'},
    { name: 'Ok.ru', src: 'https://ok.ru/videoembed/4904378960555', author: 'bartus'},
    { name: 'Sibnet', src: 'https://video.sibnet.ru/shell.php?videoid=5100317', author: 'bartus'}
]

export default () => {
    const {name, number} = useParams();
    const [currentPlayer, setCurrentPlayer] = useState("");
    const PlayerOption = ({
        name, src, author
    }) => {
        return (
            <Flex bg={'#131624'} justifyContent={'space-between'} alignItems={'center'} borderRadius={'10px'} p={5} gap={3}>
                <Text>{name}</Text>
                <Flex gap={5}>
                    <Text>Autor: {author}</Text>
                    <button onClick={() => setCurrentPlayer(src)} className="melancholy__button">Oglądaj!</button>
                    <FaFlag/>
                </Flex>
            </Flex>
        )
    }
    return (
        <>
            <Navbar/>
            <Container maxW={'1500px'}>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='#'>Główna Strona</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink href='#'>{name}</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='#'>Odcinek {number}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                {currentPlayer.length > 0 && <iframe width="100%" height="500px" src={currentPlayer} title="Embed video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"></iframe>}
                <Flex mt={3} flexDir={'column'} gap={3}>
                    {players.map(player => <PlayerOption name={player.name} src={player.src} author={player.author} />)}
                </Flex>
            </Container>
        </>       
    )
}