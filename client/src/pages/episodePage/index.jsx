import { Container } from "@chakra-ui/react";
import Navbar from "../../components/navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAnime } from "../../api/anime";
import AnimePlayer from "../../components/animePlayer";

export default () => {
  const { slug, episodeNumber } = useParams();
  const [anime, setAnime] = useState({});
  const [currentEpisode, setCurrentEpisode] = useState({});

  const changeAnime = async () => {
    const reqAnime = await getAnime(slug);
    setAnime(reqAnime);
    const episode = reqAnime?.episodes?.find(
      (esp) => esp.number == episodeNumber
    );
    if (episode) setCurrentEpisode(episode);
  };

  const changeEpisode = async () => {
    setCurrentEpisode({});
    setAnime({});
    changeAnime();
  };

  useEffect(() => {
    changeEpisode();
  }, [episodeNumber]);

  return (
    <>
      <Navbar />
      <Container maxW={"1500px"}>
        <Breadcrumb mt={5}>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Główna Strona</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/anime/${slug}`}>
              {anime?.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Odcinek {episodeNumber}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <AnimePlayer anime={anime} currentEpisode={currentEpisode} />
      </Container>
    </>
  );
};
