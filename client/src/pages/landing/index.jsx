import Navbar from "../../components/navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { Container, Flex, Text } from "@chakra-ui/react";
import "swiper/css";
import "swiper/css/pagination";
import AnimeBanner from "../../components/animeBanner";
import { useEffect, useState } from "react";
import { findAnime } from "../../api/anime";
import Slider from "../../components/slider";

export default () => {
  const [mostRated, setMostRated] = useState([]);
  const [lastUpdated, setLastUpdated] = useState([]);

  useEffect(() => {
    const fetchAnimes = async () => {
      const resultRated = await findAnime({
        limit: 20,
        sortBy: "rate",
        sortOrder: "DESC",
      });
      const lastUpdated = await findAnime({
        limit: 20,
        sortBy: "updatedAt",
        sortOrder: "DESC",
      });
      setMostRated(resultRated);
      setLastUpdated(lastUpdated);
    };
    fetchAnimes();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth={1500} pt={10}>
        <Swiper
          slidesPerView={1}
          modules={[Autoplay]}
          speed={500}
          autoplay={{ delay: 5000, disadbleOnInteraction: false }}
          style={{ height: "600px" }}
        >
          <SwiperSlide>
            <AnimeBanner />
          </SwiperSlide>
          <SwiperSlide>
            <AnimeBanner />
          </SwiperSlide>
        </Swiper>

        <Slider
          label={"Najwyżej oceniane"}
          desc={
            "Przeglądaj anime najlepiej oceniane przez naszych użytkowników"
          }
          items={mostRated}
        />

        <Slider
          label={"Ostatnio Aktualizowane"}
          desc={"Bądź na bieżąco i przejrzyj nowe zmiany"}
          items={lastUpdated}
        />
      </Container>
    </>
  );
};
