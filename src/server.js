const express = require('express');

// Route controllers
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

// Initialize express
const app = express();

// Initialize port
const port = process.env.PORT || 5000;

// Utility middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server successfully started on port ${port}`));
