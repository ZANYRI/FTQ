import React, { useState } from 'react';
import { Box, Button, Input, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { sendUserIdToVK, getMaxCandidate, updateCandidate } from '../axios/request.js';

const CopyID = () => {
  const [extractedId, setExtractedId] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [userData, setUserData] = useState(null);
  const [editedUserData, setEditedUserData] = useState(null);

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
            const maxCandidate = await getMaxCandidate();
            setUserData(maxCandidate);
            setEditedUserData({ ...maxCandidate });
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

  const handleOpenTable = () => {
    window.open('../table/table.html', '_blank');
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
      // Можно добавить обновление данных на UI, если нужно
    } catch (error) {
      console.error('Ошибка при обновлении данных кандидата:', error);
    }
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
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Имя</Th>
                <Th>Ссылка VK</Th>
                <Th>Образование</Th>
                <Th>Номер телефона</Th>
                <Th>Действия</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Input name="flmname" value={editedUserData.flmname} onChange={handleChange} readOnly />
                </Td>
                <Td>{userData.linkVK}</Td>
                <Td>
                  <Input name="education" value={editedUserData.education} onChange={handleChange} />
                </Td>
                <Td>
                  <Input name="phoneNumber" value={editedUserData.phoneNumber} onChange={handleChange} />
                </Td>
                <Td>
                  <Button onClick={handleSave}>Сохранить</Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      )}
    </div>
  );
};

export default CopyID;
