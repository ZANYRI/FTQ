import { Box, Heading } from "@chakra-ui/react";
import CandidateTable from "./CandidateTable";

function App() {
  return (
    <Box maxW={1000} mx="auto" px={6} pt={24} fontSize="sm">
      <Heading mb={10}>Кандидаты</Heading>
      <CandidateTable />
    </Box>
  );
}

export default App;