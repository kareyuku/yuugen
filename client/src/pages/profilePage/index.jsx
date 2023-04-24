import { Avatar, Container, Text, Flex } from "@chakra-ui/react"
import Navbar from "../../components/navbar"
import { useEffect, useState } from "react"
import { getProfile } from "../../api/user"
import { useParams } from "react-router-dom"

export default () => {

    const { username } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        const loadProfile = async () => {
            setUser(await getProfile({username}))
        }
        loadProfile();
    })

    return (
        <>
        <Navbar/>
        <Container maxW={'1500px'} pb={10} mt={10}>
            <Flex alignItems={'center'} gap={3}>
                <Avatar w={'128px'} h={'128px'}/>
                <Text fontSize={21}>{user?.username}</Text>
            </Flex>
        </Container>        
        <Flex flexGrow={1} height={'max-content'} flex={1} bg={'#171a2b'}>
            <Container maxW={'1500px'} mt={10}>
                Grupy Użytkownika
                {user?.groups.map(group => <Avatar src={group.img} />)}
            </Container>
        </Flex>
        </>
    )
}