import { Avatar, Container, Text } from "@chakra-ui/react"
import Navbar from "../../components/navbar"

export default () => {
    return (
        <>
        
            <Navbar/>

            <Container maxW={'1500px'} mt={10}>
                <Avatar w={'128px'} h={'128px'}/>
                <Text>bartus</Text>
            </Container>
        
        </>
    )
}