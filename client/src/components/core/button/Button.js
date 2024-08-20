import React from "react";
import styled from "@emotion/styled";

const getColor = (type) => {
    switch (type) {
        case "primary":
            return "#3dd28d";
        case "secondary":
            return "#416dea";
        case "dark":
            return "#161616";

        default:
            return "#f2f2f2";
    }
};

const StyledButton = styled.button((props) => {
    const disabledStyle = props.disabled
        ? {
              opacity: "0.5 !important",
              cursor: "not-allowed",
          }
        : {};

    return {
        display: "inline-flex",
        overflow: "hidden",
        padding: "5px 12px",
        cursor: "pointer",
        userSelect: "none",
        transition: "all 150ms linear",
        textAlign: "center",
        whiteSpace: "nowrap",
        textDecoration: "none!important",
        textTransform: "none",
        color: props.color || "#fff",
        backgroundColor: getColor(props.type),
        border: "0 none",
        borderRadius: "5px",
        fontSize: "13px",
        fontWeight: "500",
        lineHeight: "1.3",
        appearance: "none",
        justifyContent: "center",
        alignItems: "center",
        flex: "0 0 160px",
        boxShadow: "2px 5px 10px var(--color-smoke)",
        "&:hover": {
            transition: "all 150ms linear",
            opacity: ".85",
        },
        "&:active": {
            transition: "all 150ms linear",
            opacity: ".75",
        },
        "&:focus": {
            outline: "1px dotted #959595",
            outlineOffset: "-4px",
        },
        ...disabledStyle,
    };
});

const Button = ({ className, type, onClick, disabled, children }) => {
    return (
        <StyledButton
            className={className}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </StyledButton>
    );
};

export default Button;
