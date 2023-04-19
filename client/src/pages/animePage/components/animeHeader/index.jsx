import { Button, Container, Flex, Heading, Img, Text } from "@chakra-ui/react"
import {FaStar} from 'react-icons/fa';
import './animeheader.css';

export default ({
    image
}) => {
    return <Flex bg={'#1b1f35'}>
        <Container maxW={1500}>
            <Flex className="yuugen__header__wrapper">
                <Flex className="yuugen__header__content">
                    <div className="poster">
                        <Img src={image}/>
                    </div>
                    <Flex className="info" flexDir={'column'} justifyContent={'space-between'}>
                            <Text>Wydawane</Text>
                            <Heading>Naruto</Heading>
                            <Button width={'fit-content'} mt={2} mb={2} bg={'#252f49'} fontWeight={'normal'}>Nieobejrzane</Button>
                            <Text color={'#252f49'} className="info__text" fontSize={12}>
                            Naruto to młody, hałaśliwy i nierozgarnięty ninja z Wioski Ukrytego Liścia. Jego największym marzeniem jest zostanie Hokage, jednak każdy w wiosce naśmiewa się z niego i mówi mu, że nie da rady. Naruto jednak nie poddaje się i stawia czoła wszystkim przeszkodom na swojej drodze, czym udowadnia innym, że się co do niego grubo mylili. Z czasem, ze słabego dzieciaka, którego każdy uważał za nic więcej jak potwora i nieudacznika, Naruto staje się silnym i odważnym shinobi, który ze wszystkich sił broni wioski i swoich przyjaciół, narażając przy tym własne życie.
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
                            <Text fontSize={16}><b>9.89 / 10</b></Text>
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