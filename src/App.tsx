import { Box, Flex } from '@chakra-ui/react'
import './App.css'
import AppBar from './components/AppBar'
import Participants from './components/Participants'
import QueryEditor from './components/QueryEditor'
import ResultArea from './components/ResultArea'

function App() {

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
