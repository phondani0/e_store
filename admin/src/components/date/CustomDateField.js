import React from "react";
import { DateField } from "react-admin";

const CustomDateField = ({ source, showDate = true, showTime = false }) => {
    return (
        <DateField
            source={source}
            transform={(value) => {
                return new Date(parseInt(value));
            }}
            showDate={showDate}
            showTime={showTime}
        />
    );
};

export default CustomDateField;
