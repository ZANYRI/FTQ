import axios from "axios";

const fetchCandidates = async () => {
  console.log("Запуск...");
  try {
    const response = await axios.get("http://localhost:3000/candidates");
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных о кандидатах:", error);
    return [];
  }
};

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

const updateCandidate = async (id, candidateData) => {
  console.log("Запуск функции updateCandidate");
  try {
    const response = await axios.patch( 
      `http://localhost:3000/candidates/${id}`,
      candidateData
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении кандидата:", error);
    throw error;
  }
};


const deleteCandidate = async (id) => {
  console.log("Запуск функции deleteCandidate");
  try {
    const response = await axios.delete(
      `http://localhost:3000/candidates/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при удалении кандидата:", error);
    throw error;
  }
};


const sendUserIdToVK = async (userId) => {
  console.log("Отправка userId в /vk");
  try {
    const response = await axios.post("http://localhost:3000/vk", { userId });
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке userId в /vk:", error);
    throw error;
  }
};

export { fetchCandidates, createCandidate,updateCandidate, deleteCandidate, sendUserIdToVK };
