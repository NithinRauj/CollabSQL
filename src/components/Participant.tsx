import { Avatar, Box, Badge, keyframes, Text, VStack } from '@chakra-ui/react';

type ParticipantProps = {
    id: string
    name: string
    typing: boolean
}


const Participant = ({ id, name, typing }: ParticipantProps) => {
    const scaleAnim = keyframes`
       0% {transform:scale(1); }
       50% {transform:scale(1.2); }
       100% {transform:scale(1); }
    `;

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
                {typing ? <Badge
                    animation={`${scaleAnim} infinite 0.8s`}
                    colorScheme={'green'}
                >
                    Typing
                </Badge> : <Badge visibility={'hidden'}>Idle</Badge>}
            </VStack>
        </Box>
    )
}

export default Participant