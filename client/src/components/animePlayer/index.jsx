import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Text,
  Flex,
  Button,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
} from "@chakra-ui/react";

import { MdVideoLibrary } from "react-icons/md";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import "./player.css";
import SecureContent from "../secureContent";
import ReportPlayer from "../../modals/reportPlayer";
import AddSourceModal from "../../modals/addSourceModal";

export default ({ currentEpisode }) => {
  const { episodeNumber, slug } = useParams();
  const [currentSource, setSource] = useState("");

  const PlayerOption = ({ name, link, uploader, group }) => {
    const onChange = () => setSource({ name, link, uploader, group });
    return (
      <Flex
        onClick={onChange}
        bg={"#131624"}
        alignItems={"center"}
        borderRadius={"10px"}
        p={3}
        gap={3}
      >
        <Text display={"flex"} alignItems={"center"} gap={3}>
          {group?.name ? (
            <>
              <Avatar w={"16px"} h={"16px"} src={group?.img} /> {group?.name}
            </>
          ) : (
            uploader.username
          )}{" "}
          - {name}
        </Text>
      </Flex>
    );
  };

  useEffect(() => {
    setSource({});
    const sources = currentEpisode?.sources;
    if (sources?.length > 0) setSource(sources[0]);
  }, [currentEpisode]);

  return (
    <Flex flexDir={"column"} mt={1} gap={3}>
      <Text ml={2} fontSize={20}>
        {currentEpisode?.title && currentEpisode?.title}
      </Text>
      <Flex width={"100%"} flexDir={"column"}>
        <Flex className="yuugen-player">
          {currentSource?.link && (
            <iframe
              className="responsive-iframe"
              width={"100%"}
              src={currentSource?.link}
              title="Embed video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen="allowfullscreen"
            ></iframe>
          )}
          {!currentSource?.link && currentEpisode?.title && (
            <Text>
              Przykro nam, ale ten odcinek nie ma jeszcze odtwarzaczy.
            </Text>
          )}
          {!currentSource?.link && !currentEpisode?.title && (
            <Text>
              Przykro nam, ale nie jesteśmy w stanie odnaleźć tego odcinka.
            </Text>
          )}
        </Flex>

        <Flex className="yuugen-player-footer">
          <ButtonGroup>
            <Link
              to={
                episodeNumber <= 1
                  ? ""
                  : `/anime/${slug}/episode/${episodeNumber - 1}`
              }
            >
              <Button
                bg={"#131624"}
                _active={{ bg: "#131624" }}
                _hover={{ bg: "#131624" }}
              >
                <FaArrowAltCircleLeft />
              </Button>
            </Link>
            <Link to={`/anime/${slug}/episode/${Number(episodeNumber) + 1}`}>
              <Button
                bg={"#131624"}
                _active={{ bg: "#131624" }}
                _hover={{ bg: "#131624" }}
              >
                <FaArrowAltCircleRight />
              </Button>
            </Link>
          </ButtonGroup>

          <Menu>
            <MenuButton
              bg={"#131624"}
              _active={{ bg: "#131624" }}
              _hover={{ bg: "#131624" }}
              as={Button}
              rightIcon={<MdVideoLibrary />}
            >
              Player
            </MenuButton>
            <MenuList border={"none"} bg={"transparent"} gap={3}>
              {currentEpisode?.sources?.map((player) => (
                <PlayerOption
                  name={player.name}
                  link={player.link}
                  uploader={player.uploader}
                  group={player.group}
                />
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <Flex gap={3} m={0} height={"fit-content"}>
        {currentSource?.link && (
          <Flex
            flexDir={"column"}
            p={"1rem 1rem"}
            bg={"#252f49"}
            borderRadius={10}
          >
            <Text>Grupa: {currentSource?.group?.name || "Brak"}</Text>
            <Text>Dodane przez: {currentSource.uploader?.username}</Text>
            <SecureContent>
              <ReportPlayer />
            </SecureContent>
          </Flex>
        )}
        <SecureContent>
          <Flex>
            {currentEpisode?.title && (
              <AddSourceModal slug={slug} episodeNumber={episodeNumber} />
            )}
            {currentEpisode?.title && ( // todo("Ustaw progres")
              <AddSourceModal slug={slug} episodeNumber={episodeNumber} />
            )}
          </Flex>
        </SecureContent>
      </Flex>
    </Flex>
  );
};
