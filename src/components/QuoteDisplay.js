import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import axios from 'axios';
import TitleBar from './TitleBar';
import { API_BASE_URL } from '../config';

function QuoteDisplay() {
    const [quote, setQuote] = useState(null);

    const fetchRandomQuote = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/quotes/random`);
            setQuote(response.data);
        } catch (error) {
            console.error('获取名言失败:', error);
        }
    };

    useEffect(() => {
        fetchRandomQuote();
    }, []);

    return (
        <>
            <TitleBar title="每日名言" showSettingsButton={true} />
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f7',
                    pt: 8
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 6,
                        maxWidth: '800px',
                        textAlign: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '15px',
                        mx: 2
                    }}
                >
                    {quote ? (
                        <>
                            <Typography 
                                variant="h4" 
                                component="div" 
                                sx={{ 
                                    mb: 3,
                                    fontWeight: 300,
                                    lineHeight: 1.5
                                }}
                            >
                                "{quote.content}"
                            </Typography>
                            <Typography 
                                variant="h6" 
                                color="text.secondary"
                                sx={{ fontWeight: 400 }}
                            >
                                —— {quote.author}
                            </Typography>
                        </>
                    ) : (
                        <Typography>加载中...</Typography>
                    )}
                </Paper>
            </Box>
        </>
    );
}

export default QuoteDisplay; 