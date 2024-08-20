/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useMemo } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { createUseStyles } from "react-jss";

import { CircularProgress } from "@mui/material";

import StyledButton from "../../components/core/button/Button";
import {
    useAddToCartMutation,
    useFetchCartQuery,
    useUpdateCartMutation,
} from "../Cart/cartApiSlice";
import Tooltip from "../../components/core/tooltip/tooltip";
import AddToCart from "../../components/common/cart/AddToCart";

const useStyles = createUseStyles({
    root: {
        width: 250,
        height: 305,
        display: "flex",
        flexDirection: "column",
        "@media (min-width: 1920px)": {
            width: "100%",
            height: "auto",
            maxHeight: "inherit",
        },
    },
    title: {
        fontSize: "1rem",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    description: {
        display: "-webkit-box",
        "-webkit-line-clamp": 2, // Show ellipsis after two lines
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: "transform 0.3s ease",
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {
        backgroundColor: red[500],
    },
    cardContent: {
        padding: ".6rem 1rem 0",
    },
    cardActions: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "auto",
        padding: "15px",
    },
    shareBtn: {
        maxWidth: "45%",
    },
});

const Product = (props) => {
    const classes = useStyles();

    const { product } = props;
    const { name, price, category, description, image } = product;

    const { data, isError, isLoading, refetch } = useFetchCartQuery({});

    const cartItem = useMemo(() => {
        const cartItems = !isError ? data || [] : [];
        return cartItems.filter((item) => item.product.id === product.id)[0];
    }, [data, isError]);

    const [
        addToCart,
        {
            isLoading: isAddToCartLoading,
            fulfilledTimeStamp: addToCartLastUpdated,
        },
    ] = useAddToCartMutation({});

    useEffect(() => {
        refetch(); // @TODO: Try to handle this in api slice
    }, [addToCartLastUpdated]);

    const onAddToCart = () => {
        addToCart({ productId: product.id, quantity: 1 });
    };

    // @TODO: Show skeleton on isLoading
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={image} title={name} />
            <CardContent className={classes.cardContent}>
                <Tooltip content={name}>
                    <Typography
                        gutterBottom
                        component="h2"
                        className={classes.title}
                    >
                        {name}
                    </Typography>
                </Tooltip>

                <Typography
                    variant="body1"
                    color="textPrimary"
                    component="p"
                    fontWeight={"bold"}
                >
                    &#8377; {price}
                </Typography>
                <Tooltip content={description}>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        className={classes.description}
                    >
                        {description}
                    </Typography>
                </Tooltip>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <AddToCart
                    isLoading={isAddToCartLoading}
                    onAddToCart={onAddToCart}
                />
            </CardActions>
        </Card>
    );
};

export default React.memo(Product);
