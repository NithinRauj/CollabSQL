import { Button, Container } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setParticipants, storeQuery } from '../state/reducer';
import * as monaco from 'monaco-editor';
import * as Y from 'yjs';
import API from '../data/api-config.json';
import { MonacoBinding } from 'y-monaco';
import { WebsocketProvider } from 'y-websocket';
import { RootState } from '../state/store';

const QueryEditor = () => {
    const state = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();
    const editor = useRef<monaco.editor.IStandaloneCodeEditor>();
    const socketProvider = useRef<WebsocketProvider>();

    useEffect(() => {
        initEditor();
        return () => {
            deleteEditor();
        }
    }, [state.sessionId]);

    const initEditor = () => {
        if (state.sessionId) {
            const yDoc = new Y.Doc();
            const docType = yDoc.getText('sql-content-' + state.sessionId);
            editor.current = monaco.editor.create(document.getElementById('sql-editor')!, {
                value: '/* Enter sql queries here */',
                language: 'sql',
                theme: 'vs-dark'
            });
            console.log('connecting to session ' + state.sessionId);
            socketProvider.current = new WebsocketProvider(API.AWARENESS_SOCKET_URL, state.sessionId, yDoc);
            socketProvider.current.on('status', (event: any) => {
                console.log(event.status);
            });
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
                console.log(participants);
                if (participants.size) {
                    const participantsData = [];
                    for (const [key, value] of participants) {
                        if (value.sessionId === state.sessionId) {
                            participantsData.push({ id: key, name: value.name });
                        }
                    }
                    console.log(participantsData);
                    dispatch(setParticipants(participantsData));
                }
            });
        }
    }

    const deleteEditor = () => {
        if (editor.current) {
            editor.current.dispose();
        }
        if (socketProvider.current) {
            disconnectProvider();
        }
    }

    const connectProvider = () => {
        socketProvider.current?.connect();
    }

    const disconnectProvider = () => {
        socketProvider.current?.disconnect();
    }

    return (
        <Container
            w={'90%'}
            maxW={'90%'}
            m={5}
            p={'10px 0px'}
            h={'3xs'}
            borderRadius={'md'}
            overflowY={'hidden'}
        >
            <Button onClick={connectProvider}>Connect</Button>
            <Button onClick={disconnectProvider}>Disconnect</Button>
            <div id='sql-editor' style={{ width: '100%', height: '100%' }}></div>
        </Container>
    )
}

export default QueryEditor