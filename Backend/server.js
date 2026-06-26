import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import internshipRoutes from './routes/internships.js';
import copilotRoutes from './routes/copilot.js';
import resumeRoutes from './routes/resumes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/copilot', copilotRoutes);
app.use('/api/resumes', resumeRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'HireHub backend is running cleanly without databases!' });
});

app.use('/', (req, res) => {
  res.status(404).json({ message: 'API Route Not Found' });
});

app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`🚀 HireHub Backend Server is running!`);
  console.log(`📡 Listening on port: ${PORT}`);
  console.log(`🔒 Data storage: Local JSON Files`);
  console.log(`========================================`);
});
