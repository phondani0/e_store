import React from "react";
import Products from "../containers/products";
import { Box, Container } from "@mui/material";

const HomePage = () => {
  return (
    <Container>
      <Box py={5}>
        <Products />
      </Box>
    </Container>
  );
};

export default HomePage;
