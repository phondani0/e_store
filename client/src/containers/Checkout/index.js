import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { createUseStyles } from "react-jss";

import {
    Stepper,
    StepLabel,
    Step,
    Paper,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
} from "@mui/material";
import { useFetchCartQuery } from "../Cart/cartApiSlice";
import {
    useCreateOrderMutation,
    useVerifyOrderMutation,
} from "./checkoutApiSlice";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

const useStyles = createUseStyles((theme) => ({
    appBar: {
        position: "relative",
    },
    layout: {
        width: "auto",
        marginLeft: 0,
        marginRight: 0,
        "@media (min-width: 768px)": {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper: {
        marginTop: "24px",
        marginBottom: "24px",
        padding: "16px",
        "@media (min-width: 768px)": {
            marginTop: "48px",
            marginBottom: "48px",
            padding: "24px",
        },
    },
    stepper: {
        padding: "24px 0px 5px",
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end",
    },
    button: {
        marginTop: "24px",
        marginLeft: "8px",
    },

    listItem: {
        padding: "8px 0px",
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: "16px",
    },
}));

const PaymentStatusWrapper = styled.div({
    marginTop: "30px",
});

const PaymentStatus = (isLoading) => {
    return isLoading ? (
        <PaymentStatusWrapper>{"Payment processing..."}</PaymentStatusWrapper>
    ) : (
        <PaymentStatusWrapper>
            {
                "Payment completed. Please go to the orders page to check the order status."
            }
        </PaymentStatusWrapper>
    );
};

const Checkout = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [iPaymentLoading, setIsPaymentLoading] = useState(false);

    const [createOrder, { data: orderResponse }] = useCreateOrderMutation();
    const [
        verifyOrder,
        { data: verifyOrderResponse, isSuccess: isVerifyOrderSuccess },
    ] = useVerifyOrderMutation();

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

    const { userInfo } = useSelector((state) => state.auth);

    console.log("verifyOrderResponse", verifyOrderResponse);

    const handleCreateOrder = () => {
        // @TODO: Should we move this to App.js
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js"; // TODO: Move to some constant
        script.async = true;
        document.body.appendChild(script);

        createOrder({
            userId: userInfo.id,
            name: userInfo.first_name,
            email: userInfo.email,
        });
    };
    console.log("cartItems?.length", cartItems?.length);
    if (!cartItems?.length) {
        navigate("/");
    }

    const handlePayment = () => {
        const order = orderResponse?.data; // @TODO: Fix order.user coming as null
        setIsPaymentLoading(true);

        const options = {
            key: order.payment.key_id, // Enter the Key ID generated from the Dashboard
            amount: order.payment.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: order.payment.currency,
            name: "E-Store Cart",
            description: "",
            image: "icons-512.png",
            order_id: order.payment.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (response) {
                verifyOrder({
                    order_id: order.id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                });

                setIsPaymentLoading(false);
            },
            prefill: {
                name: `${userInfo.first_name} ${userInfo.last_name}`,
                email: userInfo.email,
                contact: userInfo.mobile || "",
            },
            notes: {
                // "address": "Razorpay Corporate Office"
            },
            theme: {
                color: "#3f51b5",
            },
        };

        const rzp1 = new window.Razorpay(options);

        rzp1.open();
    };

    const steps = ["Shipping address", "Review your order", "Payment"];

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <AddressForm />;
            case 1:
                return <OrderDetails />;
            case 2:
                return <PaymentStatus isLoading={iPaymentLoading} />;
            default:
                navigate("/");
        }
    }

    const handleNext = () => {
        if (activeStep === 0) {
            handleCreateOrder();
            setActiveStep(activeStep + 1);
        } else if (activeStep === 1) {
            handlePayment();
            setActiveStep(activeStep + 1);
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const AddressForm = () => (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="secondary"
                                name="saveAddress"
                                value="yes"
                            />
                        }
                        label="Use this address for payment details"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );

    // @TODO: CALL order APi to fetch latest order status

    // @TODO: show loader on order summary until order is created.
    // @TODO: Show content from order output, not from cart.
    const OrderDetails = () => (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {cartItems.map((cartItem) => (
                    <ListItem
                        className={classes.listItem}
                        key={cartItem.product.id}
                    >
                        <ListItemAvatar>
                            <Avatar
                                alt="product_img"
                                src={cartItem.product.image}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={cartItem.product.name}
                            secondary={cartItem.product.description}
                        />
                        <Typography variant="body2" whiteSpace={"nowrap"}>
                            &#8377; {cartItem.product.price}
                        </Typography>
                    </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        &#8377; {cartTotal}
                    </Typography>
                </ListItem>
            </List>
            {/* <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
            </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
            </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid> */}
        </React.Fragment>
    );

    // @TODO: Handle error state for checkout. show error message component

    useEffect(() => {
        if (isVerifyOrderSuccess) {
            setTimeout(() => {
                navigate("/orders");
            }, 3000);
        }
    }, [isVerifyOrderSuccess]);

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}
                    >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {isVerifyOrderSuccess ? (
                            <React.Fragment>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    marginTop={"30px"}
                                >
                                    Thank you for your order.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your order number is{" "}
                                    <b>{verifyOrderResponse?.data?.id}</b>. We
                                    have emailed your order confirmation, and
                                    will send you an update when your order has
                                    shipped. You will be redirected to the
                                    Orders page shortly...
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button
                                            onClick={handleBack}
                                            className={classes.button}
                                        >
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === 1
                                            ? "Place order"
                                            : "Next"}
                                    </Button>
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
};

export default Checkout;
