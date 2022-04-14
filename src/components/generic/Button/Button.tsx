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
    const ButtonWithBefore = styled.button`
& {
border-color: ${props.backgroundHover ? props.backgroundHover : '#ffbf47'};
color: ${props.backgroundHover ? props.backgroundHover : '#ffbf47'};
background-color:${props.background ? props.background : '#ffe1a9'}
}
&:before {
background: ${props.backgroundHover ? props.backgroundHover : '#ffbf47'};
}
&:hover {
color: ${props.colorHover ? props.colorHover : '#ffffff'}
}
`;

    const onClickButton = () => {
        onClick && onClick()
    };

    return (
        <ButtonWithBefore onClick={onClickButton}
                          className={style.button}
                          disabled={disabled}
                          type={type}>
            {name}
        </ButtonWithBefore>
    )
})