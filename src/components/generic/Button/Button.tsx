import React from "react";
import style from './Button.module.css'
import styled from "styled-components";

type ButtonPropsType = {
    name: string
    callback: () => void
    backgroundHover: string
    background:string
    colorHover:string
}


export const Button = ({name, callback, ...props}: ButtonPropsType) => {
    const ButtonWithBefore = styled.button`
& {
border-color: ${props.backgroundHover};
color: ${props.backgroundHover};
background-color:${props.background}
}
&:before {
background: ${props.backgroundHover};
}
&:hover {
color: ${props.colorHover}
}
`;

    const onClickButton = () => {
        callback()
    };

    return (
        <ButtonWithBefore onClick={onClickButton} className={style.button}>{name}</ButtonWithBefore>
    )
}