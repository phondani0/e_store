import React, { useState, useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";

import {
    ButtonGroup,
    Button,
    Drawer,
    Box,
    Typography,
    Grid,
    Paper,
    Divider,
    Backdrop,
    CircularProgress,
} from "@mui/material";
import { createUseStyles } from "react-jss";
import {
    useAddToCartMutation,
    useFetchCartQuery,
    useRemoveFromCartMutation,
    useUpdateCartMutation,
} from "./cartApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "./cartSlice";

const useStyles = createUseStyles({
    backdrop: {},
    drawer_paper: {
        // [theme.breakpoints.down('xl')]: {
        //   width: '100%'
        // }
    },
    cart_container: {
        width: "400px",
        padding: "12px",
        paddingTop: "0px",
        // paddingBottom: '4rem',
        paddingBottom: 0,
        // [theme.breakpoints.down("xl")]: {
        //   width: "100%",
        // },
    },
    cart_toggler: {
        "border-top-left-radius": "5px",
        "border-bottom-left-radius": "5px",
        "background-color": "#399e7f",
        cursor: "pointer",
    },
    paper: {
        // padding: theme.spacing(2),
        padding: ".8rem",
        margin: "10px 0",
        width: "100%",
    },
    cart_items_container: {
        height: "100%",
    },
    cart_quantity_inc_dec_button: {},
    cart_quantity_text: {},
    checkout_btn_wrapper: {
        bottom: 0,
        // width: '380px',
        width: "100%",
        height: "3.5rem",
        position: "absolute",
        backgroundColor: "white",
    },
    checkout_btn: {
        left: ".6rem",
        width: "95%",
        bottom: "4%",
        top: "12%",
        "@media (min-width: 768px)": {
            left: ".65rem",
        },
    },
    wrapper: {
        height: "92.5%",
        position: "relative",
        "overflow-y": "scroll",
    },
    productImg: {
        width: "60px",
        height: "60px",
        padding: "0px",
    },
});

const ANCHOR = "right";

const Cart = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        data,
        isError,
        isFetching,
        refetch: refetchCart,
    } = useFetchCartQuery({});
    const cartItems = !isError ? data || [] : [];

    const cartTotal = cartItems.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);

    const [updateCart, { fulfilledTimeStamp: updateCartLastUpdated }] =
        useUpdateCartMutation({});

    const [removeFromCart, { fulfilledTimeStamp: removeCartLastUpdated }] =
        useRemoveFromCartMutation({});

    const { userInfo } = useSelector((state) => state.auth);
    const { isCartOpen } = useSelector((state) => state.cart);

    useEffect(() => {
        if (isCartOpen) {
            refetchCart(); // @TODO: Try to handle this in api slice
        }
    }, [isCartOpen, updateCartLastUpdated, removeCartLastUpdated]);

    const handleCheckout = () => {
        navigate("/checkout");
        dispatch(toggleCart());
    };

    const toggleCartHandler = () => {
        dispatch(toggleCart(false));
    };

    const increaseProductQuantity = (cartItem) => {
        updateCart({
            cartId: cartItem.id,
            quantity: cartItem.quantity + 1,
        });
    };

    const decreaseProductQuantity = (cartItem) => {
        updateCart({ cartId: cartItem.id, quantity: cartItem.quantity - 1 });
    };

    const removeFromCartHandler = (cartItem) => {
        removeFromCart({ cartId: cartItem.id });
    };

    // @TODO: Show skeleton on per cart item.
    // @TODO: Call removeFromCart api when user is trying to descrease product quantity when quantity is 1.

    return (
        <React.Fragment key={ANCHOR}>
            <Box
                onClick={toggleCartHandler}
                bgcolor="green"
                color="white"
                p={2}
                position="fixed"
                top="40%"
                right={0}
                zIndex="mobile stepper"
                className={classes.cart_toggler}
            >
                <Box display="flex" justifyContent="center">
                    <Box pr={1}>
                        <ShoppingCartIcon />
                    </Box>
                    <Box>
                        {cartItems.length} Item
                        {cartItems.length > 1 ? <span>s</span> : <span></span>}
                    </Box>
                </Box>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Box
                        px={2}
                        py={1}
                        borderRadius="6px"
                        bgcolor="white"
                        color="#399e7f"
                    >
                        <Typography>&#8377; {cartTotal}</Typography>
                    </Box>
                </Box>
            </Box>
            <Drawer
                classes={{ paper: classes.drawer_paper }}
                anchor={ANCHOR}
                open={isCartOpen}
                onClose={toggleCartHandler}
            >
                <div className={classes.wrapper}>
                    <Box className={classes.cart_container}>
                        <Box
                            display="flex"
                            paddingY={1}
                            justifyContent="space-between"
                        >
                            <Typography
                                color="primary"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <LocalMallIcon />
                                <Typography
                                    style={{
                                        marginLeft: "5px",
                                        fontSize: "1.18rem",
                                        fontWeight: "600",
                                    }}
                                >
                                    {cartItems.length} Item
                                    {cartItems.length > 1 ? (
                                        <span>s</span>
                                    ) : (
                                        <span></span>
                                    )}
                                </Typography>
                            </Typography>
                            <IconButton
                                onClick={toggleCartHandler}
                                size="large"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Divider />
                        <Box>
                            {isFetching ? (
                                <Backdrop
                                    className={classes.backdrop}
                                    open={true}
                                >
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                            ) : (
                                cartItems.map((item, i) => {
                                    return (
                                        <Paper
                                            key={`c-item-${i}`}
                                            className={classes.paper}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                                sm
                                                container
                                                alignItems="center"
                                            >
                                                <Grid
                                                    item
                                                    xs
                                                    container
                                                    alignItems="center"
                                                    className={
                                                        classes.cart_items_container
                                                    }
                                                >
                                                    <Grid item>
                                                        <ButtonGroup
                                                            orientation="vertical"
                                                            size="small"
                                                            className={
                                                                classes.cart_quantity_inc_dec_button
                                                            }
                                                        >
                                                            <Button
                                                                onClick={() =>
                                                                    increaseProductQuantity(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                +
                                                            </Button>
                                                            <Button
                                                                disabled={true}
                                                            >
                                                                <Typography
                                                                    className={
                                                                        classes.cart_quantity_text
                                                                    }
                                                                >
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </Typography>
                                                            </Button>
                                                            <Button
                                                                onClick={() =>
                                                                    decreaseProductQuantity(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                -
                                                            </Button>
                                                        </ButtonGroup>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs
                                                        alignItems="center"
                                                        justifyContent="center"
                                                    >
                                                        <div
                                                            style={{
                                                                textAlign:
                                                                    "center",
                                                            }}
                                                        >
                                                            <img
                                                                src={
                                                                    item.product
                                                                        .image
                                                                }
                                                                className={
                                                                    classes.productImg
                                                                }
                                                            />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs spacing={3}>
                                                        <Typography
                                                            variant="subtitle2"
                                                            style={{
                                                                fontSize:
                                                                    "12px",
                                                                overflow:
                                                                    "hidden",
                                                                display:
                                                                    "-webkit-box",
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient:
                                                                    "vertical",
                                                                marginRight:
                                                                    "10px",
                                                            }}
                                                        >
                                                            {item.product.name}
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            component="p"
                                                        >
                                                            &#8377;{" "}
                                                            {item.product.price}
                                                        </Typography>
                                                        <Typography
                                                            variant="subtitle2"
                                                            color="textSecondary"
                                                        >
                                                            {item.quantity} X 1
                                                            pc(s)
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs
                                                        style={{
                                                            flexGrow: 0,
                                                            marginRight: "20px",
                                                            whiteSpace:
                                                                "nowrap",
                                                        }}
                                                    >
                                                        <Typography variant="subtitle2">
                                                            &#8377;{" "}
                                                            {item.product
                                                                .price *
                                                                item.quantity}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography
                                                            gutterBottom
                                                            style={{
                                                                cursor: "pointer",
                                                                margin: 0,
                                                            }}
                                                            onClick={() =>
                                                                removeFromCartHandler(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <CancelIcon
                                                                style={{
                                                                    verticalAlign:
                                                                        "middle",
                                                                }}
                                                            />
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    );
                                })
                            )}
                        </Box>
                    </Box>
                </div>
                <div className={classes.checkout_btn_wrapper}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth={true}
                        className={classes.checkout_btn}
                        startIcon={<ShoppingCartIcon />}
                        onClick={handleCheckout}
                    >
                        <Typography style={{ paddingRight: "10px" }}>
                            Checkout
                        </Typography>
                        <Typography variant="subtitle1" component="h5">
                            &#8377;{cartTotal}
                        </Typography>
                    </Button>
                </div>
            </Drawer>
        </React.Fragment>
    );
};

export default Cart;
