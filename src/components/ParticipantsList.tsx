import { Flex, Heading } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'
import Participant from './Participant'

const ParticipantsList = () => {

    const state = useSelector((state: RootState) => state.app);
    return (
        <>
            <Flex direction={'column'}>
                <Heading size={'lg'}>Participants</Heading>
                <Flex
                    w={'3xs'}
                    h={'md'}
                    mt={'10px'}
                    p={'5px'}
                    bg={'gray.100'}
                    borderRadius={'md'}
                    direction={'column'}
                    overflowY={'auto'}
                >
                    {
                        state.participants.length ?
                            state.participants.map((p) => <Participant key={p!.id} id={p!.id} name={p!.name} />)
                            : null
                    }
                </Flex>
            </Flex>
        </>

    )
}

export default ParticipantsList