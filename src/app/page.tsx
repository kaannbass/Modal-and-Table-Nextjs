"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { CustomersTable } from '../Components/customer-table';
import { User } from '@/interface/index'
import { SearchBar } from '@/Components/SearchBar';
import ModalComponent from '@/Components/Modal/Modal';
import { URL } from '@/Config';

import { ToastContainer } from 'react-toastify';
export default function Home(): React.ReactNode {

  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


  useEffect(() => {
    axios.get<User[]>(URL + 'users')
      .then((res) => {
        console.log(res.data)
        setUsers(res.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (searchText: string) => {
    const trimmedSearchText = searchText.trim();
    if (trimmedSearchText === '') {
      setFilteredUsers([]); // Clear filtered results
    } else {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(trimmedSearchText.toLowerCase()) ||
        user.username.toLowerCase().includes(trimmedSearchText.toLowerCase()) ||
        user.email.toLowerCase().includes(trimmedSearchText.toLowerCase()) ||
        user.departments.toLowerCase().includes(trimmedSearchText.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };



  return (
    <>
      <ToastContainer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl" >
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">All Users</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <SearchBar onSearch={handleSearch} />
                </Stack>
              </Stack>
              <div className="">
                <Button
                  onClick={handleOpenModal}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add New User
                </Button>
                <ModalComponent title='Add New User' open={modalOpen} onClose={handleCloseModal} />
              </div>
            </Stack>

            {filteredUsers.length > 0 ? (
              <CustomersTable count={filteredUsers.length} items={filteredUsers} />
            ) : (
              <CustomersTable count={users.length} items={users} />
            )}


          </Stack>
        </Container>
      </Box>
    </>
  );
}
