import express from 'express';
import { sequelize, Candidate } from './db.js';
import { getCandidateDataFromVK } from './vkapi.js';
import cors from 'cors';


const app = express();
const PORT = 3000;

app.use(express.json());


app.use(cors())



app.post('/vk', async (req, res) => {
  const userId = req.body.userId;
  try {
    const userData = await getCandidateDataFromVK(userId);
    res.json(userData);
  } catch (error) {
    console.error('Ошибка при получении данных из VK API:', error);
    res.status(500).json({ error: 'Произошла ошибка при получении данных из VK API' });
  }
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

app.patch('/candidates/:id', async (req, res) => {
  const candidateId = req.params.id;
  const { flmname, linkVK, education, phoneNumber } = req.body;
  try {
    const candidate = await Candidate.findByPk(candidateId);
    if (!candidate) {
      return res.status(404).json({ error: 'Кандидат не найден' });
    }
    if (flmname) candidate.flmname = flmname;
    if (linkVK) candidate.linkVK = linkVK;
    if (education) candidate.education = education;
    if (phoneNumber) candidate.phoneNumber = phoneNumber;
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
    const candidate = await Candidate.findByPk(Number(candidateId));
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
