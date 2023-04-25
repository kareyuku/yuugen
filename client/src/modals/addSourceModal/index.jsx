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
  Select,
  useToast,
} from "@chakra-ui/react";
import { createSource } from "../../api/source";
import { useState } from "react";
import { useSelector } from "react-redux";

const validLink =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

export default ({ slug, episodeNumber }) => {
  const user = useSelector((state) => state.auth);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [group, setGroup] = useState("");

  const toast = useToast({
    isClosable: true,
    duration: 3000,
    position: "top-right",
  });

  const onAddSource = () => {
    if (!name) return toast({ description: "Musisz podać nazwę odtwarzacza" });
    if (name.length > 10)
      return toast({
        description: "Nazwa odtwarzacza może zawierać maksymalnie 10 znaków",
      });
    if (!link.match(validLink))
      return toast({ description: "Podaj poprawny link", status: "error" });

    createSource({ slug, episodeNumber, group, name, link });
    onClose();
    toast({ description: "Pomyślnie dodano odtwarzacz", status: "success" });
  };
  return (
    <>
      <Button onClick={onOpen} width={"100%"}>
        Dodaj Player
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay p={5} />
        <ModalContent className="yuugen-modal">
          <ModalBody>
            <Text mt={3} mb={3} fontSize={21}>
              Dodawanie Odtwarzacza
            </Text>
            <Text>Nazwa Odtwarzacza</Text>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Wpisz nazwe odtwarzacza np. CDA"
              maxLength={10}
            />
            <Text mt={3}>Grupa Subberska</Text>
            <Select value={group} onChange={(e) => setGroup(e.target.value)}>
              <option value="">Brak</option>
              {user?.groups &&
                user?.groups.map((group) => (
                  <option value={group._id}>{group.name}</option>
                ))}
            </Select>
            <Text mt={3}>Link do odwarzacza (EMBED)</Text>
            <Input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Link do odtwarzacza"
            />
          </ModalBody>
          <ModalFooter gap={3}>
            <Button onClick={onAddSource}>Dodaj</Button>
            <Button onClick={onClose}>Anuluj</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
