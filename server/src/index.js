import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 8080;
const prisma = new PrismaClient();

app.listen(port, async () => {
  await prisma.$connect();
  console.log(`[*] Server Running on Port ${port}`);
});