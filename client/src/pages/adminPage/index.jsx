import { Avatar, Button, Container, Text, Flex } from "@chakra-ui/react"
import Navbar from "../../components/navbar"

export default () => {
    return (
        <>
        
            <Navbar/>

            <Flex>
            <Flex bg={'#131624'} flexDir={'column'} w={'250px'} maxW={'250px'} maxH={'calc(100vh - 68px)'} h={'100vh'}>
                <Text>Dodaj Anime</Text>
                <Text>Edytuj Anime</Text>
                <Text>Dodaj Tag</Text>
                <Text>Przeglądaj Wnioski</Text>
                <Text>Grupy</Text>
            </Flex>
            </Flex>
        
        </>
    )
}