import { Box, Flex } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import AppBar from './components/AppBar'
import Participants from './components/Participants'
import QueryEditor from './components/QueryEditor'
import ResultArea from './components/ResultArea'
import { setSessionId } from './state/reducer'
import generateSessionId from './utils/generateSessionId'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const url = window.location.href;
    let id: string;
    const params = new URLSearchParams(url.split('?')[1]);
    if (params.has('session')) {
      id = params.get('session')!;
    } else {
      id = generateSessionId();
    }
    dispatch(setSessionId(id));
  }, []);


  return (
    <Box className="App" p={1}>
      <AppBar />
      <Flex justify={'space-between'}>
        <Box w={'80%'}>
          <ResultArea />
          <QueryEditor />
        </Box>
        <Participants />
      </Flex>
    </ Box >
  )
}

export default App
