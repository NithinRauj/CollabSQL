import { Container, Textarea } from '@chakra-ui/react'
import React from 'react'

const QueryEditor = () => {
    return (
        <Container
            bg={'gray.100'}
            w={'90%'}
            maxW={'90%'}
            m={5}
            p={'10px 0px'}
            h={'3xs'}
            borderRadius={'md'}
        >
            <Textarea h={'3xs'} resize={'none'} focusBorderColor={'transparent'} border={'none'} placeholder={'Enter your queries here '} />
        </Container>
    )
}

export default QueryEditor