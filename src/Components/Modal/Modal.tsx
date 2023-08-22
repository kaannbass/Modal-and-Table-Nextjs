import React, { useState } from 'react';
import {
  Modal,
  Card,
  FormControl,
  TextField,
  CardContent,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
  Button,
  CardActions
} from '@mui/material';
import axios from 'axios';
import { URL } from '@/Config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModalProps } from '@/interface/index'


const avatarImages = [
  { id: 1, img: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1012.jpg' },
  { id: 2, img: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/725.jpg' },
  { id: 3, img: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/567.jpg' },
  { id: 4, img: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/0.jpg' },
  { id: 5, img: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/823.jpg' }
];


const ModalComponent: React.FC<ModalProps> = ({ open, onClose, title }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [departments, setDepartments] = useState('');
  const [selectedAvatar, setSelectedAvatar] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setDepartments(event.target.value as string);
  };

  const handleFormSubmit = async () => {
    const formData = {
      name,
      username,
      email,
      departments,
      avatar: selectedAvatar,
    };

    try {
      const response = await axios.post(URL + 'users', formData);

      if (response.status === 201) {
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
        console.error('Error creating user.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  const handleAvatarChange = (event) => {
    setSelectedAvatar(event.target.value);
    console.log(event.target.value)
  };

  return (
    <Modal open={open} onClose={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ maxWidth: 650, width: '90%' }}>
        <Typography variant="h4" sx={{ pt: 2, px: 2 }}>
          {title}
        </Typography>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pt: 3 }}>
          <FormControl sx={{ marginBottom: 2, width: '75%' }}>
            <TextField
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Full Name"
              variant="outlined"
            />
          </FormControl>
          <FormControl sx={{ marginBottom: 2, width: '75%' }}>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl sx={{ marginBottom: 2, width: '75%' }}>
            <TextField id="email" value={email}
              onChange={(e) => setEmail(e.target.value)} label="Email Address" variant="outlined" />
          </FormControl>
          <FormControl sx={{ marginBottom: 2, width: '75%' }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={departments}
              label="Role"
              onChange={handleChange}
            >
              <MenuItem value={'Contributor'}>Contributor</MenuItem>
              <MenuItem value={'Subscriber'}>Subscriber</MenuItem>
              <MenuItem value={'Author'}>Author</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ marginBottom: 2, width: '75%', alignContent: 'center' }}>
            <FormLabel id="demo-row-radio-buttons-group-label">Select Avatar</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={selectedAvatar}
              onChange={handleAvatarChange}
              sx={{ justifyContent: 'center' }}
            >
              {avatarImages.map((image, index) => (
                <div key={image.id} className="radio-container">
                  <FormControlLabel
                    value={`${image.img}`}
                    control={<Radio sx={{ display: 'none' }} id={`${image.img}`} />}
                    label={
                      <Avatar
                        sx={{
                          transition: '200ms all',
                          cursor: 'pointer',
                          border: selectedAvatar === `${image.img}`
                            ? '1px solid #fff'
                            : '1px solid transparent',
                          boxShadow: selectedAvatar === `${image.img}`
                            ? 'rgba(183,222,237,1) 0px 14px 28px, rgba(183,222,237,1) 0px 10px 10px'
                            : 'none',
                          '&:hover': {
                            cursor: 'pointer',
                            border: '1px solid #fff',
                            boxShadow: 'rgba(183,222,237,1) 0px 14px 28px, rgba(183,222,237,1) 0px 10px 10px'
                          },
                          '& img': {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          },
                        }}
                      >
                        <img src={image.img} alt={`Avatar ${image.id}`} loading="lazy" />
                      </Avatar>
                    }
                  />
                </div>
              ))}
            </RadioGroup>
          </FormControl>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" onClick={handleFormSubmit}>Create User</Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default ModalComponent;
