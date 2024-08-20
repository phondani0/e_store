import React from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Button from "../../core/button/Button";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    const handleAddToCart = () => {
        if (!userInfo) {
            navigate("/login");
        } else {
            onAddToCart();
        }
    };

    return (
        <Button
            className={classes.button}
            type="primary"
            onClick={handleAddToCart}
            disabled={false}
        >
            <LocalMallIcon /> {"Add to Cart"}
        </Button>
    );
};

export default AddToCart;
