import React from "react";
import style from './Button.module.css'

type ButtonPropsType = {
    name: string
    callback: () => void
}

export const Button = ({name, callback, ...props}:ButtonPropsType) => {
    const onClickButton = () => {
      callback()
    };

    return (
        <button onClick={onClickButton} className={style.button}>{name}</button>
    )
}