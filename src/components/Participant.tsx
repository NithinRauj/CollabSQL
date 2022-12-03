import { Avatar, Flex, Text } from '@chakra-ui/react'

type ParticipantProps = {
    id: string
    name: string
}

const Participant = ({ id, name }: ParticipantProps) => {
    return (
        <Flex
            justifyContent={'center'}
            alignItems={'center'}
            direction={'column'}
            margin={'10px 0px'}
        >
            <Avatar name={name} />
            <Text>{name}</Text>
        </Flex>
    )
}

export default Participant