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

    const drawerContent = (
        <>
            <Toolbar>
                {isDrawerOpen ? (
                    <Typography variant="h6">TekProvider</Typography>
                ) : (
                    <Typography variant="h6">Icon</Typography>
                )}
            </Toolbar>
            <Box>
                <Box
                    onClick={() => router.push('/dashboard')}
                    component="div"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isDrawerOpen ? 'flex-start' : 'center',
                        padding: '10px',
                        backgroundColor: isActive('/dashboard') ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        textDecoration: 'none', 
                    }}
                >
                    <IconButton>
                        <HomeIcon />
                    </IconButton>
                    {isDrawerOpen && (
                        <Typography
                            sx={{
                                marginLeft: 1,
                                textDecoration: 'none',
                                color: 'inherit',
                            }}
                        >
                            Home
                        </Typography>
                    )}
                </Box>
                <Box
                    onClick={() => router.push('/entrada-de-datos')}
                    component="div"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isDrawerOpen ? 'flex-start' : 'center',
                        padding: '10px',
                        backgroundColor: isActive('/entrada-de-datos') ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        textDecoration: 'none',
                    }}
                >
                    <IconButton>
                        <SettingsIcon />
                    </IconButton>
                    {isDrawerOpen && (
                        <Typography
                            sx={{
                                marginLeft: 1,
                                textDecoration: 'none', 
                                color: 'inherit', 
                            }}
                        >
                            Settings
                        </Typography>
                    )}
                </Box>
            </Box>
        </>
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
