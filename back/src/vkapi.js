import axios from 'axios';
import { createCandidate } from './reqser.js';
import { Candidate } from './db.js';
import yaml from 'js-yaml';
import fs from 'fs';

const config = yaml.load(fs.readFileSync('config.yaml', 'utf8'));
const accessToken = config.accessToken;



const getCandidateDataFromVK = async (userId) => { 
  try {
    const response = await axios.get(`https://api.vk.com/method/users.get?user_ids=${userId}&fields=domain,occupation,contacts&access_token=${accessToken}&v=5.199`);
    console.log('Данные о пользователе из VK API:', response.data);
    if (!response.data.response || response.data.response.length === 0) {
      throw new Error('Данные о пользователе не найдены');
    }
    
    const userData = response.data.response[0];
    
    const occupation = userData.occupation || {};
    const educationType = occupation.type === 'university' ? 'Высшее образование' : (occupation.type === 'school' ? 'Среднее образование' : 'Не указано');
    const educationPlace = occupation.name || 'Не указано';
    
    const linkVK = `https://vk.com/id${userData.id}`;
    
    const existingCandidate = await Candidate.findOne({ where: { linkVK } });
    if (existingCandidate) {
      throw new Error('Пользователь с подобной ссылкой ВКонтакте уже существует');
    }
    
    const candidateData = {
      flmname: `${userData.first_name} ${userData.last_name}`,
      linkVK,
      education: `${educationType}: ${educationPlace}`,
      phoneNumber: userData.mobile_phone || 'Не указан',
    };
    
    const savedCandidate = await createCandidate(candidateData);
    
    return savedCandidate;
  } catch (error) {
    console.error('Ошибка при получении данных из VK API:', error);
    throw error;
  }
};

export { getCandidateDataFromVK };
