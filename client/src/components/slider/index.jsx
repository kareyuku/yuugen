import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper"
import AnimeCard from "../animeCard"
import { Flex, Text } from "@chakra-ui/react"

export default ({
    label, desc, items
}) => {
    return <>
        <Flex mt={10} flexDir={'column'} pl={3} >
            <Text fontSize={20} >{label}</Text>
            <Text mb={3}>{desc}</Text>
        </Flex>
        <Swiper
        slidesPerView={"auto"}
        pagination={{clickable: true}}
        autoplay={{delay: 3000, disableOnInteraction: false}}
        modules={[Autoplay]}
        >
            {items.map(item =>
                <SwiperSlide className="yuugen-slide">
                    <AnimeCard title={item?.title} image={item?.img} slug={item?.slug} key={item?.slug} />
                </SwiperSlide>
                )}
        </Swiper>
    </>
}