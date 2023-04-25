import { Avatar, Container, Flex, Text } from "@chakra-ui/react";
import Navbar from "../../components/navbar";
import { TabItem, Tabs } from "../../components/tabs";
import { RiFileList2Fill, RiGroupFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getGroup } from "../../api/group";
import { useParams } from "react-router-dom";
import GroupMembers from "./sections/groupMembers";

export default () => {
  const { groupId } = useParams();
  const [section, setSection] = useState("Informacje");
  const [group, setGroup] = useState({});

  useEffect(() => {
    const loadGroup = async () => {
      const groupData = await getGroup({ groupId });
      if (groupData?.name) setGroup(groupData);
      else setGroup({ err: "Nie znaleziono takiej grupy" });
    };
    loadGroup();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxW={"1500px"}>
        <Flex alignItems={"center"} pt={"2rem"} pb={"2rem"}>
          <Avatar size={"2xl"} src={group?.img} />
          <Flex flexDir={"column"}>
            <Text fontSize={20}>{group?.name}</Text>
            <Text overflowWrap={"anywhere"} color={"#75849d"}>
              Założone przez {group?.owner?.username}
            </Text>
          </Flex>
        </Flex>
        <Tabs active={section} onChange={setSection}>
          <TabItem icon={RiFileList2Fill} name={"Informacje"} />
          <TabItem icon={RiGroupFill} name={"Członkowie"} />
          <TabItem icon={FaEdit} name={"Edytowanie"} />
        </Tabs>
      </Container>
      <Flex flexGrow={1} height={"max-content"} flex={1} bg={"#171a2b"}>
        <Container maxW={1500}>
          {section == "Członkowie" && (
            <GroupMembers members={group?.members} owner={group?.owner} />
          )}
        </Container>
      </Flex>
    </>
  );
};
