import { Box, Center, Flex, Heading, VStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'
import Participant from './Participant'

const ParticipantsList = () => {

    const state = useSelector((state: RootState) => state.app);
    return (
        <>
            <Flex
                direction={'column'}
                width={'3xs'}
                ml={10}
                bg={'blackAlpha.400'}
            >
                <Box width={'100%'} bg={'blackAlpha.800'} borderBottom={'2px solid white'}>
                    <Center>
                        <Heading size={'lg'} py={'5'} color={'whiteAlpha.900'}>
                            Participants
                        </Heading>
                    </Center>
                </Box>
                <VStack spacing={0}>
                    {
                        state.participants.length ?
                            state.participants.map((p) => <Participant key={p!.id} id={p!.id} name={p!.name} />)
                            : null
                    }
                </VStack>
            </Flex>
        </>

    )
}

export default ParticipantsList