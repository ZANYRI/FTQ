import express from 'express';
import { sequelize, Candidate } from './db.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Middleware для обработки CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Замените на адрес вашего клиентского приложения
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.findAll();
    res.json(candidates);
  } catch (error) {
    console.error('Ошибка при получении кандидатов:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.post('/candidates', async (req, res) => {
  const { flmname, linkVK, education, phoneNumber } = req.body;
  try {
    const newCandidate = await Candidate.create({ flmname, linkVK, education, phoneNumber });
    res.json(newCandidate);
  } catch (error) {
    console.error('Ошибка при создании кандидата:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.put('/candidates/:id', async (req, res) => {
  const candidateId = req.params.id;
  const { flmname, linkVK, education, phoneNumber } = req.body;
  try {
    const candidate = await Candidate.findByPk(candidateId);
    if (!candidate) {
      return res.status(404).json({ error: 'Кандидат не найден' });
    }
    candidate.flmname = flmname;
    candidate.linkVK = linkVK;
    candidate.education = education;
    candidate.phoneNumber = phoneNumber;
    await candidate.save();
    res.json(candidate);
  } catch (error) {
    console.error('Ошибка при обновлении кандидата:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.delete('/candidates/:id', async (req, res) => {
  const candidateId = req.params.id;
  try {
    const candidate = await Candidate.findByPk(candidateId);
    if (!candidate) {
      return res.status(404).json({ error: 'Кандидат не найден' });
    }
    await candidate.destroy();
    res.json({ message: `Кандидат с id ${candidateId} удален` });
  } catch (error) {
    console.error('Ошибка при удалении кандидата:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Ошибка подключения к базе данных:', error);
  });
