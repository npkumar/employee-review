import express from 'express';
import connectDB from './config/db.js';
import { resolve } from 'path';
import userRoutes from './routes/api/users.js';
import authRoutes from './routes/api/auth.js';
import employeeRoutes from './routes/api/employee.js';
import reviewRoutes from './routes/api/reviews.js';

const app = express();

// Connect to Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/reviews', reviewRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
