import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import axios from 'axios';
import TitleBar from './TitleBar';
import { API_BASE_URL } from '../config';

function QuoteDisplay() {
    const [quote, setQuote] = useState(null);
    const [nextQuote, setNextQuote] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const FADE_DURATION = 1000; // 渐变动画时间（1秒）
    const DISPLAY_DURATION = 6000; // 显示时间（6秒）

    // 预加载下一条名言
    const fetchNextQuote = useCallback(async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/quotes/random`);
            return response.data;
        } catch (error) {
            console.error('获取名言失败:', error);
            return null;
        }
    }, []);

    // 切换显示
    const switchQuote = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            // 1. 淡出当前名言
            setIsVisible(false);

            // 2. 等待淡出动画完成
            await new Promise(resolve => setTimeout(resolve, FADE_DURATION));

            // 3. 如果有预加载的名言，使用它；否则获取新的
            if (nextQuote) {
                setQuote(nextQuote);
            }

            // 4. 预加载下一条名言
            const next = await fetchNextQuote();
            setNextQuote(next);

            // 5. 淡入新名言
            setIsVisible(true);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, nextQuote, fetchNextQuote]);

    // 初始加载
    useEffect(() => {
        const initQuotes = async () => {
            const firstQuote = await fetchNextQuote();
            setQuote(firstQuote);
            setIsVisible(true);
            const secondQuote = await fetchNextQuote();
            setNextQuote(secondQuote);
        };

        initQuotes();
    }, [fetchNextQuote]);

    // 定时切换
    useEffect(() => {
        const timer = setInterval(switchQuote, DISPLAY_DURATION);
        return () => clearInterval(timer);
    }, [switchQuote]);

    return (
        <>
            <TitleBar title="每日名言" showSettingsButton={true} />
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #f5f5f7 0%, #e8e8e8 100%)',
                    pt: 8,
                    px: 2
                }}
            >
                <Paper
                    elevation={8}
                    sx={{
                        p: { xs: 4, md: 8 },
                        maxWidth: '900px',
                        width: '100%',
                        textAlign: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '24px',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 12px 48px 0 rgba(31, 38, 135, 0.2)',
                        },
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '6px',
                            background: 'linear-gradient(90deg, #007FFF 0%, #0059B2 100%)'
                        }
                    }}
                >
                    <Box
                        sx={{
                            opacity: isVisible ? 1 : 0,
                            transition: `opacity ${FADE_DURATION}ms ease-in-out`,
                            minHeight: '200px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    >
                        {quote ? (
                            <>
                                <Typography 
                                    variant="h4" 
                                    component="div" 
                                    sx={{ 
                                        mb: 5,
                                        fontWeight: 300,
                                        lineHeight: 1.8,
                                        color: '#1a1a1a',
                                        fontFamily: '"Noto Serif SC", serif',
                                        fontSize: { xs: '1.5rem', md: '2.2rem' },
                                        letterSpacing: '0.02em',
                                        position: 'relative',
                                        '&::before': {
                                            content: '"\\201C"',
                                            position: 'absolute',
                                            left: -20,
                                            top: -20,
                                            fontSize: '4rem',
                                            color: 'rgba(0,0,0,0.1)',
                                            fontFamily: 'serif'
                                        },
                                        '&::after': {
                                            content: '"\\201D"',
                                            position: 'absolute',
                                            right: -20,
                                            bottom: -60,
                                            fontSize: '4rem',
                                            color: 'rgba(0,0,0,0.1)',
                                            fontFamily: 'serif'
                                        }
                                    }}
                                >
                                    {quote.content}
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        mt: 4,
                                        borderTop: '1px solid rgba(0,0,0,0.08)',
                                        pt: 3
                                    }}
                                >
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                            fontWeight: 400,
                                            color: '#666',
                                            fontStyle: 'italic',
                                            fontSize: { xs: '1.1rem', md: '1.3rem' },
                                            '&::before': {
                                                content: '"——"',
                                                marginRight: '8px',
                                                color: '#999'
                                            }
                                        }}
                                    >
                                        {quote.author}
                                    </Typography>
                                </Box>
                            </>
                        ) : (
                            <Typography>加载中...</Typography>
                        )}
                    </Box>
                </Paper>
            </Box>
        </>
    );
}

export default QuoteDisplay; 