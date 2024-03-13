import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { fetchCandidates } from '../db/request.js'; 

const columns = [
    {
        accessorKey: 'flmname',
        header: 'ФИО',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'linkVK',
        header: 'Ссылка ВК',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'education',
        header: 'Образование',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Номер телефона',
        cell: (props) => <p>{props.getValue()}</p>
    }
];

const CandidateTable = () => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCandidates();
            setCandidates(data);
        };

        fetchData();
    }, []);

    const table = useReactTable({
        columns,
        data: candidates,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <Box>
            <Box className="table" w={table.getTotalSize()} >
                {table.getHeaderGroups().map(headerGroup => (
                    <Box className='tr' key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <Box className='th' w={header.getSize()} key={header.id}>
                                {header.column.columnDef.header}
                            </Box>
                        ))}
                    </Box>
                ))}
                {table.getRowModel().rows.map((row) => (
                    <Box className='tr' key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <Box className='td' w={cell.column.getSize()} key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Box>
                        ))}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default CandidateTable;
