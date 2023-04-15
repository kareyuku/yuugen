import { Avatar, Container, Flex, Input, InputGroup, useToast } from '@chakra-ui/react';
import './nav.css';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser, registerUser } from '../../api/auth';

const logged = false;

export default () => {

    const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure()
    const { isOpen: isRegisterOpen, onOpen: onRegisterOpen, onClose: onRegisterClose } = useDisclosure()

    const toast = useToast({
        isClosable: true,
        duration: 3000,
        position: 'top-right'
    });

    const RegisterModal = () => {

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
            <Modal closeOnOverlayClick={false} isOpen={isRegisterOpen} onClose={onRegisterClose}>
                <ModalOverlay />
                <ModalContent maxWidth={'1500px'}>
                <ModalHeader textAlign={'center'}>Rejestracja</ModalHeader>
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
                            <Text onClick={onRegisterClose}>Masz już konto? Zaloguj się!</Text>                        
                        </Flex>
                    </Flex>
                </ModalBody>
                <ModalFooter bg={'#131624'}>
                </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

    const LoginModal = () => {

        const [username, setUsername] = useState("");
        const [password, setPass] = useState('');

        const onLogin = async () => {
            const status = await loginUser({username, password});
            if(!username || !password) return toast({ description: "Wypełnij wszystkie pola!", status: 'info' })
            if(status == "Zalogowano!") {
                toast({ description: "Pomyślnie zalogowano!", status: 'success' })
                onLoginClose();
            } else toast({ description: "Nie poprawna nazwa użytkownika bądź hasło!", status: 'error' })
        }

        return (
            <Modal closeOnOverlayClick={false} isOpen={isLoginOpen} onClose={onLoginClose}>
                <ModalOverlay />
                <ModalContent maxWidth={'1500px'}>
                <ModalHeader textAlign={'center'}>Logowanie</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6} bg={'#131624'}>
                    <Flex className='melancholy__login__mobile'>
                        <img src="https://media.discordapp.net/attachments/1000161200497233972/1096452529434411219/render1.png?width=671&height=671" alt="" />
                        <Flex width={'100%'} flexDir={'column'} justifyContent={'center'}>
                            <Input value={username} onChange={(e) => setUsername(e.target.value)} mb={5} placeholder='Nazwa Użytkownika'></Input>
                            <Input value={password} onChange={(e) => setPass(e.target.value)} mb={5} type={'password'} placeholder='Hasło'></Input>
                            <Text mb={5}><a href="/forgot-password">Zapomniałeś/aś hasła?</a></Text>
                            <button onClick={onLogin} mb={5} className='melancholy__button'>Zaloguj</button>
                            <Text onClick={() => {onRegisterOpen() && onLoginClose();}}>Nie masz jeszcze konta? Zarejestruj się!</Text>
                        </Flex>
                    </Flex>
                </ModalBody>
                <ModalFooter bg={'#131624'}>
                </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

    return (
        <header style={{padding: '10px'}}>
            <Container maxWidth={'1500px'} >
                <Flex justifyContent={'space-between'}>
                    <Flex alignItems={'center'} gap={3}>
                        <Link to="/">
                        <Avatar src={'https://media.discordapp.net/attachments/1000161200497233972/1096452529434411219/render1.png?width=671&height=671'} />
                        </Link>
                        <Text>Dodaj Anime</Text>
                    </Flex>
                    <Flex alignItems={'center'} gap={3}>
                        <input className='melancholy__search' type="search" placeholder="Wyszukaj anime..." />
                        {logged ? <Avatar/> : <button onClick={onLoginOpen}>Zaloguj się</button> }
                        <LoginModal/>
                        <RegisterModal/>
                    </Flex>
                </Flex>
            </Container>

        </header>
    )
}