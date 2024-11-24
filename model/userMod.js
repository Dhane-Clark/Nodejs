const db = require('../config/db');

const User = {
    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], (err, rows) => {
            if (err) return callback(err);
            callback(null, rows[0]); // Return the first result or null
        });
    },
    insertUser: (userData, callback) => {
        const { username, password_hash, first_name, last_name, role } = userData;
        const query = `
            INSERT INTO users (username, password_hash, first_name, last_name, role, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, NOW(), NOW())
        `;
        db.query(query, [username, password_hash, first_name, last_name, role], callback);
    },
    insertLoginRecord: (userId, ip, userAgent, callback) => {
        const query = `
            INSERT INTO login_logs (user_id, ip_address, user_agent, logged_at) 
            VALUES (?, ?, ?, NOW())
        `;
    
        db.query(query, [userId, ip, userAgent], (err, results) => {
            if (err) {
                console.error('Error inserting login record:', err);
                return callback(err); // Pass the error to the callback
            }
    
            console.log('Login record inserted successfully:', results);
            callback(null, results); // No error, pass the results to the callback
        });
    }
    
};

module.exports = User;
