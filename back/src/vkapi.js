import axios from 'axios';

const accessToken = '*';

const createCandidate = async (candidateData) => {
  console.log("Запуск функции createCandidate");
  try {
    const response = await axios.post(
      "http://localhost:3000/candidates",
      candidateData
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при создании кандидата:", error);
    throw error;
  }
};

const getCandidateDataFromVK = async (userId) => { 
  try {
    const response = await axios.get(`https://api.vk.com/method/users.get?user_ids=${userId}&fields=domain,occupation,contacts&access_token=${accessToken}&v=5.199`);
    
    if (!response.data.response || response.data.response.length === 0) {
      throw new Error('Данные о пользователе не найдены');
    }
    
    const userData = response.data.response[0];
    
    const occupation = userData.occupation || {};
    const educationType = occupation.type === 'university' ? 'Высшее образование' : (occupation.type === 'school' ? 'Среднее образование' : 'Не указано');
    const educationPlace = occupation.name || 'Не указано';
    
    const candidateData = {
      flmname: `${userData.first_name} ${userData.last_name}`,
      linkVK: `https://vk.com/id${userData.id}`,
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
