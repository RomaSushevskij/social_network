import React from "react";
import style from './Button.module.css'
import styled from "styled-components";

type ButtonPropsType = {
    name: string
    onClick?: () => void
    backgroundHover?: string
    background?: string
    colorHover?: string
    disabled?: boolean
    type?: "button" | "submit" | "reset" | undefined
}


export const Button = React.memo(({
                                      name,
                                      onClick,
                                      disabled,
                                      type, ...props
                                  }: ButtonPropsType) => {
    const ButtonSetting = styled.button`
& {
color: ${props.colorHover ? props.colorHover : '#ffffff'};
background-color:${props.background ? props.background : '#EC4899'}
}
&:hover {
background-color: ${props.backgroundHover ? props.backgroundHover : '#DB2777'}
}
`;

    const onClickButton = () => {
        onClick && onClick()
    };

    return (
        <ButtonSetting onClick={onClickButton}
                       className={style.button}
                       disabled={disabled}
                       type={type}>
            {name}
        </ButtonSetting>
    )
})