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
    useToast,
    Text,
} from '@chakra-ui/react'
import { FaPlay } from 'react-icons/fa'
import ApiConfig from '../data/api-config.json';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { storeResult } from '../state/reducer';
import { RootState } from '../state/store';
import { QueryResult, ServerResError, ServerResSuccess, ServerResSuccessWithRows } from '../data/types';

function AppBar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const state = useSelector((state: RootState) => state.app);
    const toast = useToast();
    const dispatch = useDispatch();

    const executeQuery = async () => {
        if (!state) {
            toast({
                title: `Enter a valid query`,
                status: 'warning',
                position: 'bottom-right',
                isClosable: true,
            });
            return;
        }
        try {
            const postData = { query: state.query };
            const res = await axios.post(`${ApiConfig.BASE_SERVER_URL}${ApiConfig.EXECUTE_QUERY}`, postData);
            formatAndStoreResult(res.data);
        } catch (err) {
            console.log(err)
            toast({
                title: `Execution failed`,
                status: 'error',
                position: 'bottom-right',
                isClosable: true,
            });
        }
    }

    const formatAndStoreResult = (res: ServerResSuccessWithRows | ServerResSuccess | ServerResError) => {
        if (!res.err) {
            let formattedResult: QueryResult = {
                msg: res.msg as string
            }
            if ('result' in res && 'affectedRows' in res.result) {
                formattedResult = { ...formattedResult, affectedRows: res.result.affectedRows };
                toast({
                    title: `${formattedResult.msg}. Affected Rows ${formattedResult.affectedRows}`,
                    status: 'success',
                    position: 'bottom-right',
                    isClosable: true,
                });
            } else if ('result' in res && !('affectedRows' in res.result)) {
                formattedResult = { ...formattedResult, rows: res.result };
                toast({
                    title: formattedResult.msg,
                    status: 'success',
                    position: 'bottom-right',
                    isClosable: true,
                });
            }
            dispatch(storeResult(formattedResult));
        } else if ('desc' in res) {
            let formattedResult: QueryResult = {
                err: true,
                msg: `${res.desc.code} ${res.desc.sqlMessage}`
            }
            toast({
                title: formattedResult.msg,
                status: 'error',
                position: 'bottom-right',
                isClosable: true,
            });
            dispatch(storeResult(formattedResult));
        }
    }

    const shareSession = () => {
        onOpen();
    }

    const copyLink = () => {
        navigator.clipboard.writeText(`${ApiConfig.APP_URL}?session=${state.sessionId}`);
        onClose();
    }

    return (
        <>
            <Flex justifyContent={'space-around'} width={'5xl'}>
                <Heading> CollabSQL</Heading>
                <Button
                    colorScheme={'blue'}
                    onClick={shareSession}
                >
                    Collaborate
                </Button>
                <Button
                    colorScheme={'blue'}
                    leftIcon={<Icon as={FaPlay} />}
                    onClick={executeQuery}
                >
                    Execute
                </Button>
                <Text>Session: {state.sessionId}</Text>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Live Collaboration</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text as='b'>
                            Share this link with anyone you want to collaborate:
                        </Text>
                        <Text>
                            {ApiConfig.APP_URL}?session={state.sessionId}
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' onClick={copyLink}>Copy</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AppBar
