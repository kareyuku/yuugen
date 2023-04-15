import Navbar from "../../components/navbar"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { Scrollbar } from "swiper";
import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import "swiper/css";
import "swiper/css/pagination";
import AnimeBanner from "../../components/animeBanner";
import { Link } from "react-router-dom";

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

    const AnimeSlide = () => {
        return (
            <Box className="anime__slide__container" style={{backgroundImage: `url('https://animecorner.me/wp-content/uploads/2023/02/rent-a-gf.webp')`}}>
                <div className="anime__slide__wrapper">
                    <img style={{borderRadius: 10}} width={140} src="https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg" />
                    <Flex flexDir={'column'} justifyContent={'space-between'}>
                        <h1 style={{fontSize: '30px'}}>Rent a Girlfriend!</h1>
                        <p style={{maxWidth: 400}}>
                        Rzucony przez swoją dziewczynę, rozbity emocjonalnie student Kazuya Kinoshita próbuje wypełnić pustkę w swoim sercu za pomocą wypożyczonej dziewczyny z mobilnej aplikacji.
                        </p>
                        <Button bg={'pink'}>Oglądaj!</Button>
                    </Flex>
                </div>
            </Box>
        )
    }

    return (
        <>
        <Navbar/>
        <Container maxWidth={1500} pt={10}>

            <Swiper spaceBetween={10} className="anime__swiper" style={{height: '600px'}}>
                <SwiperSlide height="100%">
                    <AnimeBanner/>
                </SwiperSlide>
                <SwiperSlide>
                    <AnimeBanner/>
                </SwiperSlide>
            </Swiper>

            <Text fontSize={30} mt={10} mb={3}>Najwyżej oceniane</Text>

            <Swiper
                slidesPerView={"auto"}
                spaceBetween={30}
                pagination={{
                clickable: true,
                }}
                className="mySwiper"
            >
                <SwiperSlide style={{width: 'auto'}}><AnimeCard title={'Rent a Girlfriend!'} image={'https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg'}/></SwiperSlide>
                <SwiperSlide style={{width: 'auto'}}><AnimeCard title={'Rent a Girlfriend!'} image={'https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg'}/></SwiperSlide>
                <SwiperSlide style={{width: 'auto'}}><AnimeCard title={'Rent a Girlfriend!'} image={'https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg'}/></SwiperSlide>
                <SwiperSlide style={{width: 'auto'}}><AnimeCard title={'Rent a Girlfriend!'} image={'https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg'}/></SwiperSlide>
                <SwiperSlide style={{width: 'auto'}}><AnimeCard title={'Rent a Girlfriend!'} image={'https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg'}/></SwiperSlide>
                <SwiperSlide style={{width: 'auto'}}><AnimeCard title={'Rent a Girlfriend!'} image={'https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg'}/></SwiperSlide>
                <SwiperSlide style={{width: 'auto'}}><AnimeCard title={'Rent a Girlfriend!'} image={'https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg'}/></SwiperSlide>
                <SwiperSlide style={{width: 'auto'}}><AnimeCard title={'Rent a Girlfriend!'} image={'https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg'}/></SwiperSlide>
                <SwiperSlide style={{width: 'auto'}}><AnimeCard title={'Rent a Girlfriend!'} image={'https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg'}/></SwiperSlide>
            </Swiper>

            <Text fontSize={30} mt={10} mb={3}>Ostatnio Aktualizowane</Text>

            <Swiper
                slidesPerView={"auto"}
                spaceBetween={30}
                pagination={{
                clickable: true,
                }}
                className="mySwiper"
            >
                <SwiperSlide style={{width: 'auto'}}><AnimeCard title={'Rent a Girlfriend!'} image={'https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg'}/></SwiperSlide>
                <SwiperSlide style={{width: 'auto'}}><AnimeCard title={'Rent a Girlfriend!'} image={'https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg'}/></SwiperSlide>
                <SwiperSlide style={{width: 'auto'}}><AnimeCard title={'Rent a Girlfriend!'} image={'https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg'}/></SwiperSlide>
                <SwiperSlide style={{width: 'auto'}}><AnimeCard title={'Rent a Girlfriend!'} image={'https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg'}/></SwiperSlide>
                <SwiperSlide style={{width: 'auto'}}><AnimeCard title={'Rent a Girlfriend!'} image={'https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg'}/></SwiperSlide>
                <SwiperSlide style={{width: 'auto'}}><AnimeCard title={'Rent a Girlfriend!'} image={'https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg'}/></SwiperSlide>
                <SwiperSlide style={{width: 'auto'}}><AnimeCard title={'Rent a Girlfriend!'} image={'https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg'}/></SwiperSlide>
                <SwiperSlide style={{width: 'auto'}}><AnimeCard title={'Rent a Girlfriend!'} image={'https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg'}/></SwiperSlide>
                <SwiperSlide style={{width: 'auto'}}><AnimeCard title={'Rent a Girlfriend!'} image={'https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg'}/></SwiperSlide>
            </Swiper>
            
        </Container >
        </>
    )
}