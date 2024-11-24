const express = require('express');
const router = express.Router();
const page = require ('../controller/User');
const log = require ('../controller/auth');

router.get('/', log.login)
router.get('/home', page.home)
router.get('/aboutUs', page.about)
router.get('/service', page.service)
router.get('/pricing', page.pricing)
router.get('/contactUs', page.contact)
router.get('/blogs', page.blog)
router.get('/blogDetail', page.blog2)
router.get('/myTeam', page.team)
router.get('/appointment', page.app)
router.get('/comments', page.com)
router.get('/search', page.search)
router.get('/Register', log.registerPage); // Registration page

router.post('/login', log.handleLogin); // Handle login
router.post('/register', log.register); // Handle registration

module.exports = router;