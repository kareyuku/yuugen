import { Modal, Text, useDisclosure, Button, ModalOverlay, ModalContent, ModalBody, ModalFooter, Textarea } from "@chakra-ui/react"

export default ({
    slug, episodeNumber, playerInformations
}) => {  

    const { isOpen, onOpen, onClose } = useDisclosure();

    const sendReport = () => {
        onClose();
    }

    const ReportModal = () => (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay p={5}/>
            <ModalContent>
                <ModalBody>
                    <Text mt={3} mb={3} fontSize={21}>Zgłaszanie Odtwarzacza</Text>
                    <label>Tekst dla moderatora</label>
                    <Textarea/>
                </ModalBody>
                <ModalFooter gap={3}>
                    <Button onClick={sendReport}>Wyślij</Button>
                    <Button onClick={onClose}>Anuluj</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )

    return (
        <>
            <Button onClick={onOpen} width={'100%'} bg={'#131624'} _active={{bg: '#131624'}} _hover={{bg: '#131624'}} >Zgłoś Player</Button>
            <ReportModal/>
        </>
    )
}