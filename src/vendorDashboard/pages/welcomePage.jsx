import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
const WelcomePage = () => {
    const navigate = useNavigate();
    const handleGoToDashboard = () => {
    navigate('/dashboard'); 
  };
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1976d2 30%, #42a5f5 90%)',
        color: '#fff',
        textAlign: 'center',
        p: 3,
      }}
    >
      <DashboardIcon sx={{ fontSize: 80, mb: 2 }} />

      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Welcome to  sweegy vendor please login or register
      </Typography>

      <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
        Manage your data, track progress, and explore insights in one place.
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={handleGoToDashboard}
        sx={{
          borderRadius: '30px',
          px: 4,
          py: 1.2,
          fontWeight: 'bold',
          textTransform: 'none',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          '&:hover': {
            boxShadow: '0 6px 14px rgba(0,0,0,0.25)',
          },
        }}
      >
        Go to login or register 
      </Button>
    </Box>
  );
};

export default WelcomePage;
