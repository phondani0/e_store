import React, { useEffect } from "react";
import { useLazyCurrentUserQuery } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./authSlice";

const Auth = () => {
    const dispatch = useDispatch();
    const [getCurrentUser] = useLazyCurrentUserQuery({});

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const response = await getCurrentUser({});

            if (response?.data?.currentUser) {
                dispatch(setUserInfo(response?.data?.currentUser));
            }
        };

        fetchCurrentUser();
    }, []);

    return <></>;
};

export default Auth;
