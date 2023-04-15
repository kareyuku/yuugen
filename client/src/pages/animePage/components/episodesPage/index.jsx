import {
    SimpleGrid,
    Flex,
    Input
} from '@chakra-ui/react';

import {
    Link
} from 'react-router-dom';

export default () => {
    const Episode = ({
        number
    }) => {
        return (
            <Link to={`episode/${number}`} >
            <Flex bg={'#252f49'} justifyContent={'center'} alignItems={'center'} borderRadius={10} width={'100%'} h={'150px'}>
                <span>Odcinek {number}</span>
            </Flex>
            </Link>
        )
    }
    return (
        <>
            <Input placeholder='Wyszukaj numer odcinka...' className='melancholy__search' type="number" mb={5} />
            <SimpleGrid columns={{sm: 1, md: 2, lg: 4, xl: 5}} rowGap={5} gap={5}>
                <Episode number={'1'}/>
                <Episode number={'2'}/>
                <Episode number={'3'}/>
                <Episode number={'4'}/>
                <Episode number={'5'}/>
                <Episode number={'6'}/>
                <Episode number={'7'}/>
                <Episode number={'8'}/>
                <Episode number={'9'}/>
                <Episode number={'10'}/>
                <Episode number={'11'}/>
                <Episode number={'12'}/>
            </SimpleGrid>
        </>
    )
}