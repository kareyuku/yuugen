import { Avatar, Flex, Text } from '@chakra-ui/react';
import {FaStar} from 'react-icons/fa';
import './review.css';

export default () => {

    const ReviewCard = ({
        username, text, rate
    }) => {
        return (
            <Flex bg={'#252f49'} borderRadius={'10px'} p={5} gap={3}>
                <Avatar h={'64px'} w={'64px'} />
                <Flex flexDir={'column'}>
                    <Text>{username}</Text>
                    <Flex gap={.5} mb={3} p={0}>
                        <FaStar color={rate >= 1 ? '#EC4882' : '#131624'}/>
                        <FaStar color={rate >= 2 ? '#EC4882' : '#131624'}/>
                        <FaStar color={rate >= 3 ? '#EC4882' : '#131624'}/>
                        <FaStar color={rate >= 4 ? '#EC4882' : '#131624'}/>
                        <FaStar color={rate >= 5 ? '#EC4882' : '#131624'}/>
                    </Flex>
                    <Text>{text}</Text>
                </Flex>
            </Flex>
        )
    }

    return (
        <Flex gap={5} flexDir={'column'}>
            <ReviewCard
            username={'bartus'}
            text={"Było wczesne lato. Naszła mnie ochota na obejrzenie jakiegoś nowego anime, gdyż ostatnio oglądałem tylko tasiemca (z typem spod ciemnej koniczyny) mającego przerwę. Więc przejrzałem, co będzie w sezonie letnim. Patrzę - okładka wygląda ciekawie, czytam opis - spoko. Lecz ze względu na ogrom pracy i później urlopu, anime musiało…"}
            rate={4}
            />
        </Flex>
    )    
}