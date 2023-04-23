import { Modal, Text, useDisclosure, Button, ModalOverlay, ModalContent, ModalBody, ModalFooter, Textarea, Input, Select } from "@chakra-ui/react"
import { createSource } from "../../api/source";
import { useState } from "react";

export default ({
    slug, episodeNumber
}) => {  

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [group, setGroup] = useState("");

    const onAddSource = () => {
        createSource({ slug, episodeNumber, group, name, link })
        onClose();
    }
    return (
        <>
            <Button onClick={onOpen} width={'100%'} bg={'#131624'} _active={{bg: '#131624'}} _hover={{bg: '#131624'}} >Dodaj Player</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay p={5}/>
                <ModalContent className="yuugen-modal">
                    <ModalBody>
                        <Text mt={3} mb={3} fontSize={21}>Dodawanie Odtwarzacza</Text>
                        <Text>Nazwa Odtwarzacza</Text>
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Wpisz nazwe odtwarzacza np. cda"/>
                        <Text mt={3}>Grupa Subberska</Text>
                        <Select>
                            <option value="none">Brak</option>
                        </Select>
                        <Text mt={3}>Link do odwarzacza (EMBED)</Text>
                        <Input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link do odtwarzacza"/>

                    </ModalBody>
                    <ModalFooter gap={3}>
                        <Button onClick={onAddSource}>Dodaj</Button>
                        <Button onClick={onClose}>Anuluj</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}