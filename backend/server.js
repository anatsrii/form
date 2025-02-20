const express = require('express');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const auth = require('./middleware/authMiddleware');
const customerRoutes = require('./routes/customerRoutes.js');
const companyRoutes = require('./routes/companyRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const documentRoutes = require('./routes/documentRoutes.js');

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Set port with fallback
const port = process.env.PORT;

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
app.use('/api/company', auth, companyRoutes);
app.use('/api/user', userRoutes);
app.use('/api/customer', auth, customerRoutes);
app.use('/api/product', auth, productRoutes);
app.use('/api/document', auth, documentRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
