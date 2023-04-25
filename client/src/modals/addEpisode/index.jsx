import {
  Modal,
  Text,
  useDisclosure,
  Button,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Input,
  useToast,
} from "@chakra-ui/react";
import { NumberInput, NumberInputField } from "@chakra-ui/react";
import { createEpisode } from "../../api/episode";
import { useState } from "react";

const validLink =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

export default ({ slug }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState("");
  const [episodeNumber, setEpisodeNumber] = useState(1);
  const [img, setImg] = useState("");

  const toast = useToast({
    isClosable: true,
    duration: 3000,
    position: "top-right",
  });

  const onSubmit = async () => {
    if (!title) return toast({ description: "Musisz podać nazwe odcinka" });
    if (title.length > 50)
      return toast({ description: "Nazwa odcinka to maksymalnie 50 znaków" });
    if (img && !img.match(validLink))
      return toast({ description: "Link do obrazka jest nieprawidłowy" });
    const response = await createEpisode({ slug, title, episodeNumber, img });
    if (response?.msg)
      toast({ description: response?.msg, status: "success" }) && onClose();
    else toast({ description: response?.err, status: "error" });
  };

  return (
    <>
      <Button onClick={onOpen} width={"100%"}>
        Dodaj Odcinek
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay p={5} />
        <ModalContent className="yuugen-modal">
          <ModalBody>
            <Text mt={3} mb={3} fontSize={21}>
              Dodawanie Odcinka
            </Text>
            <Text>Numer Odcinka</Text>
            <NumberInput
              min={1}
              max={5000}
              value={episodeNumber}
              onChange={(e) => setEpisodeNumber(e)}
            >
              <NumberInputField />
            </NumberInput>
            <Text>Nazwa Odcinka</Text>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              focusBorderColor="transparent"
              placeholder="Wpisz nazwe odcinka"
              maxLength={50}
            />
            <Text mt={3}>Link do obrazka odcinka</Text>
            <Input
              value={img}
              onChange={(e) => setImg(e.target.value)}
              placeholder="Wpisz link do obrazka odcinka"
            />
          </ModalBody>
          <ModalFooter gap={3}>
            <Button onClick={onSubmit}>Dodaj</Button>
            <Button onClick={onClose}>Anuluj</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
