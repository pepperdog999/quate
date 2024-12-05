import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

function TitleBar({ title, showHomeButton = false, showSettingsButton = false }) {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: 'rgba(33, 33, 33, 0.98)' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
                <Box>
                    {showHomeButton && (
                        <IconButton
                            component={Link}
                            to="/"
                            color="inherit"
                            sx={{ mr: 1 }}
                        >
                            <HomeIcon />
                        </IconButton>
                    )}
                    {showSettingsButton && (
                        <IconButton
                            component={Link}
                            to="/admin"
                            color="inherit"
                        >
                            <SettingsIcon />
                        </IconButton>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default TitleBar; 