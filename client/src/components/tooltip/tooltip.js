import React from "react";
import MuiTooltip from "@mui/material/Tooltip";
import styled from "@emotion/styled";

const Wrapper = styled.div({});

const Tooltip = ({ content, children }) => {
    // @TODO: Change background color
    // @TODO: Fix the gap between the tooltip and mouse pointer
    return (
        <MuiTooltip title={content} enterDelay={1000} enterNextDelay={500}>
            <Wrapper>{children}</Wrapper>
        </MuiTooltip>
    );
};

export default Tooltip;
