const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// 获取随机名言
app.get('/api/quotes/random', (req, res) => {
    db.get('SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1', (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

// 获取所有名言（带分页）
app.get('/api/quotes', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    // 首先获取总条数
    db.get('SELECT COUNT(*) as total FROM quotes', (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        // 然后获取当前页数据
        db.all(
            'SELECT * FROM quotes ORDER BY created_at DESC LIMIT ? OFFSET ?',
            [pageSize, offset],
            (err, rows) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.json({
                    total: row.total,
                    data: rows,
                    page,
                    pageSize,
                    totalPages: Math.ceil(row.total / pageSize)
                });
            }
        );
    });
});

// 添加新名言
app.post('/api/quotes', (req, res) => {
    const { content, author } = req.body;
    db.run('INSERT INTO quotes (content, author) VALUES (?, ?)',
        [content, author],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID });
        }
    );
});

// 删除名言
app.delete('/api/quotes/:id', (req, res) => {
    db.run('DELETE FROM quotes WHERE id = ?', req.params.id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "删除成功" });
    });
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
}); 