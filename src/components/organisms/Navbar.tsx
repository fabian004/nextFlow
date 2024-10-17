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
                background:"#fafbfb",
                zIndex: 1201,
                width: isSmallScreen ? '100%' : `calc(100% - ${isDrawerOpen ? drawerWidth : collapsedDrawerWidth}px)`,
                ml: isSmallScreen ? 0 : 0,
                pl: isSmallScreen ? 0 : 1.5,
                transition: 'width 0.3s ease-in-out, margin-left 0.3s ease-in-out',
                boxShadow: 'none',
            }}
        >
            <Toolbar sx={{ color: '#949db2' }}>
                <IconButton edge="start" sx={{ color: '#949db2' }} aria-label="menu" onClick={toggleDrawer}>
                    <MenuIcon />
                </IconButton>
                <Grid container justifyContent="flex-end">
                    <IconButton sx={{ color: '#949db2' }}>
                        <AccountCircleIcon />
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>

    );
};

export default Navbar;
