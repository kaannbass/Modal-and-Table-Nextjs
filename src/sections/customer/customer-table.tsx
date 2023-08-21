import React, { useState } from 'react';
import {
    Avatar,
    Box,
    Card,
    Checkbox,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const CustomersTable = (props: any) => {
    const {
        items = [],
        onDeselectAll,
        onDeselectOne,
        onSelectAll,
        onSelectOne,
        page = 0,
        selected = []
    } = props;

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [onPageChange, setOnPageChange];
    const handleRowsPerPageChange = (newRowsPerPage: React.SetStateAction<number>) => {
        setRowsPerPage(newRowsPerPage);

    };
    const onPageChange = (onPageChange: React.SetStateAction<number>) => {
        setOnPageChange(onPageChange);

    };

    const selectedSome = (selected.length > 0) && (selected.length < items.length);
    const selectedAll = (items.length > 0) && (selected.length === items.length);

    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const visibleItems = items.slice(startIndex, endIndex);

    return (
        <Card>
            <Box sx={{ minWidth: 800 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedAll}
                                    indeterminate={selectedSome}
                                    onChange={(event) => {
                                        console.log(event.target.checked)
                                        if (event.target.checked) {
                                            onSelectAll?.();
                                        } else {
                                            onDeselectAll?.();
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                Avatar
                            </TableCell>
                            <TableCell>
                                Name
                            </TableCell>
                            <TableCell>
                                Username
                            </TableCell>
                            <TableCell>
                                Email
                            </TableCell>
                            <TableCell>
                                Role
                            </TableCell>
                            <TableCell>
                                Edit
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleItems.map((customer) => {
                            const isSelected = selected.includes(customer.id);
                            return (
                                <TableRow
                                    hover
                                    key={customer.id}
                                    selected={isSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isSelected}
                                            onChange={(event) => {
                                                if (event.target.checked) {
                                                    onSelectOne?.(customer.id);
                                                } else {
                                                    onDeselectOne?.(customer.id);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Avatar>
                                            <img src={customer.avatar} alt="Avatar" loading="lazy" />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>
                                        <Stack
                                            alignItems="center"
                                            direction="row"
                                            spacing={2}
                                        >
                                            <Typography variant="subtitle2">
                                                {customer.name}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        {customer.username}
                                    </TableCell>
                                    <TableCell>
                                        {customer.email}
                                    </TableCell>
                                    <TableCell>
                                        {customer.departments}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Box>
            <TablePagination
                component="div"
                count={items.length}
                onPageChange={(event, newPage) => onPageChange(event, newPage)}
                onRowsPerPageChange={(event) => handleRowsPerPageChange(parseInt(event.target.value, 10))}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};
