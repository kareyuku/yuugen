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
            <Flex className="yuugen-admin-sidebar">
                <Flex bg={'#131624'} flexDir={'column'} w={'250px'} maxW={'250px'} h={'100vh'}>
                    <SidebarItem label={'Anime'} />
                    <SidebarItem label={'Grupy'} />
                    <SidebarItem label={'Użytkownicy'} />
                    <SidebarItem label={'Wnioski'} />
                </Flex>
                {children}
            </Flex>
        )
    }

    return (
        <>
        <Sidebar>
            <div className="yuugen-admin-content">
                hej
                blablalba
            </div>
        </Sidebar>
        </>
    )
}