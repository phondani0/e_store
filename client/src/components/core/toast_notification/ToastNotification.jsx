import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import React, { useEffect, useState } from "react";
import { AlertColor } from "@mui/material/Alert";

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

/**
 * A React component that displays a toast notification.
 *
 * @param {Object} props - The component props.
 * @param {string} props.content - The content of the notification.
 * @param {AlertColor} props.type - The type of the notification (e.g. "error", "success").
 * @param {boolean} props.open - Whether the notification is open or not.
 * @param {function} props.onClose - A callback function to call when the notification is closed.
 * @return {JSX.Element} The JSX element representing the toast notification.
 */
const ToastNotification = ({ content, type,  open, onClose }: {
	content: string;
	type: AlertColor;
	open: boolean;
	onClose: (open: boolean) => void;
}) => {
    const handleClose = () => {
        onClose(false);
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
            autoHideDuration={1200}
        >
            <Alert
                onClose={handleClose}
                severity={type}
                variant="filled"
                sx={{ width: "100%" }}
            >
                {content}
            </Alert>
        </Snackbar>
    );
};

ToastNotification.defaultProps = {
    open: false,
};

export default ToastNotification;
