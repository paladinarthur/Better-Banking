import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import userRoutes from './routes/user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5175', 'http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: false,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Routes - Make sure these come before any other routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Other routes below
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'auth.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok',
        time: new Date().toISOString(),
        message: 'Server is running'
    });
});

// Loan rates endpoint
app.get("/api/loan-rates", (req, res) => {
    const loanRates = [
        { cibil: ">800", salaried: "9.00%", selfEmployed: "9.00%" },
        { cibil: "750-800", salaried: "9.00%", selfEmployed: "9.10%" },
        { slab: "Up to ₹ 35 lakhs", salaried: "9.25% - 9.65%", selfEmployed: "9.40% - 9.80%" },
        { slab: "₹ 35 lakhs to ₹ 75 lakhs", salaried: "9.50% - 9.80%", selfEmployed: "9.65% - 9.95%" },
        { slab: "Above ₹ 75 lakhs", salaried: "9.60% - 9.90%", selfEmployed: "9.75% - 10.05%" },
    ];
    res.json(loanRates);
});

// Connect to MongoDB
connectDB().then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port localhost:${PORT}`)); 