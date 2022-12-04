import { Container } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import {
    Table, Thead, Tbody,
    Tr, Th, Td, TableContainer,
} from '@chakra-ui/react';
import { RootState } from '../state/store';

const ResultArea = () => {
    const result = useSelector((state: RootState) => state.app.result);

    return (
        <Container
            w={'100%'}
            maxW={'100%'}
            m={5}
            h={'lg'}
            border={'2px solid gray'}
            borderRadius={'md'}
            overflow={'auto'}
        >
            {result.rows && result.rows.length ?
                <TableContainer>
                    <Table variant='simple' colorScheme={'gray'}>
                        <Thead>
                            <Tr>
                                {Object.keys(result.rows[0]).map((column) => <Th key={column}>{column}</Th>)}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {result.rows.map((row) => {
                                return <Tr>
                                    {Object.values(row).map((rowValue, index) => <Td key={index}>{rowValue}</Td>)}
                                </Tr>
                            })}
                        </Tbody>
                    </Table>
                </TableContainer> : null
            }
        </Container>
    )
}

export default ResultArea