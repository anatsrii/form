const express = require('express');
const pool = require('./config/dbConnect');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Set port with fallback
const port = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/user', userRoutes);

// Start server with database connection check
const startServer = async () => {
    try {
        // Test database connection
        const client = await pool.connect();
        console.log('Database connected successfully');
        client.release();

        // Start server
        app.listen(port, () => {
            console.log('Environment Information:');
            console.log('Current Directory:', path.resolve(__dirname));
            console.log('Port:', port);
            console.log('Frontend URL:', process.env.FRONTEND_URL);
            console.log('Database Host:', process.env.DB_HOST);
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Server startup failed:', error);
        process.exit(1);
    }
};

startServer();