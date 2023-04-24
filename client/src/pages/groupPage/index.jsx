import { Avatar, Container, Flex, Text } from "@chakra-ui/react"
import Navbar from "../../components/navbar"
import { TabItem, Tabs } from "../../components/tabs"
import {RiFileList2Fill, RiGroupFill} from 'react-icons/ri';
import {FaEdit} from 'react-icons/fa';
import { useEffect, useState } from "react";
import { getGroup } from "../../api/group";
import { useParams } from "react-router-dom";

export default () => {

    const {groupId} = useParams();
    const [section, setSection] = useState("Informacje")
    const [group, setGroup] = useState({});

    useEffect(() => {
        const loadGroup = async () => {
            const groupData = await getGroup({groupId});
            if(groupData?.name)
                setGroup(groupData)
            else
                setGroup({err: "Nie znaleziono takiej grupy"})
        }
        loadGroup();
    }, [])

    return <>
        
        <Navbar/>
        <Container maxW={'1500px'}>
            <Flex>
                <Avatar src={group?.img} w={'128px'} h={'128px'}/>
                <Text>{group?.name}</Text>
            </Flex>
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