const express = require('express');

// Route controllers
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const indexController = require('./controllers/indexController');
const graphqlController = require('./controllers/graphqlController');

// Initialize express
const app = express();

// Initialize port
const port = process.env.PORT || 5000;

// Utility middlewares
app.use(express.json({ extended: false }));
// app.use(express.urlencoded());

// Routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/', indexController);
app.use('/graphql', graphqlController);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server successfully started on port ${port}`));
