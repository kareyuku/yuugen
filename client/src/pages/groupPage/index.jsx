import { Avatar, Container, Flex } from "@chakra-ui/react"
import Navbar from "../../components/navbar"
import { TabItem, Tabs } from "../../components/tabs"
import {RiFileList2Fill, RiGroupFill} from 'react-icons/ri';
import {FaEdit} from 'react-icons/fa';
import { useState } from "react";

export default () => {

    const [section, setSection] = useState("Informacje")

    return <>
        
        <Navbar/>
        <Container maxW={'1500px'}>
            <Avatar w={'128px'} h={'128px'}/>
            <Tabs active={section} onChange={setSection}>
                <TabItem
                icon={RiFileList2Fill}
                name={'Informacje'}
                />
                <TabItem
                icon={RiGroupFill}
                name={'Członkowie'}
                />
                <TabItem
                icon={FaEdit}
                name={'Edytowanie'}
                />
            </Tabs>
        </Container>
        <Flex flexGrow={1} height={'max-content'} flex={1} bg={'#171a2b'} >
            {section}
        </Flex>

    </>
}