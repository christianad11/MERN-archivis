import dotenv from 'dotenv';
import { app } from './app.js';
import { connectDB } from './utils/db.js';

import EventEmitter from 'events';
EventEmitter.defaultMaxListeners = 15;

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});