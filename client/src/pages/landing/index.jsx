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

// const mostRated = [
//     { title: "Rent a Girlfriend!", image: "https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg", slug: "rent-a-girlfriend"},
//     { title: "Dr Stone!", image: "https://fwcdn.pl/fpo/19/40/831940/7892914.3.jpg", slug: "dr-stone"},
//     { title: "Kimi no na wa!", image: "https://fwcdn.pl/fpo/00/82/760082/7782990.3.jpg", slug: "kimi-no-na-wa"},
//     { title: "Naruto", image: "https://wbijam.pl/grafika/anime/nar_plakat.jpg", slug: "naruto"},
//     { title: "Dr Stone!", image: "https://fwcdn.pl/fpo/19/40/831940/7892914.3.jpg", slug: "dr-stone"},
//     { title: "Kimi no na wa!", image: "https://fwcdn.pl/fpo/00/82/760082/7782990.3.jpg", slug: "kimi-no-na-wa"},
//     { title: "Rent a Girlfriend!", image: "https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg", slug: "rent-a-girlfriend"},
//     { title: "Dr Stone!", image: "https://fwcdn.pl/fpo/19/40/831940/7892914.3.jpg", slug: "dr-stone"},
//     { title: "Kimi no na wa!", image: "https://fwcdn.pl/fpo/00/82/760082/7782990.3.jpg", slug: "kimi-no-na-wa"},
//     { title: "Rent a Girlfriend!", image: "https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg", slug: "rent-a-girlfriend"},
//     { title: "Dr Stone!", image: "https://fwcdn.pl/fpo/19/40/831940/7892914.3.jpg", slug: "dr-stone"},
//     { title: "Kimi no na wa!", image: "https://fwcdn.pl/fpo/00/82/760082/7782990.3.jpg", slug: "kimi-no-na-wa"}
// ]

const newAdded = [
    { title: "Rent a Girlfriend!", image: "https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg", slug: "rent-a-girlfriend"},
    { title: "Dr Stone!", image: "https://fwcdn.pl/fpo/19/40/831940/7892914.3.jpg", slug: "dr-stone"},
    { title: "Kimi no na wa!", image: "https://fwcdn.pl/fpo/00/82/760082/7782990.3.jpg", slug: "kimi-no-na-wa"},
]

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

            <Swiper modules={[Autoplay]} speed={500} autoplay={{delay: 5000, disableOnInteraction: false}} spaceBetween={10} style={{height: '600px'}}>
                <SwiperSlide height="100%">
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
            spaceBetween={30}
            pagination={{clickable: true}}
            autoplay={{delay: 3000, disableOnInteraction: false}}
            modules={[Autoplay]}
            >
            {mostRated.map(mAnime => 
                <SwiperSlide style={{width: 'auto'}}>
                    <AnimeCard title={mAnime.title} image={mAnime.img} slug={mAnime.slug}/>
                </SwiperSlide>
            )}
            </Swiper>

            <Text fontSize={30} mt={10}>Ostatnio Aktualizowane</Text>
            <Text mb={3}>Bądź na bieżąco i przejrzyj nowe zmiany</Text>

            <Swiper
            slidesPerView={"auto"}
            spaceBetween={30}
            pagination={{clickable: true}}
            autoplay={{delay: 3000, disableOnInteraction: false}}
            modules={[Autoplay]}
            >
            {lastUpdated.map(mAnime => 
                <SwiperSlide style={{width: 'auto'}}>
                    <AnimeCard title={mAnime.title} image={mAnime.img} slug={mAnime.slug}/>
                </SwiperSlide>
            )}
            </Swiper>
            
        </Container >
        </>
    )
}