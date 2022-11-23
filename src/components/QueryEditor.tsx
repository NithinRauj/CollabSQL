import { Container, Textarea } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { storeQuery } from '../state/reducer';
import * as monaco from 'monaco-editor';
import * as Y from 'yjs';
import { MonacoBinding } from 'y-monaco';
import { WebsocketProvider } from 'y-websocket';

const QueryEditor = () => {
    const [query, setQuery] = useState<string>("");
    const dispatch = useDispatch();
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

    useEffect(() => {
        initEditor();
        return () => {
            deleteEditor();
        }
    }, [])

    const initEditor = () => {
        const yDoc = new Y.Doc();
        const docType = yDoc.getText('sql-content');
        editorRef.current = monaco.editor.create(document.getElementById('sql-editor')!, {
            value: '/* Enter sql queries here */',
            language: 'sql',

        });

        const socketProvider = new WebsocketProvider('ws://localhost:1712', 'room1', yDoc);
        socketProvider.on('status', (event: any) => {
            console.log(event.status);
        });

        const binding = new MonacoBinding(docType, editorRef.current.getModel()!, new Set([editorRef.current]));
    }

    const deleteEditor = () => {
        if (editorRef.current) {
            editorRef.current.dispose();
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuery(e.target.value);
    }

    const handleBlur = () => {
        dispatch(storeQuery(query.trim()));
    }

    return (
        <Container
            w={'90%'}
            maxW={'90%'}
            m={5}
            p={'10px 0px'}
            h={'3xs'}
            borderRadius={'md'}
            border={'2px solid gray'}
            overflowY={'hidden'}
        >
            {/* <Textarea
                h={'3xs'}
                resize={'none'}
                focusBorderColor={'transparent'}
                border={'none'}
                placeholder={'Enter your queries here '}
                value={query}
                onChange={handleChange}
                onBlur={handleBlur}
            /> */}
            <div id='sql-editor' style={{ width: '100%', height: '100%' }}></div>
        </Container>
    )
}

export default QueryEditor