import React, { useState } from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import Navbar from '../organisms/Navbar';
import Sidebar from '../organisms/Sidebar';
import Breadcrumb from '../organisms/Breadcrumb';

const drawerWidth = 240;
const collapsedDrawerWidth = 90;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleDrawer = () => {
        if (isSmallScreen) {
            setMobileOpen(!mobileOpen);
        } else {
            setIsDrawerOpen(!isDrawerOpen);
        }
    };

    return (
        <Grid container sx={{ height: '100vh' }}>
            {/* Sidebar */}
            <Sidebar
                isDrawerOpen={isDrawerOpen}
                drawerWidth={drawerWidth}
                collapsedDrawerWidth={collapsedDrawerWidth}
                isSmallScreen={isSmallScreen}
                toggleDrawer={toggleDrawer}
                mobileOpen={mobileOpen}
            />

            {/* Main Content */}
            <Grid item xs sx={{ flexGrow: 1 }}>
                {/* Navbar */}
                <Navbar
                    toggleDrawer={toggleDrawer}
                    isDrawerOpen={isDrawerOpen}
                    drawerWidth={drawerWidth}
                    collapsedDrawerWidth={collapsedDrawerWidth}
                    isSmallScreen={isSmallScreen}
                /> 
                {/* Page Content */}
                <Grid  sx={{ padding: 2, paddingBottom: 1 , marginTop: '64px' }}>
                    <Breadcrumb /> 
                </Grid>
                {/* Page Content */}
                <Grid >
                    {children}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MainLayout;
