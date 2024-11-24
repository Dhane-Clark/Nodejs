const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const app = express();

// Middleware
app.use(cors());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', userRoutes)
app.use(express.static('public'));

// Server setup
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
