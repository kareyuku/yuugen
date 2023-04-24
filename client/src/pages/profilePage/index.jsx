import { Avatar, Container, Text, Flex } from "@chakra-ui/react"
import Navbar from "../../components/navbar"

export default () => {
    return (
        <>
        <Navbar/>
        <Container maxW={'1500px'} pb={10} mt={10}>
            <Flex alignItems={'center'} gap={3}>
                <Avatar w={'128px'} h={'128px'}/>
                <Text fontSize={21}>bartus</Text>
            </Flex>
        </Container>        
        <Flex flexGrow={1} height={'max-content'} flex={1} bg={'#171a2b'}>
            <Container maxW={'1500px'} mt={10}>
                Grupy Użytkownika
            </Container>
        </Flex>
        </>
    )
}