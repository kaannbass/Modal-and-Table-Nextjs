"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { alpha } from '@mui/material/styles';

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Box
            component="header"
            sx={{
                backdropFilter: 'blur(6px)',
                backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
                position: 'sticky',
                top: 0,
                zIndex: (theme) => theme.zIndex.appBar
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="8" fill="#D4DBFC" />
                        <path d="M15.7328 15.813C16.1661 15.5296 16.4514 15.0476 16.4514 14.5002C16.4514 13.6277 15.7271 12.9207 14.833 12.9207C13.9389 12.9207 13.2144 13.6277 13.2144 14.5002C13.2144 15.0476 13.5002 15.5299 13.9332 15.813C12.8101 16.1368 12 17.028 12 17.8949C12 18.9795 13.2688 18.841 14.8333 18.841C16.3983 18.841 17.6666 18.9798 17.6666 17.8949C17.6668 17.0277 16.857 16.1365 15.7328 15.813ZM26.0663 15.813C26.4995 15.5296 26.7848 15.0476 26.7848 14.5002C26.7848 13.6277 26.0605 12.9207 25.1664 12.9207C24.2723 12.9207 23.5478 13.6279 23.5478 14.5002C23.5478 15.0476 23.8336 15.5299 24.2666 15.813C23.1436 16.1368 22.3334 17.028 22.3334 17.8949C22.3334 18.9795 23.6022 18.841 25.1667 18.841C26.7317 18.841 28 18.9798 28 17.8949C28 17.0277 27.1901 16.1365 26.0663 15.813ZM20.9932 23.4178C21.4713 23.1047 21.7864 22.5728 21.7864 21.9683C21.7864 21.0053 20.9867 20.2244 19.9996 20.2244C19.0128 20.2244 18.2128 21.0053 18.2128 21.9683C18.2128 22.5728 18.5278 23.105 19.0062 23.4178C17.7658 23.7752 16.8717 24.759 16.8717 25.7161C16.8717 26.9137 18.2721 26.7604 19.9999 26.7604C21.7276 26.7604 23.1277 26.9137 23.1277 25.7161C23.128 24.7587 22.2336 23.7749 20.9932 23.4178Z" stroke="#2940D3" strokeWidth="1.3" strokeMiterlimit="10" />
                        <path d="M22.7692 23.0745L25.5385 20.3053" stroke="#2940D3" strokeWidth="1.3" strokeMiterlimit="10" />
                        <path d="M14.4615 20.3053L17.2308 23.0745" stroke="#2940D3" strokeWidth="1.3" strokeMiterlimit="10" />
                        <path d="M17.8461 15.9976H21.8461" stroke="#2940D3" strokeWidth="1.3" strokeMiterlimit="10" />
                    </svg>

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Users
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >

                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>

                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton sx={{ p: 0 }}>
                            <Avatar alt="Kaan Baş" src="/" />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </Box>
    );
}
export default ResponsiveAppBar;