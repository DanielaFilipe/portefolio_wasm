import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import pool from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// testar ligação ao MySQL (sem top-level await)
(async () => {
  try {
    const [rows] = await pool.query('SELECT 1 AS result');
    console.log('MySQL ligado, teste =', rows[0].result);
  } catch (err) {
    console.error('Erro a ligar ao MySQL:', err.message);
  }
})();

// rota do estudante
app.use('/api/student', studentRoutes);

// middleware de erro genérico
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erro interno' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API a correr em http://localhost:${PORT}`);
});
