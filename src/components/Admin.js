import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Typography,
    Pagination,
    Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import TitleBar from './TitleBar';
import { API_BASE_URL } from '../config';

function Admin() {
    const [quotes, setQuotes] = useState([]);
    const [newQuote, setNewQuote] = useState({ content: '', author: '' });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = parseInt(process.env.REACT_APP_PAGE_SIZE) || 10;

    const fetchQuotes = async (currentPage) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/quotes`, {
                params: {
                    page: currentPage,
                    pageSize
                }
            });
            setQuotes(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('获取名言列表失败:', error);
        }
    };

    useEffect(() => {
        fetchQuotes(page);
    }, [page]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/api/quotes`, newQuote);
            setNewQuote({ content: '', author: '' });
            fetchQuotes(1); // 添加成功后返回第一页
            setPage(1);
            alert('名言添加成功！');
        } catch (error) {
            console.error('添加名言失败:', error);
            alert('添加失败：' + error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/quotes/${id}`);
            fetchQuotes(page);
        } catch (error) {
            console.error('删除名言失败:', error);
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <>
            <TitleBar title="名言管理" showHomeButton={true} />
            <Box sx={{ 
                p: 3, 
                maxWidth: 800, 
                mx: 'auto',
                pt: 10
            }}>
                <Paper sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h5" sx={{ mb: 3 }}>添加新名言</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="名言内容"
                            value={newQuote.content}
                            onChange={(e) => setNewQuote({ ...newQuote, content: e.target.value })}
                            sx={{ mb: 2 }}
                            required
                        />
                        <TextField
                            fullWidth
                            label="作者"
                            value={newQuote.author}
                            onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
                            sx={{ mb: 2 }}
                            required
                        />
                        <Button variant="contained" type="submit">
                            添加
                        </Button>
                    </form>
                </Paper>

                <Paper sx={{ p: 3 }}>
                    <Typography variant="h5" sx={{ mb: 3 }}>名言列表</Typography>
                    <List>
                        {quotes.map((quote) => (
                            <ListItem key={quote.id}>
                                <ListItemText
                                    primary={quote.content}
                                    secondary={`作者: ${quote.author}`}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton 
                                        edge="end" 
                                        onClick={() => handleDelete(quote.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                    <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
                        <Pagination 
                            count={totalPages} 
                            page={page} 
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Stack>
                </Paper>
            </Box>
        </>
    );
}

export default Admin; 