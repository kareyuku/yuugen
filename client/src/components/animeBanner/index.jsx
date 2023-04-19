import {
    Box, Flex, Button
} from '@chakra-ui/react';

const exampleBanner = 'https://animecorner.me/wp-content/uploads/2023/02/rent-a-gf.webp'
const exampleImage = 'https://upload.wikimedia.org/wikipedia/en/1/12/Rent-A-Girlfriend_volume_1_cover.jpg'

export default ({
    name, description, image, banner, hideButton, hideDesc
}) => {
    return (
        <Box className="anime__slide__container" style={{backgroundImage: `url('${banner ? banner : exampleBanner}')`}}>
            <div className="anime__slide__wrapper">
                <img style={{borderRadius: 10}} width={140} src={image ? image : exampleImage} />
                <Flex flexDir={'column'} justifyContent={!hideButton ? 'space-between' : ''}>
                    <h1 style={{fontSize: '30px'}}>{name ? name : "Rent a Girlfriend!"}</h1>
                    {!hideDesc && 
                    <p style={{maxWidth: 400}}>
                        {description 
                        ? description 
                        : "Rzucony przez swoją dziewczynę, rozbity emocjonalnie student Kazuya Kinoshita próbuje wypełnić pustkę w swoim sercu za pomocą wypożyczonej dziewczyny z mobilnej aplikacji."}
                    </p>
                    }
                    {!hideButton && <button className='melancholy__button'>Oglądaj</button>}
                </Flex>
            </div>
        </Box>
    )
}