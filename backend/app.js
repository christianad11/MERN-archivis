import express from 'express';
import cors from 'cors';
import { authRoutes } from './routes/auth.routes.js';
import { collectionRoutes } from './routes/collection.routes.js';
import itemRoutes from './routes/item.routes.js'; // Import item routes

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // For file uploads

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/items', itemRoutes); // Mount item routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export { app };