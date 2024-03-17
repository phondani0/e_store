import React from "react";
import styled from "@emotion/styled";


// --color-dark:  #161616;
// --color-ocean:  #416dea;
// --color-grass: #3dd28d;


// .button {
//     display: flex;
//     overflow: hidden;

//     margin: 10px;
//     padding: 12px 12px;

//     cursor: pointer;
//     user - select: none;
//     transition: all 150ms linear;
//     text - align: center;
//     white - space: nowrap;
//     text - decoration: none!important;
//     text - transform: none;
//     text - transform: capitalize;

//     color: #fff;
//     border: 0 none;
//     border - radius: var(--borderRadius);

//     font - size: 13px;
//     font - weight: 500;
//     line - height: 1.3;

//     -webkit - appearance: none;
//     -moz - appearance: none;
//     appearance: none;

//     justify - content: center;
//     align - items: center;
//     flex: 0 0 160px;

//     box - shadow: 2px 5px 10px var(--color - smoke);

//     &:hover {
//         transition: all 150ms linear;

//         opacity: .85;
//     }

//     &:active {
//         transition: all 150ms linear;
//         opacity: .75;
//     }

//     &:focus {
//         outline: 1px dotted #959595;
//         outline - offset: -4px;
//     }
// }

//   .button.- regular {
//     color: #202129;
//     background - color: #f2f2f2;

//     &:hover {
//         color: #202129;
//         background - color: #e1e2e2;
//         opacity: 1;
//     }

//     &:active {
//         background - color: #d5d6d6;
//         opacity: 1;
//     }
// }

//   .button.- dark {
//     color: var(--color - snow);
//     background: var(--color - dark);

//      &:focus {
//         outline: 1px dotted white;
//         outline - offset: -4px;
//     }
// }

//   .button.- green {
//     color: var(--color - snow);
//     background: var(--color - grass);
// }

//   .button.- blue {
//     color: var(--color - snow);
//     background: var(--color - ocean);
// }

const getColor = (type) => {
    switch (type) {
        case 'primary':
            return '#3dd28d';
        case 'secondary':
            return '#416dea';
        case 'dark':
            return '#161616';

        default:
            return '#f2f2f2';
    }
};

const StyledButton = styled.button((props) => {
    console.log(props)


    return {
        display: 'inline-flex',
        overflow: 'hidden',
        padding: '5px 12px',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'all 150ms linear',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        textDecoration: 'none!important',
        textTransform: 'none',
        color: props.color || '#fff',
        backgroundColor: getColor(props.type),
        border: '0 none',
        borderRadius: '5px',
        fontSize: '13px',
        fontWeight: '500',
        lineHeight: '1.3',
        appearance: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        flex: '0 0 160px',
        boxShadow: '2px 5px 10px var(--color-smoke)',
        '&:hover': {
            transition: 'all 150ms linear',
            opacity: '.85',
        },
        '&:active': {
            transition: 'all 150ms linear',
            opacity: '.75',
        },
        '&:focus': {
            outline: '1px dotted #959595',
            outlineOffset: '-4px',
        },
    };
})

const Button = ({ type, onClick, disabled, children }) => {
    return (
        <StyledButton type={type} onClick={onClick} disabled={disabled}>{children}</StyledButton>
    )
}

export default Button;