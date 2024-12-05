const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'quotes.db'), (err) => {
    if (err) {
        console.error('数据库连接失败:', err.message);
    } else {
        console.log('成功连接到数据库');
        createTable();
    }
});

function createTable() {
    db.run(`CREATE TABLE IF NOT EXISTS quotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        author TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
}

module.exports = db; 