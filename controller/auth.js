const db = require('../config/db');
const User = require('../model/userMod.js');
const bcrypt = require('bcrypt');


const log = {
    login: (req, res) => {
        res.render('login');
    },

    handleLogin: (req, res) => {
        const { username, password } = req.body;
    
        console.log('Fetching user by username...');
        User.findByUsername(username, (err, user) => {
            if (err) {
                console.error('Error while fetching user:', err);
                return res.status(500).send('Internal Server Error');
            }
    
            if (!user) {
                console.log('Invalid username or password.');
                return res.status(401).send('Invalid username or password');
            }
    
            console.log('Comparing passwords...');
            bcrypt.compare(password, user.password_hash, (compareErr, isMatch) => {
                if (compareErr) {
                    console.error('Error while comparing passwords:', compareErr);
                    return res.status(500).send('Internal Server Error');
                }
    
                if (!isMatch) {
                    console.log('Invalid username or password.');
                    return res.status(401).send('Invalid  or password');
                }
    
                console.log('Login successful. Redirecting to /home...');
                res.redirect('/home');
            });
        });
    },
    
    registerPage: (req, res) => {
        res.render('register');
    },

    register: (req, res) => {
        const { username, password, firstName, lastName, role } = req.body;
    
        console.log('Checking if username already exists...');
        User.findByUsername(username, (err, existingUser) => {
            if (err) {
                console.error('Error while checking username:', err);
                return res.status(500).send('Internal Server Error');
            }
    
            if (existingUser) {
                console.log('Username is already taken.');
                return res.status(400).send('Username is already taken');
            }
    
            console.log('Hashing password...');
            bcrypt.hash(password, 10, (hashErr, password_hash) => {
                if (hashErr) {
                    console.error('Error while hashing password:', hashErr);
                    return res.status(500).send('Internal Server Error');
                }
    
                console.log('Inserting new user into database...');
                const newUser = {
                    username,
                    password_hash,
                    first_name: firstName,
                    last_name: lastName,
                    role
                };
    
                User.insertUser(newUser, (insertErr) => {
                    if (insertErr) {
                        console.error('Error while inserting user:', insertErr);
                        return res.status(500).send('Internal Server Error');
                    }
    
                    console.log('User registered successfully!');
                    res.redirect('/');
                });
            });
        });
    }
    
    
    
};


module.exports = log;