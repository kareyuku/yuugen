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
        number, image
    }) => {
        return (
            <Link to={`episode/${number}`} >
            <Flex bgPos={'center'} bgSize={'cover'} bgImage={image} justifyContent={'center'} alignItems={'center'} borderRadius={10} width={'100%'} h={'150px'}>
                <span>Odcinek {number}</span>
            </Flex>
            </Link>
        )
    }
    return (
        <>
            <Input placeholder='Wyszukaj numer odcinka...' className='melancholy__search' type="number" mb={5} />
            <SimpleGrid columns={{sm: 1, md: 2, lg: 4, xl: 4}} rowGap={5} gap={5}>
                <Episode number={'1'} image={'https://www.looper.com/img/gallery/every-naruto-shippuden-filler-episode-you-can-skip-according-to-reddit/l-intro-1626971937.jpg'}/>
                <Episode number={'2'} image={'https://lh3.googleusercontent.com/pAqiOTfKI_MwGapjezMa1Osl4salc0naTRqTJOk_k11jI52WUydYt2EacCGpZMItdV6THEHWldQ=w1440-ns-nd-rj'}/>
            </SimpleGrid>
        </>
    )
}