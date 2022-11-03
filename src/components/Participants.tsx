import { Box, Container, Flex } from '@chakra-ui/react'
import React from 'react'
import Participant from './Participant'

const Participants = () => {
    return (
        <Flex
            w={'3xs'}
            mt={'10px'}
            p={'0px 5px'}
            bg={'gray.100'}
            borderRadius={'md'}
            direction={'column'}
            overflowY={'auto'}
        >
            <Participant name='User 1' />
            <Participant name='User 2' />
            <Participant name='User 3' />
            <Participant name='User 4' />
            <Participant name='User 5' />
        </Flex>

    )
}

export default Participants