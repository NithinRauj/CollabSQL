import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setNotify, setParticipants, storeQuery, storeResult } from '../state/reducer';
import * as monaco from 'monaco-editor';
import * as Y from 'yjs';
import API from '../data/api-config.json';
import { MonacoBinding } from 'y-monaco';
import { WebsocketProvider } from 'y-websocket';
import { RootState } from '../state/store';
import { Box, Container, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { QueryResult, ServerResSuccess, ServerResSuccessWithRows } from '../data/types';

const QueryEditor = () => {
    const state = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();
    const toast = useToast();
    const editor = useRef<monaco.editor.IStandaloneCodeEditor>();
    const socketProvider = useRef<WebsocketProvider>();

    useEffect(() => {
        initEditor();
        return () => {
            deleteEditor();
        }
    }, [state.sessionId]);

    useEffect(() => {
        if (state.notify) {
            socketProvider.current?.awareness.setLocalStateField('updateResult', true);
            socketProvider.current?.awareness.setLocalStateField('updateResult', false);
        }
    }, [state.notify])

    const initEditor = () => {
        if (state.sessionId) {
            const yDoc = new Y.Doc();
            const docType = yDoc.getText('sql-content-' + state.sessionId);
            editor.current = monaco.editor.create(document.getElementById('sql-editor')!, {
                value: '/* Enter sql queries here */',
                language: 'sql',
                theme: 'vs-dark',
                fontSize: 18
            });
            console.log('connecting to session ' + state.sessionId);
            socketProvider.current = new WebsocketProvider(API.SOCKET_URL, state.sessionId, yDoc);

            addSocketEvents();
            new MonacoBinding(docType, editor.current.getModel()!, new Set([editor.current]), socketProvider.current.awareness);

            const editorModel = editor.current.getModel()
            editorModel?.onDidChangeContent((e: monaco.editor.IModelContentChangedEvent) => {
                const editorContent = editorModel?.getValue() || "";
                dispatch(storeQuery(editorContent));
            });
        }
    }

    const addSocketEvents = () => {
        if (socketProvider.current) {
            socketProvider.current.awareness.setLocalStateField('name', state.userName);
            socketProvider.current.awareness.setLocalStateField('sessionId', state.sessionId);

            socketProvider.current.awareness.on('change', () => {
                const participants = socketProvider.current?.awareness.getStates()!;
                if (participants.size) {
                    const participantsData = [];
                    for (const [key, value] of participants) {
                        if (value.sessionId === state.sessionId) {
                            participantsData.push({ id: key, name: value.name });
                        }
                    }
                    dispatch(setParticipants(participantsData));
                }
            });

            socketProvider.current.awareness.on('update', ({ updated }: any) => {
                const participants = socketProvider.current?.awareness.getStates()!;
                const clientId = socketProvider.current?.awareness.clientID;
                for (const [key, value] of participants) {
                    if (value.sessionId === state.sessionId && key !== clientId && value.updateResult) {
                        console.log("Fetching result from DB");
                        fetchResult();
                    }
                }
            })
        }
    }

    const fetchResult = async () => {
        try {
            const res = await axios.get(`${API.BASE_SERVER_URL}${API.GET_RESULT}${state.sessionId}`);
            const data = JSON.parse(res.data.result.result);
            formatAndStoreResult(data)
        } catch (err) {
            console.log(err);
        }
    }

    const formatAndStoreResult = (res: ServerResSuccessWithRows | ServerResSuccess) => {

        let formattedResult: QueryResult = {
            msg: 'Query executed by another user'
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
        dispatch(setNotify(true));
    }

    const deleteEditor = () => {
        if (editor.current) {
            editor.current.dispose();
        }
        if (socketProvider.current) {
            disconnectProvider();
        }
    }

    const disconnectProvider = () => {
        socketProvider.current?.disconnect();
    }

    return (
        <Box
            w={'100%%'}
            maxW={'100%'}
            h={'sm'}
            m={5}
            p={'10px 0px'}
            borderRadius={'md'}
            overflowY={'hidden'}
        >
            <div id='sql-editor' style={{ width: '100%', height: '100%' }}></div>
        </Box>
    )
}

export default QueryEditor