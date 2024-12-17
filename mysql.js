const mysql = require('mysql2');

// 创建数据库连接池
const pool = mysql.createPool({
    host: 'localhost', // 例如 'localhost'
    user: 'root',            // 例如 'root'
    password: '123456',          // 例如 'password'
    database: 'work_test',          // 你要连接的数据库名称
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 获取连接并执行操作
pool.getConnection((err, connection) => {
    if (err) {
        console.error('获取连接失败: ' + err.stack);
        return;
    }

    // 连接到数据库
    connection.connect((err) => {
        if (err) {
            console.error('连接数据库失败: ' + err.stack);
            return;
        }
        console.log('成功连接到数据库，ID: ' + connection.threadId);
    });

    // 查询数据
    const query = 'SELECT * FROM students';

    connection.query(query, (err, results, fields) => {
        if (err) {
            console.error('查询失败: ' + err.stack);
            return;
        }
        console.log('查询结果: ', results);

        // 释放连接
        connection.release();
    });

    // 监听连接错误事件
    connection.on('error', (err) => {
        console.error('数据库连接错误: ' + err.stack);
        return;
    });
});

// 关闭连接池
// pool.end((err) => {
//     if (err) {
//         console.error('关闭连接池失败: ' + err.stack);
//         return;
//     }
//     console.log('连接池已关闭');
// });
