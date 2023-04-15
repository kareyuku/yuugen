import {
    Container,
    Tabs, TabList, TabPanels, Tab, TabPanel
} from '@chakra-ui/react';
import Navbar from '../../components/navbar';
import AnimeBanner from '../../components/animeBanner';
import ReviewPage from './components/reviewPage';
import EpisodesPage from './components/episodesPage';
import InfoPage from './components/infoPage';

export default () => {
    return (
        <>
            <Navbar/>
            <Container mt={5} maxWidth={'1500px'}>
                <AnimeBanner
                hideButton={true}
                hideDesc={true}
                />
                <Tabs mt={5}>
                    <TabList>
                        <Tab>Informacje</Tab>
                        <Tab>Odcinki</Tab>
                        <Tab>Recenzje</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <InfoPage/>
                        </TabPanel>
                        <TabPanel>
                            <EpisodesPage/>
                        </TabPanel>
                        <TabPanel>
                            <ReviewPage/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
        </>
    )
}