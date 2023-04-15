import {
    Box, Flex, Button
} from '@chakra-ui/react';

export default ({
    name, description, image, hideButton, hideDesc
}) => {
    return (
        <Box className="anime__slide__container" style={{backgroundImage: `url('https://animecorner.me/wp-content/uploads/2023/02/rent-a-gf.webp')`}}>
            <div className="anime__slide__wrapper">
                <img style={{borderRadius: 10}} width={140} src="https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg" />
                <Flex flexDir={'column'} justifyContent={!hideButton ? 'space-between' : ''}>
                    <h1 style={{fontSize: '30px'}}>Rent a Girlfriend!</h1>
                    {!hideDesc && 
                    <p style={{maxWidth: 400}}>
                    Rzucony przez swoją dziewczynę, rozbity emocjonalnie student Kazuya Kinoshita próbuje wypełnić pustkę w swoim sercu za pomocą wypożyczonej dziewczyny z mobilnej aplikacji.
                    </p>
                    }
                    {!hideButton && <button className='melancholy__button'>Oglądaj</button>}
                </Flex>
            </div>
        </Box>
    )
}