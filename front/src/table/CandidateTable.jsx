import React, { useEffect, useState } from "react";
import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { fetchCandidates, createCandidate, updateCandidate, deleteCandidate, updateCandidateData } from "../axios/request";
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";

const columns = [
  {
    accessorKey: "flmname",
    header: "ФИО",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "linkVK",
    header: "Ссылка ВК",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "education",
    header: "Образование",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "phoneNumber",
    header: "Номер телефона",
    cell: (props) => <p>{props.getValue()}</p>,
  },
];

const CandidateTable = () => {
  const [candidates, setCandidates] = useState([]);
  const [isNewCandidateModalOpen, setIsNewCandidateModalOpen] = useState(false);
  const [isEditCandidateModalOpen, setIsEditCandidateModalOpen] = useState(false); 
  const [newCandidateData, setNewCandidateData] = useState({
    flmname: "",
    linkVK: "",
    education: "",
    phoneNumber: ""
  });
  const [editCandidateData, setEditCandidateData] = useState({}); 

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCandidates();
      setCandidates(data);
    };

    fetchData();
  }, []);

  const handleOpenNewCandidateModal = () => {
    setIsNewCandidateModalOpen(true);
  };

  const handleCloseNewCandidateModal = () => {
    setIsNewCandidateModalOpen(false);
  };

  const handleOpenEditCandidateModal = (candidate) => { 
    setIsEditCandidateModalOpen(true);
    setEditCandidateData(candidate); 
  };

  const handleCloseEditCandidateModal = () => {
    setIsEditCandidateModalOpen(false);
  };

  const handleCreateCandidate = async () => {
    const createdCandidate = await createCandidate(newCandidateData);
    setCandidates([...candidates, createdCandidate]);
    handleCloseNewCandidateModal();
    setNewCandidateData({
      flmname: "",
      linkVK: "",
      education: "",
      phoneNumber: ""
    });
  };

  const handleChange = (e, key) => {
    const { value } = e.target;
    setNewCandidateData(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const handleUpdateCandidate = async () => {
    const { id, ...updatedFields } = editCandidateData;
    const updatedCandidate = await updateCandidate(id, updatedFields);
    setCandidates(candidates.map(candidate => candidate.id === id ? updatedCandidate : candidate)); 
    handleCloseEditCandidateModal(); 
  };
  
  const handleChangeEditCandidate = (e, key) => {
    const { value } = e.target;
    setEditCandidateData(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const handleDeleteCandidate = async (id) => {
    console.log(1)
    try {
      await deleteCandidate(id);
      console.log(2)
      setCandidates(candidates.filter(candidate => candidate.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении кандидата:', error);
    }
  };

  const handleRefreshCandidate = async (id) => {
    try {
      const updatedCandidate = await updateCandidateData(id);
      console.log('Данные кандидата успешно обновлены:', updatedCandidate);
      // Здесь можно реализовать логику обработки успешного обновления кандидата
    } catch (error) {
      console.error('Ошибка при обновлении кандидата:', error.message);
    }
  };
  

  const table = useReactTable({
    columns,
    data: candidates,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowodel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Box>
      <Button onClick={handleOpenNewCandidateModal}>Добавить кандидата</Button>
      <Box className="table" display="table" width="100%">
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box className="th" width={header.getSize()} key={header.id} p="10px">
                {header.column.columnDef.header}
              </Box>
            ))}
          </Box>
        ))}
        {table.getRowModel().rows.map((row) => (
          <Box className="tr" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Box className="td" width={cell.column.getSize()} key={cell.id} p="10px">
                {flexRender(                cell.column.columnDef.cell, cell.getContext())}
              </Box>
            ))}
            <Button onClick={() => handleOpenEditCandidateModal(row.original)}>Редактировать</Button>
            <Button onClick={() => handleDeleteCandidate(row.original.id)}>Удалить</Button>
            <Button onClick={() => handleRefreshCandidate(row.original.id)}>Обновить</Button>
          </Box>
        ))}
      </Box>

      <Modal isOpen={isNewCandidateModalOpen} onClose={handleCloseNewCandidateModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавление кандидата</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>ФИО</FormLabel>
              <Input value={newCandidateData.flmname} onChange={(e) => handleChange(e, 'flmname')} />
            </FormControl>
            <FormControl>
              <FormLabel>Ссылка ВК</FormLabel>
              <Input value={newCandidateData.linkVK} onChange={(e) => handleChange(e, 'linkVK')} />
            </FormControl>
            <FormControl>
              <FormLabel>Образование</FormLabel>
              <Input value={newCandidateData.education} onChange={(e) => handleChange(e, 'education')} />
            </FormControl>
            <FormControl>
              <FormLabel>Номер телефона</FormLabel>
              <Input value={newCandidateData.phoneNumber} onChange={(e) => handleChange(e, 'phoneNumber')} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreateCandidate}>
              Добавить
            </Button>
            <Button onClick={handleCloseNewCandidateModal}>Отмена</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isEditCandidateModalOpen} onClose={handleCloseEditCandidateModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Редактирование кандидата</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>ФИО</FormLabel>
              <Input value={editCandidateData.flmname} onChange={(e) => handleChangeEditCandidate(e, 'flmname')} />
            </FormControl>
            <FormControl>
              <FormLabel>Ссылка ВК</FormLabel>
              <Input value={editCandidateData.linkVK} onChange={(e) => handleChangeEditCandidate(e, 'linkVK')} />
              </FormControl>
            <FormControl>
              <FormLabel>Образование</FormLabel>
              <Input value={editCandidateData.education} onChange={(e) => handleChangeEditCandidate(e, 'education')} />
            </FormControl>
            <FormControl>
              <FormLabel>Номер телефона</FormLabel>
              <Input value={editCandidateData.phoneNumber} onChange={(e) => handleChangeEditCandidate(e, 'phoneNumber')} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateCandidate}>
              Обновить
            </Button>
            <Button onClick={handleCloseEditCandidateModal}>Отмена</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CandidateTable;

