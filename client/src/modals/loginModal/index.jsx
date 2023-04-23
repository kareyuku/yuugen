import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../auth/authSlice";

import {
    Modal, useToast,
    ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton,
    Text, Flex, Input
  } from '@chakra-ui/react'
import { loginUser } from "../../api/auth";

export default ({
    isOpen, onOpen, onClose, registerOpen, toast
}) => {
    const [username, setUsername] = useState("");
    const [password, setPass] = useState('');
    const dispatch = useDispatch(); 

    const onLogin = async () => {
        if(!username || !password) return toast({ description: "Wypełnij wszystkie pola!", status: 'info' })

        const data = await loginUser({username, password});

        if(data) {
            dispatch(setCredentials({username: data.username, avatar: data.avatar, rank: data.rank}))
            toast({ description: "Pomyślnie zalogowano!", status: 'success' })
            onClose();
        } else toast({ description: "Nie poprawna nazwa użytkownika bądź hasło!", status: 'error' })
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
                        <Input value={password} onChange={(e) => setPass(e.target.value)} mb={5} type={'password'} placeholder='Hasło'></Input>
                        <Text mb={5}><a href="/forgot-password">Zapomniałeś/aś hasła?</a></Text>
                        <button onClick={onLogin} mb={5} className='melancholy__button'>Zaloguj</button>
                        <Text onClick={() => {registerOpen() && onClose();}}>Nie masz jeszcze konta? Zarejestruj się!</Text>
                    </Flex>
                </Flex>
            </ModalBody>
            </ModalContent>
        </Modal>
    )
}