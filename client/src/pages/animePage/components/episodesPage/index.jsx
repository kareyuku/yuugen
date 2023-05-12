import { SimpleGrid, Flex, Input } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { useState } from "react";

export default ({ episodes }) => {
  const [query, setQuery] = useState("");

  const Episode = ({ number, image }) => {
    return (
      <Link to={`episode/${number}`}>
        <Flex
          bgColor={"gray"}
          bgPos={"center"}
          bgBlendMode={"multiply"}
          bgSize={"cover"}
          bgImage={image}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={10}
          width={"100%"}
          h={"150px"}
        >
          <span>Odcinek {number}</span>
        </Flex>
      </Link>
    );
  };
  return (
    <>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Wyszukaj numer odcinka..."
        className="melancholy__search"
        type="number"
        mb={5}
      />
      <SimpleGrid
        width={"100%"}
        columns={{ sm: 1, md: 2, lg: 4, xl: 4 }}
        rowGap={5}
        gap={5}
      >
        {episodes &&
          episodes
            .sort((a, b) => a.number - b.number)
            .filter((episode) => episode.number.toString().startsWith(query))
            .map((episode) => (
              <Episode number={episode.number} image={episode.img} />
            ))}
      </SimpleGrid>
    </>
  );
};
