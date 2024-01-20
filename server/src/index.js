import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import itemRouter from './routes/itemRouter.js';
import userRouter from './routes/userRouter.js';
import roleRouter from './routes/roleRouter.js'

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Use morgan for logging
app.use(morgan('dev'));

// Enable CORS
app.use(cors());

app.get('/', async (req, res, next) => {
  return res.status(200).send({ msg: 'This part is OK' });
});

// Routers
app.use('/api/v1/item', itemRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/role', roleRouter);

// Not Found
app.use((req, res, next) => {
  return next(createError.NotFound());
});

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    success: false,
    message: err.message,
  });
});

app.listen(port, async () => {
  console.log(`[*] Server Running on Port ${port}`);
});