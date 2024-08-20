import React from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Button from "../../core/button/Button";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";

const useStyles = createUseStyles(
    {
        button: {
            display: "flex",
            alignItems: "center",
            maxWidth: "10em",
            "& svg": {
                marginRight: "5px",
                height: "20px",
                marginBottom: "2px",
            },
        },
    },
    {
        name: "add_to_cart",
    }
);

const AddToCart = ({ isLoading, onAddToCart }) => {
    const classes = useStyles();

    const { user } = useSelector((state) => state.auth);

    console.log("user", user);

    return (
        <Button
            className={classes.button}
            type="primary"
            onClick={onAddToCart}
            disabled={!user}
        >
            <LocalMallIcon /> {"Add to Cart"}
        </Button>
    );
};

export default AddToCart;
