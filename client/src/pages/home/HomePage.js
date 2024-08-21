import React from "react";
import { Box, Container } from "@mui/material";
import Products from "../../containers/products";
import Cart from "../../containers/Cart";

const HomePage = () => {
    return (
        <Container>
            <Box py={5}>
                <Products />
                <Cart />
            </Box>
        </Container>
    );
};

export default HomePage;
