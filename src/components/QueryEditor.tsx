import { Container, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { storeQuery } from '../state/reducer';

const QueryEditor = () => {
    const [query, setQuery] = useState<string>("");
    const dispatch = useDispatch();

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
            <Textarea
                h={'3xs'}
                resize={'none'}
                focusBorderColor={'transparent'}
                border={'none'}
                placeholder={'Enter your queries here '}
                value={query}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </Container>
    )
}

export default QueryEditor