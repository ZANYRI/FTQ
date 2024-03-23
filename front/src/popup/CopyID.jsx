import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { sendUserIdToVK } from '../axios/request.js'; 

const CopyID = () => {
  const [extractedId, setExtractedId] = useState('');

  const handleClick = async () => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, async tabs => {
      if (tabs && tabs.length > 0 && tabs[0].url) {
        const url = tabs[0].url;
        const regex = /(?:https?:\/\/)?vk.com\/(.*)/;
        const match = url.match(regex);
        if (match && match[1]) {
          const userId = match[1];
          setExtractedId(userId); 
          try {
            const response = await sendUserIdToVK(userId);
            console.log('Ответ от сервера:', response);
          } catch (error) {
            console.error('Ошибка при отправке userId в /vk:', error);
          }
        } else {
          console.error('URL текущей вкладки не содержит vk.com');
        }
      } else {
        console.error('Невозможно получить URL текущей вкладки');
      }
    });
  };

  return (
    <div>
      <a href="../table/table.html" target="_blank" rel="noopener noreferrer">Таблица</a>
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
        {extractedId ? `Отправить ID пользователя ${extractedId} на сервер` : 'Получить ID пользователя VK'}
      </Box>
    </div>
  );
};

export default CopyID;
