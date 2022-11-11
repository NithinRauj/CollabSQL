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
import ApiConfig from '../data/api-config.json';
import axios from 'axios';

function AppBar() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const executeQuery = async () => {
        try {
            const postData = {
                query: 'SELECT * FROM employee'
            }
            const res = await axios.post(`${ApiConfig.BASE_URL}${ApiConfig.EXECUTE_QUERY}`, postData);
            console.log(res.data);
        } catch (err) {
            console.log(err)
        }
    }

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
                    onClick={executeQuery}
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
