const db = require('../config/db');
const bcrypt = require('bcrypt');

const page = {
    about:(req,res)=>{
        res.render('about');
    },
    service:(req,res)=>{
        res.render('Service');
    },
    pricing:(req,res)=>{
        res.render('pricing');
    },
    home:(req,res)=>{
        res.render('index');
    },
    contact:(req,res)=>{
        res.render('contact');
    },
    blog:(req,res)=>{
        res.render('blogs');
    },
    blog2:(req,res)=>{
        res.render('blogD');
    },
    team:(req,res)=>{
        res.render('team');
    },
    app:(req,res)=>{
        res.render('appointment');
    },
    com:(req,res)=>{
        res.render('comment');
    },
    search:(req,res)=>{
        res.render('search');
    }
};
module.exports = page;