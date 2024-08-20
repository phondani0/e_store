import React from "react";
import ToastNotification from "../components/core/toast_notification/ToastNotification";
import { AlertColor } from "@mui/material/Alert";

const Context = React.createContext({
    pushNotification: ({ type, message }) => null,
});

export const useToastNotificationContext = () => React.useContext(Context);

const ToastNotificationContext = ({ children }) => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState("info");

    const pushNotification = ({ type, message }) => {
        setOpen(true);
        setMessage(message);
        setType(type);
    };

    return (
        <Context.Provider
            value={{
                pushNotification,
            }}
        >
            <>
                <ToastNotification
                    content={message}
                    open={open}
                    onClose={() => setOpen(false)}
                    type={type}
                />
                {children}
            </>
        </Context.Provider>
    );
};

export default ToastNotificationContext;
