import { Avatar, Button, Flex } from "@chakra-ui/react";

export default ({ owner, members }) => {
  const GroupMember = ({ member }) => {
    return (
      <Flex justifyContent={"space-between"} alignContent={"center"}>
        <Flex>
          <Avatar size={"lg"} />
          {member.username}
        </Flex>
        <Flex alignContent={"center"}>
          <Button>Wyrzuć</Button>
        </Flex>
      </Flex>
    );
  };

  return (
    <>
      <Flex alignContent={"center"} flexDir={"column"} gap={5}>
        <Button width={"min-content"}>Dodaj Użytkownika</Button>
        <Flex flexDir={"column"}>
          {members.map((member) => (
            <GroupMember member={member} />
          ))}
        </Flex>
      </Flex>
    </>
  );
};
