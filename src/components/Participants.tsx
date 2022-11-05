import { Box, Container, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import Participant from './Participant'

const Participants = () => {
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
                    <Participant name='User 1' />
                    <Participant name='User 2' />
                    <Participant name='User 3' />
                </Flex>
            </Flex>
        </>

    )
}

export default Participants