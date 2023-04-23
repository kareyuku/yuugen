import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../auth/authSlice";

import {
    Modal, useToast,
    ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton,
    Text, Flex, Input, InputGroup
  } from '@chakra-ui/react'
import { registerUser } from "../../api/auth";

export default ({
    isOpen, onOpen, onClose, loginOpen, toast
}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const onRegister = () => {
        if(!username || !email || !password || !confirmPass ) return toast({ description: "Wypełnij wszystkie pola!", status: 'info' })
        if(password !== confirmPass) return toast({ description: "Upewnij się że hasła są takie same!", status: 'error' })
        console.log(registerUser({username, email, password}))
    }

    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxWidth={'1500px'}>
            <ModalCloseButton />
            <ModalBody pb={6} bg={'#131624'}>
                <Flex className='melancholy__login__mobile'>
                    <img src="https://media.discordapp.net/attachments/1000161200497233972/1096452529434411219/render1.png?width=671&height=671" alt="" />
                    <Flex width={'100%'} flexDir={'column'} justifyContent={'center'}>
                        <Input value={username} onChange={(e) => setUsername(e.target.value)} mb={5} placeholder='Nazwa Użytkownika'></Input>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} mb={5} type={'email'} placeholder='E-Mail'></Input>
                        <InputGroup gap={5}>
                            <Input value={password} onChange={(e) => setPassword(e.target.value)} mb={5} type={'password'} placeholder='Hasło'></Input>
                            <Input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} mb={5} type={'password'} placeholder='Powtórz Hasło'></Input>
                        </InputGroup>
                        <button onClick={onRegister} mb={5} className='melancholy__button'>Zarejestruj</button>
                        <Text onClick={onClose}>Masz już konto? Zaloguj się!</Text>                        
                    </Flex>
                </Flex>
            </ModalBody>
            </ModalContent>
        </Modal>
    )
}