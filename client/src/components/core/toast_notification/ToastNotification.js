import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import React, { useState } from "react";

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const ToastNotification = ({ content }) => {
    const [open, setOpen] = useState(false);

    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            onClose={() => setOpen(false)}
            TransitionComponent={SlideTransition}
            autoHideDuration={1200}
        >
            <Alert
                onClose={() => setOpen(false)}
                severity="error"
                variant="filled"
                sx={{ width: "100%" }}
            >
                {content}
            </Alert>
        </Snackbar>
    );
};

export default ToastNotification;
