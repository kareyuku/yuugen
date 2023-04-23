import { Flex, Text, Tag, HStack } from "@chakra-ui/react"

const tags = ['Komedia', 'Okruchy Życia', 'Ecchi', 'Romans', 'seks']

export default () => {
    return (
        <>
        <Flex mt={3} bg={'#131624'} borderRadius={10} p={3} flexWrap={'wrap'} gap={2} w={'100%'}>
            {tags.map(tag => <Tag bg={'#1b1f35'} color={'white'}>{tag}</Tag>)}
        </Flex>
        <Flex mt={3} height={'min-content'} flexDir={'column'} bg={'#131624'} p={5} borderRadius={10} w={'100%'}>
            <Text>Status: <Tag bg={'#1b1f35'} color={'white'} >Wydawana</Tag></Text>
            <Text>Data Emisji: <Tag bg={'#1b1f35'} color={'white'} >14.04.2022</Tag></Text>
            <Text>Seria Dodana: <Tag bg={'#1b1f35'} color={'white'} >14.04.2023</Tag></Text>
        </Flex>
        <Flex mt={3} flexDir={'column'} bg={'#131624'} p={10} borderRadius={5}>
            <Text>Opis</Text>
            <Text>
                Rzucony przez swoją dziewczynę, rozbity emocjonalnie student Kazuya Kinoshita próbuje wypełnić pustkę w swoim sercu za pomocą wypożyczonej dziewczyny z mobilnej aplikacji. Na początku Chizuru Mizuhara wydaje się idealną dziewczyną ze wszystkim, o co mógłby poprosić: wspaniałym wyglądem i słodką, troskliwą osobowością. Widząc mieszane opinie na jej profilu po ich pierwszej randce i nadal dręczony przez swój poprzedni związek, Kazuya uważa, że Chizuru po prostu bawi się sercami mężczyzn i pozostawia jej negatywną ocenę. Wściekła na brak szacunku dla niej ze strony klienta, Chizuru ujawnia swoją prawdziwą naturę: szorstką i temperamentną, będącą całkowitym przeciwieństwem pierwszego wrażenia Kazuyi. W tym momencie Kazuya otrzymuje wiadomość o wypadku swojej babci i jest zmuszony zabrać ze sobą Chizuru do szpitala. Choć okazuje się, że to nic poważnego, jego babcia jest zachwycona, że Kazuya znalazł wreszcie poważną dziewczynę, co zawsze było jej życzeniem. Nie mogąc powiedzieć jej prawdy, Kazuya i Chizuru są zmuszeni do fałszywego związku — zachowują się tak, jakby byli prawdziwymi kochankami.
            </Text>
        </Flex>
        </>
    )    
}