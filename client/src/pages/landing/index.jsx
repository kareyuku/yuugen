import Navbar from "../../components/navbar"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { Container, Flex, Text } from '@chakra-ui/react';
import "swiper/css";
import "swiper/css/pagination";
import AnimeBanner from "../../components/animeBanner";
import { Link } from "react-router-dom";

const mostRated = [
    { title: "Rent a Girlfriend!", image: "https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg", slug: "rent-a-girlfriend"},
    { title: "Dr Stone!", image: "https://fwcdn.pl/fpo/19/40/831940/7892914.3.jpg", slug: "dr-stone"},
    { title: "Kimi no na wa!", image: "https://fwcdn.pl/fpo/00/82/760082/7782990.3.jpg", slug: "kimi-no-na-wa"},
    { title: "Rent a Girlfriend!", image: "https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg", slug: "rent-a-girlfriend"},
    { title: "Dr Stone!", image: "https://fwcdn.pl/fpo/19/40/831940/7892914.3.jpg", slug: "dr-stone"},
    { title: "Kimi no na wa!", image: "https://fwcdn.pl/fpo/00/82/760082/7782990.3.jpg", slug: "kimi-no-na-wa"},
    { title: "Rent a Girlfriend!", image: "https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg", slug: "rent-a-girlfriend"},
    { title: "Dr Stone!", image: "https://fwcdn.pl/fpo/19/40/831940/7892914.3.jpg", slug: "dr-stone"},
    { title: "Kimi no na wa!", image: "https://fwcdn.pl/fpo/00/82/760082/7782990.3.jpg", slug: "kimi-no-na-wa"},
    { title: "Rent a Girlfriend!", image: "https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg", slug: "rent-a-girlfriend"},
    { title: "Dr Stone!", image: "https://fwcdn.pl/fpo/19/40/831940/7892914.3.jpg", slug: "dr-stone"},
    { title: "Kimi no na wa!", image: "https://fwcdn.pl/fpo/00/82/760082/7782990.3.jpg", slug: "kimi-no-na-wa"}
]

const newAdded = [
    { title: "Rent a Girlfriend!", image: "https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg", slug: "rent-a-girlfriend"},
    { title: "Dr Stone!", image: "https://fwcdn.pl/fpo/19/40/831940/7892914.3.jpg", slug: "dr-stone"},
    { title: "Kimi no na wa!", image: "https://fwcdn.pl/fpo/00/82/760082/7782990.3.jpg", slug: "kimi-no-na-wa"},
    { title: "Rent a Girlfriend!", image: "https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg", slug: "rent-a-girlfriend"},
    { title: "Dr Stone!", image: "https://fwcdn.pl/fpo/19/40/831940/7892914.3.jpg", slug: "dr-stone"},
    { title: "Kimi no na wa!", image: "https://fwcdn.pl/fpo/00/82/760082/7782990.3.jpg", slug: "kimi-no-na-wa"},
    { title: "Rent a Girlfriend!", image: "https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg", slug: "rent-a-girlfriend"},
    { title: "Dr Stone!", image: "https://fwcdn.pl/fpo/19/40/831940/7892914.3.jpg", slug: "dr-stone"},
    { title: "Kimi no na wa!", image: "https://fwcdn.pl/fpo/00/82/760082/7782990.3.jpg", slug: "kimi-no-na-wa"},
    { title: "Rent a Girlfriend!", image: "https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg", slug: "rent-a-girlfriend"},
    { title: "Dr Stone!", image: "https://fwcdn.pl/fpo/19/40/831940/7892914.3.jpg", slug: "dr-stone"},
    { title: "Kimi no na wa!", image: "https://fwcdn.pl/fpo/00/82/760082/7782990.3.jpg", slug: "kimi-no-na-wa"}
]

export default () => {

    const AnimeCard = ({
        title, image
    }) => {
        return (
            <Link to={`anime/${title}`}>
                <div className="anime__card">
                    <img style={{maxWidth: '500px', maxHeight: '300px'}} src={image} alt="anime" />
                    <div className="anime__card__title">
                        <span>{title}</span>
                    </div>
                </div>
            </Link>
        )
    }

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
                    <AnimeCard title={mAnime.title} image={mAnime.image} slug={mAnime.slug}/>
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
            {newAdded.map(mAnime => 
                <SwiperSlide style={{width: 'auto'}}>
                    <AnimeCard title={mAnime.title} image={mAnime.image} slug={mAnime.slug}/>
                </SwiperSlide>
            )}
            </Swiper>
            
        </Container >
        </>
    )
}