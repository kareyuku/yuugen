import { Avatar, Container, Text, Flex } from "@chakra-ui/react"
import Navbar from "../../components/navbar"
import { useEffect, useState } from "react"
import { getProfile } from "../../api/user"
import { Link, useParams } from "react-router-dom"
import Slider from "../../components/slider"
import { SwiperSlide, Swiper } from "swiper/react"

export default () => {

    const { username } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        const loadProfile = async () => {
            console.log(12312312, user)
            setUser(await getProfile({username}))
        }
        loadProfile();
    }, [])

    return (
        <>
        <Navbar/>
        <Container maxW={'1500px'} pb={10} mt={10}>
            <Flex alignItems={'center'} gap={3}>
                <Avatar w={'128px'} h={'128px'}/>
                <Text fontSize={21}>{user?.username}</Text>
            </Flex>
        </Container>        
        <Flex flexGrow={1} height={'max-content'} flex={1} bg={'#171a2b'}>
            <Container maxW={'1500px'} mt={10}>
                {user?.groups && 
                <Swiper
                slidesPerView={"auto"}
                pagination={{clickable: true}}
                autoplay={{delay: 3000, disableOnInteraction: false}}
                >
                    {user?.groups.map(group =>
                        <SwiperSlide className="yuugen-slide" style={{width: 'auto'}}>
                            <Link to={`/group/${group._id}`}><Avatar w={'128px'} h={'128px'} src={group.img} /></Link>
                        </SwiperSlide>
                        )}
                </Swiper>
                }
            </Container>
        </Flex>
        </>
    )
}