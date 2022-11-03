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
} from '@chakra-ui/react'

function AppBar() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Flex justifyContent={'space-around'}>
                <Heading> CollabSQL</Heading>
                <Button colorScheme={'blue'} onClick={onOpen}>Share</Button>
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
