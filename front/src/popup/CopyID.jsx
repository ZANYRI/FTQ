import React from 'react';
import { Box } from '@chakra-ui/react';
import { sendUserIdToVK } from '../axios/request.js'; 

const CopyID = () => {
  const handleClick = async () => {
    const url = window.location.href;

    const regex = /vk.com\/(?:[^/]+\/)?(?:id|public|club)?(\d+)/;
    const match = url.match(regex);

    if (match) {
      const userId = match[1];
      console.log('ID пользователя VK:', userId);

      try {
        const response = await sendUserIdToVK(userId);
        console.log('Ответ от сервера:', response);
      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
      }
    } else {
      console.log('ID пользователя VK не найден');
    }
  };

  return (
    <Box
      as="button"
      type="button"
      aria-label="Получить ID пользователя VK"
      onClick={handleClick}
      bg="blue.500"
      color="white"
      p={4}
      borderRadius="md"
      cursor="pointer"
    >
      Добавить
    </Box>
  );
};

export default CopyID;
