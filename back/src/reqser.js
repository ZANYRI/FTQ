import axios from "axios";


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


export { createCandidate };
