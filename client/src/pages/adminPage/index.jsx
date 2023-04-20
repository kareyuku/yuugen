import { Avatar, Button, Container, Text, Flex } from "@chakra-ui/react"
import Navbar from "../../components/navbar"
import './sidebar.css';

export default () => {

    const SidebarItem = ({label}) => {
        return <div className="yuugen__sidebar__item">
            <Text>{label}</Text>
        </div>
    }

    const Sidebar = ({children}) => {
        return (
            <Flex>
                <Flex bg={'#131624'} flexDir={'column'} w={'250px'} maxW={'250px'} maxH={'calc(100vh - 68px)'} h={'100vh'}>
                    <SidebarItem label={'Dodaj Anime'} />
                    <SidebarItem label={'Dodaj Anime'} />
                    <SidebarItem label={'Dodaj Anime'} />
                </Flex>
                {children}
            </Flex>
        )
    }

    return (
        <>
        <Sidebar>
            hej
        </Sidebar>
        </>
    )
}