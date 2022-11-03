import { Flex, Icon } from '@chakra-ui/react'
import { FaUser } from 'react-icons/fa';

type ParticipantProps = {
    name: string
}

const Participant = ({ name }: ParticipantProps) => {
    return (
        <Flex
            w={'100%'}
            h={'50px'}
            m={'10px 0px'}
            borderRadius={'4px'}
            direction={'row'}
            justify={'space-around'}
            align={'center'}
            bg={'gray.700'}
            color={'whiteAlpha.800'}
        >
            <Icon as={FaUser}></Icon>
            {name}
        </Flex>
    )
}

export default Participant