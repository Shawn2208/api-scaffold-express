const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enables CORS with various options
app.use(helmet()); // Helps secure your apps by setting various HTTP headers
app.use(morgan('dev')); // HTTP request logger
app.use(express.json()); // Body parser for JSON payloads

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Error handler middleware
app.use(errorHandler);

module.exports = app;
