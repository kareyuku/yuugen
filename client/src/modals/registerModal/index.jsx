import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../auth/authSlice";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text,
  Flex,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { registerUser } from "../../api/auth";

const validMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default ({ isOpen, onOpen, onClose, loginOpen, toast }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const onRegister = async () => {
    if (!username || !email || !password || !confirmPass)
      return toast({ description: "Wypełnij wszystkie pola", status: "info" });
    if (!validMail.test(email))
      return toast({
        description: "Upewnij się że wpisany adres e-mail jest poprawny",
      });
    if (password !== confirmPass)
      return toast({
        description: "Upewnij się że hasła są takie same!",
        status: "error",
      });
    const response = await registerUser({ username, email, password });
    if (response?.err) {
      if (response?.err[0] == "password is not strong enough")
        toast({ description: "Hasło jest za słabe", status: "error" });
      else
        toast({
          description: "Nazwa użytkownika bądź adres e-mail jest już zajęty",
          status: "error",
        });
    } else
      toast({
        description: "Pomyślnie zarejestrowano konto!",
        status: "success",
      }) && onClose();
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth={"1500px"}>
        <ModalCloseButton />
        <ModalBody pb={6} bg={"#131624"}>
          <Flex className="melancholy__login__mobile">
            <img
              src="https://media.discordapp.net/attachments/1000161200497233972/1096452529434411219/render1.png?width=671&height=671"
              alt=""
            />
            <Flex width={"100%"} flexDir={"column"} justifyContent={"center"}>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                mb={5}
                placeholder="Nazwa Użytkownika"
                maxLength={15}
              ></Input>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                mb={5}
                type={"email"}
                placeholder="E-Mail"
              ></Input>
              <InputGroup gap={5}>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  mb={5}
                  type={"password"}
                  placeholder="Hasło"
                ></Input>
                <Input
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  mb={5}
                  type={"password"}
                  placeholder="Powtórz Hasło"
                ></Input>
              </InputGroup>
              <button
                onClick={onRegister}
                mb={5}
                className="melancholy__button"
              >
                Zarejestruj
              </button>
              <Text onClick={onClose}>Masz już konto? Zaloguj się!</Text>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
