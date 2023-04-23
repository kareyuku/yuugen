import { Button, Container, Flex, Heading, Img, Text } from "@chakra-ui/react"
import {FaStar} from 'react-icons/fa';
import './animeheader.css';

export default ({
    title, desc, image, episodeCount, rate
}) => {
    return <Flex >
        <Container maxW={1500}>
            <Flex className="yuugen__header__wrapper">
                <Flex className="yuugen__header__content">
                    <div className="poster">
                        <Img src={image}/>
                    </div>
                    <Flex className="info" flexDir={'column'} justifyContent={'space-between'}>
                            <Text>Wydawane</Text>
                            <Text fontSize={26}>{title}</Text>
                            <Button width={'fit-content'} mt={2} mb={2} bg={'#252f49'} fontWeight={'normal'}>Nieobejrzane</Button>
                            <Text className="info__text" fontSize={12}>
                                {desc}
                            </Text>
                    </Flex>
                </Flex>
                <Flex className="yuugen__header__sidebar" justifyContent={'space-around'} fontSize={14}>
                    <Flex flexDir={'column'}>
                        <Text>Typ: Manga</Text>
                        <Text>Studio: uwu</Text>
                        <Text>Emitowane: Czerw 24, 2018 do Grudz 18, 2020</Text>
                        <Text>Tagi: Action, Drama, Shouen, Sports</Text>
                    </Flex>
                    <Flex justifyContent={'space-between'} bg={'#252f49'} p={'.5rem 1rem'} borderRadius={10} alignContent={'center'}>
                            <Text fontSize={16}><b>{rate} / 10</b></Text>
                        <Flex>
                            <FaStar size={24}/>
                            <FaStar size={24}/>
                            <FaStar size={24}/>
                            <FaStar size={24}/>
                            <FaStar size={24}/>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            </Container>
        </Flex>
}