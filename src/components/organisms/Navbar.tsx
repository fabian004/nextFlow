import React from 'react';
import { AppBar, Toolbar, IconButton, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface NavbarProps {
    toggleDrawer: () => void;
    isDrawerOpen: boolean;
    drawerWidth: number;
    collapsedDrawerWidth: number;
    isSmallScreen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDrawer, isDrawerOpen, drawerWidth, collapsedDrawerWidth, isSmallScreen }) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: 1201,
                width: isSmallScreen ? '100%' : `calc(100% - ${isDrawerOpen ? drawerWidth : collapsedDrawerWidth}px)`,
                ml: isSmallScreen ? 0 : isDrawerOpen ? `${drawerWidth}px` : `${collapsedDrawerWidth}px`,
                transition: 'width 0.3s ease-in-out, margin-left 0.3s ease-in-out',
            }}
        >
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                    <MenuIcon />
                </IconButton>
                <Grid container justifyContent="flex-end">
                    <IconButton color="inherit">
                        <AccountCircleIcon />
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
