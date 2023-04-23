import Navbar from "../../components/navbar"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { Container, Flex, Text } from '@chakra-ui/react';
import "swiper/css";
import "swiper/css/pagination";
import AnimeBanner from "../../components/animeBanner";
import AnimeCard from "../../components/animeCard";
import { useEffect, useState } from "react";
import { findAnime } from "../../api/anime";

export default () => {

    const [mostRated, setMostRated] = useState([]);
    const [lastUpdated, setLastUpdated] = useState([]);

    useEffect(() => {
        const fetchAnimes = async () => {
            const resultRated = await findAnime({ limit: 20, sortBy: 'rate', sortOrder: 'DESC' })
            const lastUpdated = await findAnime({ limit: 20, sortBy: 'updatedAt', sortOrder: 'DESC' })
            setMostRated(resultRated);
            setLastUpdated(lastUpdated)
        }
        fetchAnimes();
    }, [])

    return (
        <>
        <Navbar/>
        <Container maxWidth={1500} pt={10}>

            <Swiper 
            slidesPerView={1}
            modules={[Autoplay]} 
            speed={500} 
            autoplay={{delay: 5000, disadbleOnInteraction: false}} 
            style={{height: '600px'}}>
                <SwiperSlide>
                    <AnimeBanner/>
                </SwiperSlide>
                <SwiperSlide>
                    <AnimeBanner/>
                </SwiperSlide>
            </Swiper>

            <Flex mt={10} flexDir={'column'} >
                <Text fontSize={30} >Najwyżej oceniane</Text>
                <Text mb={3}>Przeglądaj anime najlepiej ocenianie przez naszych użytkowników</Text>
            </Flex>

            <Swiper
            slidesPerView={"auto"}
            pagination={{clickable: true}}
            autoplay={{delay: 3000, disableOnInteraction: false}}
            modules={[Autoplay]}
            >
            {mostRated.map(mAnime => 
                <SwiperSlide className="yuugen__slider">
                    <AnimeCard title={mAnime.title} image={mAnime.img} slug={mAnime.slug}/>
                </SwiperSlide>
            )}
                        {mostRated.map(mAnime => 
                <SwiperSlide className="yuugen__slider">
                    <AnimeCard title={mAnime.title} image={mAnime.img} slug={mAnime.slug}/>
                </SwiperSlide>
            )}
            </Swiper>

            <Text fontSize={30} mt={10}>Ostatnio Aktualizowane</Text>
            <Text mb={3}>Bądź na bieżąco i przejrzyj nowe zmiany</Text>

            <Swiper
            slidesPerView={"auto"}
            pagination={{clickable: true}}
            autoplay={{delay: 3000, disableOnInteraction: false}}
            modules={[Autoplay]}
            >
            {lastUpdated.map(mAnime => 
                <SwiperSlide className="yuugen__slider">
                    <AnimeCard title={mAnime.title} image={mAnime.img} slug={mAnime.slug}/>
                </SwiperSlide>
            )}
            </Swiper>
            
        </Container >
        </>
    )
}