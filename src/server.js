const express = require('express');

// Route controllers
const usersController = require('./controllers/usersController');
const postsController = require('./controllers/postsController');

// Initialize express
const app = express();

// Initialize port
const port = process.env.PORT || 5000;

// Utility middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/users', usersController) 
app.use('/posts', postsController) 

app.listen(port, ()=>console.log(`Server successfully started on port ${port}`));
