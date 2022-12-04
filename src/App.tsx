import {
  Box, Flex, Modal,
  ModalOverlay, ModalContent,
  ModalHeader, ModalFooter,
  ModalBody, useDisclosure,
  Button, Heading,
  Input
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import AppBar from './components/AppBar'
import API from './data/api-config.json';
import ParticipantsList from './components/ParticipantsList'
import QueryEditor from './components/QueryEditor'
import ResultArea from './components/ResultArea'
import { setUserData } from './state/reducer'
import generateSessionId from './utils/generateSessionId'

function App() {

  const [name, setName] = useState<string>('');
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fieldRef = useRef(null);

  useEffect(() => {
    onOpen();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const createOrJoinSession = () => {
    onClose();
    const url = window.location.href;
    let id;
    let isHost = false;
    const params = new URLSearchParams(url.split('?')[1]);
    if (params.has('session')) {
      id = params.get('session')!;
      console.log('You are a guest!!')
    } else {
      id = generateSessionId();
      isHost = true;
      console.log('You are the host!!')
      createSessionInDB(id);
    }
    dispatch(setUserData({ id, isHost, userName: name }));
  }

  const createSessionInDB = async (id: string) => {
    const res = await axios.post(`${API.BASE_SERVER_URL}${API.CREATE_SESSION}`, { id, result: '' });
    if (res.data.err) {
      alert("Error creating session");
    } else {
      console.log('Session created in DB');
    }
  }


  return (
    <Box className="App">
      <AppBar />
      <Flex>
        <Box w={'100%'}>
          <ResultArea />
          <QueryEditor />
        </Box>
        <ParticipantsList />
        <Modal
          closeOnOverlayClick={false}
          isOpen={isOpen}
          initialFocusRef={fieldRef}
          onClose={onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>CollabSQL</ModalHeader>
            <ModalBody>
              <Heading size={'md'}>What's your Name?</Heading>
              <Input onChange={handleNameChange} value={name} ref={fieldRef} />
            </ModalBody>

            <ModalFooter>
              <Button disabled={!name} onClick={createOrJoinSession}>{`That's my Name!`}</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </ Box >
  )
}

export default App
