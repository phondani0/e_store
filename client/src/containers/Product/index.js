import React, { useCallback, useEffect } from "react";
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
import { useSelector } from "react-redux";

import StyledButton from "../../components/button/Button";
import {
    useAddToCartMutation,
    useFetchCartQuery,
    useUpdateCartMutation,
} from "../Cart/cartApiSlice";

const useStyles = createUseStyles({
    root: {
        width: 250,
        maxHeight: 305,
        "@media (min-width: 1920px)": {
            width: "100%",
            height: "auto",
            maxHeight: "inherit",
        },
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
    },
    shareBtn: {
        maxWidth: "45%",
    },
});

function Product(props) {
    const classes = useStyles();

    const {
        product,
        //   addToCart,
        //   incrementProductQuantity,
        //   decrementProductQuantity,
        //   cartItems
    } = props;
    const { name, price, category, description, image } = product;

    const { data, isError, isLoading, refetch } = useFetchCartQuery({});
    const cartItems = !isError ? data || [] : [];

    const [
        addToCart,
        {
            isLoading: isAddToCartLoading,
            fulfilledTimeStamp: addToCartLastUpdated,
        },
    ] = useAddToCartMutation({});
    const [updateCart, { fulfilledTimeStamp: updateCartLastUpdated }] =
        useUpdateCartMutation({});

    useEffect(() => {
        refetch();
    }, [updateCartLastUpdated, addToCartLastUpdated]);

    // @TODO: Check is auth
    const AddToCartBtn = useCallback(() => {
        const cartItem = cartItems.filter(
            (item) => item.product.id === product.id
        )[0];

        console.log("cartItem", cartItem);

        if (isAddToCartLoading) {
            return (
                <div style={{ marginLeft: "2rem" }}>
                    <CircularProgress size={25} />
                </div>
            );
        } else if (cartItem && cartItem.quantity > 0) {
            return (
                <ButtonGroup size="small">
                    <Button
                        onClick={() =>
                            updateCart({
                                cartId: cartItem.id,
                                quantity: cartItem.quantity - 1 || 0,
                            })
                        }
                    >
                        -
                    </Button>
                    <Button disabled={true}>
                        <Typography>{cartItem.quantity}</Typography>
                    </Button>
                    <Button
                        onClick={() =>
                            updateCart({
                                cartId: cartItem.id,
                                quantity: cartItem.quantity + 1 || 0,
                            })
                        }
                    >
                        +
                    </Button>
                </ButtonGroup>
            );
        } else {
            return (
                <IconButton
                    size="small"
                    color="primary"
                    onClick={() =>
                        addToCart({ productId: product.id, quantity: 1 })
                    }
                >
                    <LocalMallIcon></LocalMallIcon> Cart
                </IconButton>
            );
        }
    }, [cartItems]);

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={image} title={name} />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom component="h2" variant="h6">
                    {name}
                </Typography>
                <Typography variant="body1" color="textPrimary" component="p">
                    &#8377; {price}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <StyledButton
                    className={classes.shareBtn}
                    type="primary"
                    onClick={undefined}
                    disabled={false}
                >
                    Share
                </StyledButton>

                {<AddToCartBtn />}
            </CardActions>
        </Card>
    );
}

export default Product;
