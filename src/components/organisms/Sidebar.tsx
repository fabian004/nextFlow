import React from 'react';
import { useRouter } from 'next/router';
import { Drawer, Toolbar, Typography, Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

interface SidebarProps {
    isDrawerOpen: boolean;
    drawerWidth: number;
    collapsedDrawerWidth: number;
    isSmallScreen: boolean;
    toggleDrawer: () => void;
    mobileOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isDrawerOpen, drawerWidth, collapsedDrawerWidth, isSmallScreen, toggleDrawer, mobileOpen }) => {
    const router = useRouter();

    const isActive = (path: string) => router.pathname === path;

    const menuItemStyle = (isActive: boolean, isDrawerOpen: boolean) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', 
        padding: isDrawerOpen ? '12px 16px' : '12px', 
        backgroundColor: isActive ? '#00cfe8' : 'transparent', 
        borderRadius: '8px', 
        color: isActive ? 'white' : '#4A4A4A', 
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'background-color 0.3s, color 0.3s', 
        boxShadow: isActive ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none', 
      });
      
      

    const drawerContent = (
        <Box sx={{ overflowY: 'auto', height: '100%', '&::-webkit-scrollbar': { width: '7px' }, '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'transparent', borderRadius: '4px', transition: 'background-color 0.3s ease' }, '&:hover::-webkit-scrollbar-thumb': { backgroundColor: 'lightgray', transition: 'background-color 0.3s ease' } }}>
            <Toolbar>
                {isDrawerOpen ? (
                    <Typography variant="h6">TekProvider</Typography>
                ) : (
                    <Typography variant="h6">Icon</Typography>
                )}
            </Toolbar>
            <Box sx={{marginTop: "6vh"}}>
                {[
                    { label: 'Home', icon: <HomeIcon />, path: '/dashboard' },
                    { label: 'Settings', icon: <SettingsIcon />, path: '/entrada-de-datos' },
                    { label: 'Profile', icon: <SettingsIcon />, path: '/profile' },
                    { label: 'Notifications', icon: <SettingsIcon />, path: '/notifications' },
                    { label: 'Messages', icon: <SettingsIcon />, path: '/messages' },
                    { label: 'Tasks', icon: <SettingsIcon />, path: '/tasks' },
                    { label: 'Reports', icon: <SettingsIcon />, path: '/reports' },
                    { label: 'Analytics', icon: <SettingsIcon />, path: '/analytics' },
                    { label: 'Users', icon: <SettingsIcon />, path: '/users' },
                    { label: 'Support', icon: <SettingsIcon />, path: '/support' },
                    { label: 'Settings 2', icon: <SettingsIcon />, path: '/settings-2' },
                    { label: 'Billing', icon: <SettingsIcon />, path: '/billing' },
                    { label: 'Files', icon: <SettingsIcon />, path: '/files' },
                    { label: 'Calendar', icon: <SettingsIcon />, path: '/calendar' },
                    { label: 'Logout', icon: <SettingsIcon />, path: '/logout' },
                ].map(({ label, icon, path }) => (
                    <Box
                        key={label}
                        onClick={() => router.push(path)}
                        component="div"
                        sx={menuItemStyle(isActive(path), isDrawerOpen)}
                    >
                        <IconButton style={{color:"inherit"}}>{icon}</IconButton>
                        {isDrawerOpen && (
                            <Typography
                                sx={{
                                    marginLeft: 1,
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                            >
                                {label}
                            </Typography>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );

    return (
        <>
            {isSmallScreen ? (
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={toggleDrawer}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            ) : (
                <Drawer
                    variant="permanent"
                    open={isDrawerOpen}
                    sx={{
                        width: isDrawerOpen ? drawerWidth : collapsedDrawerWidth,
                        transition: 'width 0.3s ease-in-out',
                        overflowX: 'hidden',
                        '& .MuiDrawer-paper': {
                            width: isDrawerOpen ? drawerWidth : collapsedDrawerWidth,
                            transition: 'width 0.3s ease-in-out',
                            boxSizing: 'border-box',
                            borderRight: 'none', // Eliminar el borde derecho
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            )}
        </>
    );
};

export default Sidebar;
