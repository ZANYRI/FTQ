import React, { useState } from 'react';
import { Box, Button, Input, Table, Tbody, Tr, Td } from '@chakra-ui/react';
import { sendUserIdToVK, updateCandidate } from '../axios/request.js';

const CopyID = () => {
  const [extractedId, setExtractedId] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [userData, setUserData] = useState(null);
  const [editedUserData, setEditedUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = async () => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, async (tabs) => {
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
            setShowTable(true);
            setUserData(response);
            setEditedUserData({ ...response });
          } catch (error) {
            if (error.response && error.response.status === 500) {
              setErrorMessage('Пользователь с такой ссылкой VK уже существует.');
            } else {
              console.error('Ошибка при отправке userId в /vk:', error);
            }
          }
        } else {
          console.error('URL текущей вкладки не содержит vk.com');
        }
      } else {
        console.error('Невозможно получить URL текущей вкладки');
      }
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateCandidate(userData.id, editedUserData);
      console.log('Данные кандидата успешно обновлены');
    } catch (error) {
      console.error('Ошибка при обновлении данных кандидата:', error);
    }
  };

  const handleOpenTable = () => {
    window.open('../table/table.html', '_blank');
  };

  return (
    <div>
      <Button onClick={handleClick} bg="blue.500" color="white" mr={4}>
        Отправить ID на сервер
      </Button>
      <Button onClick={handleOpenTable} bg="green.500" color="white" mr={4}>
        Открыть таблицу
      </Button>
      {showTable && userData && (
        <Box mt={4}>
          {errorMessage && (
            <p style={{ color: 'red' }}>{errorMessage}</p>
          )}
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>Имя:</Td>
                <Td><Input name="flmname" value={editedUserData.flmname} onChange={handleChange} /></Td>
              </Tr>
              <Tr>
                <Td>Ссылка VK:</Td>
                <Td>{userData.linkVK}</Td>
              </Tr>
              <Tr>
                <Td>Образование:</Td>
                <Td><Input name="education" value={editedUserData.education} onChange={handleChange} /></Td>
              </Tr>
              <Tr>
                <Td>Номер телефона:</Td>
                <Td><Input name="phoneNumber" value={editedUserData.phoneNumber} onChange={handleChange} /></Td>
              </Tr>
            </Tbody>
          </Table>
          <Button onClick={handleSave}>Сохранить</Button>
        </Box>
      )}
    </div>
  );
};

export default CopyID;
