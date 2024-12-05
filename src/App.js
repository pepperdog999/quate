import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuoteDisplay from './components/QuoteDisplay';
import Admin from './components/Admin';
import { Box } from '@mui/material';

function App() {
    return (
        <Router>
            <Box>
                <Routes>
                    <Route path="/" element={<QuoteDisplay />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </Box>
        </Router>
    );
}

export default App; 