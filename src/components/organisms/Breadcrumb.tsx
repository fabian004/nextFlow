import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';

const Breadcrumb: React.FC = () => {
    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginTop: 2, marginBottom: 2 }}>
            <Link underline="hover" color="inherit" href="/">
                Home
            </Link>
            <Link underline="hover" color="inherit" href="/dashboard">
                Dashboard
            </Link>
            <Typography color="text.primary">Current Page</Typography>
        </Breadcrumbs>
    );
};

export default Breadcrumb;
