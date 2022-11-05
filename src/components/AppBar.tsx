import {
    Button,
    Flex,
    Heading,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Icon,
} from '@chakra-ui/react'
import { FaPlay } from 'react-icons/fa'

function AppBar() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Flex justifyContent={'space-around'} width={'md'}>
                <Heading> CollabSQL</Heading>
                <Button
                    colorScheme={'blue'}
                    onClick={onOpen}
                >
                    Share
                </Button>
                <Button
                    colorScheme={'blue'}
                    leftIcon={<Icon as={FaPlay} />}
                >
                    Execute
                </Button>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Live Collaboration</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Invite users to collaborate
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Copy</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AppBar
