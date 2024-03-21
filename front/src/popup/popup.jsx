import React from "react";
import ReactDOM from "react-dom/client";
import CopyID from "./CopyID.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../design/theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <CopyID />
    </ChakraProvider>
  </React.StrictMode>
);