import React, { useState } from 'react';
import {
    Avatar,
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
    IconButton,
    Grid,
    TableContainer
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { URL } from '@/Config';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalComponent from './Modal/Modal';



export const CustomersTable = (props: any) => {
    const {
        items = [],
    } = props;

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = React.useState(0);
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const handleRowsPerPageChange = (newRowsPerPage: React.SetStateAction<number>) => {
        setRowsPerPage(newRowsPerPage);

    };
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const visibleItems = items.slice(startIndex, endIndex);

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleDeleteSelected = async () => {
        try {
            const selectedIds = selected.map(name =>
                items.find(customer => customer.name === name)?.id
            );

            const deletePromises = selectedIds.map(id =>
                axios.delete(URL + 'users/' + id)
            );

            const responses = await Promise.all(deletePromises);

            if (responses.every(response => response.status === 200)) {
                toast.success('Selected users deleted successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setTimeout(() => {
                    location.reload()
                }, 3000);
            } else {
                console.error('Error deleting selected users.');
                toast.error('Error deleting selected users.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            console.error('An error occurred:', error);
            toast.error('An error occurred: ' + error.message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };


    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };


    return (
        <Card>
            <Grid container>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>

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
                                    <TableCell>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={handleDeleteSelected}
                                            disabled={selected.length === 0} // Sadece seçili satırlar varken tıklanabilir
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {visibleItems.map((customer: any, index: any) => {
                                    const isItemSelected = isSelected(customer.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, customer.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={customer.name}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                <Avatar sx={{
                                                    objectFit: 'cover',
                                                }}>
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
                                                    <EditIcon />
                                                    <ModalComponent title='Add New User' open={modalOpen} onClose={handleCloseModal} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12}>
                    <TablePagination
                        component="div"
                        count={items.length}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={(event) => handleRowsPerPageChange(parseInt(event.target.value, 10))}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                </Grid>
            </Grid>
        </Card>
    );
};
