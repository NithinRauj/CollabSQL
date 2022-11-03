import { Container } from '@chakra-ui/react'
import React from 'react'

const ResultArea = () => {
    return (
        <Container
            bg={'gray.100'}
            w={'90%'}
            maxW={'90%'}
            m={5}
            h={'sm'}
            borderRadius={'md'}
        >
            SQL Output
        </Container>
    )
}

export default ResultArea