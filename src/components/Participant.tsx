import { Avatar, Box, Flex, Text, VStack } from '@chakra-ui/react'

type ParticipantProps = {
    id: string
    name: string
}

const Participant = ({ id, name }: ParticipantProps) => {
    return (
        <Box
            bg={'gray.800'}
            w={'100%'}
            p={5}
            borderBottom={'2px solid white'}
        >
            <VStack
            >
                <Avatar name={name} />
                <Text color={'whiteAlpha.900'}>{name}</Text>
            </VStack>
        </Box>
    )
}

export default Participant