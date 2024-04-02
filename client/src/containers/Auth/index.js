import React, { useEffect } from "react";
import { useLazyCurrentUserQuery } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./authSlice";

const Auth = (props) => {
    const dispatch = useDispatch();
    const [getCurrentUser, result] = useLazyCurrentUserQuery({});

    useEffect(() => {
        (async () => {
            await getCurrentUser({});
        })();
    }, []);

    useEffect(() => {
        console.log(result);
        dispatch(setUserInfo("user"));
    }, [result]);

    return <></>;
};

export default Auth;
