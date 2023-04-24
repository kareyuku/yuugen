import { Modal, Text, useDisclosure, Button, ModalOverlay, ModalContent, ModalBody, ModalFooter, Textarea, Input, Select } from "@chakra-ui/react"
import {
    NumberInput,
    NumberInputField
  } from '@chakra-ui/react'
import { createEpisode } from "../../api/episode";
import { useState } from "react";

export default ({
    slug
}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [title, setTitle] = useState('');
    const [episodeNumber, setEpisodeNumber] = useState(1);
    const [img, setImg] = useState('');

    const onSubmit = async () => {
        createEpisode({slug, title, episodeNumber, img})
    }

    return <>
    
        <Button onClick={onOpen} width={'100%'} bg={'#131624'} _active={{bg: '#131624'}} _hover={{bg: '#131624'}} >Dodaj Odcinek</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay p={5}/>
            <ModalContent className="yuugen-modal">
                <ModalBody>
                    <Text mt={3} mb={3} fontSize={21}>Dodawanie Odcinka</Text>
                    <Text>Numer Odcinka</Text>
                    <NumberInput min={1} max={5000}>
                        <NumberInputField value={episodeNumber} onChange={(e) => setEpisodeNumber(e.target.value)} />
                    </NumberInput>
                    <Text>Nazwa Odcinka</Text>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} focusBorderColor="transparent" placeholder="Wpisz nazwe odcinka"/>
                    <Text mt={3}>Link do obrazka odcinka</Text>
                    <Input value={img} onChange={(e) => setImg(e.target.value)} placeholder="Wpisz link do obrazka odcinka"/>

                </ModalBody>
                <ModalFooter gap={3}>
                    <Button onClick={onSubmit}>Dodaj</Button>
                    <Button onClick={onClose}>Anuluj</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    
    </>
}