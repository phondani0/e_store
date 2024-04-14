import React from "react";
import MuiTooltip from "@mui/material/Tooltip";

const Tooltip = ({ content, children }) => {
    return <MuiTooltip title={content}>{children} </MuiTooltip>;
};

export default Tooltip;
