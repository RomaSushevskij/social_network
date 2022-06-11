import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, memo} from 'react'
import s from './InputTextSecondary.module.css'
import {CSSTransition} from 'react-transition-group';
import style from '../EditableSpan/EditableSpan.module.css';


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    customStyle?: string
}

const InputTextSecondary: React.FC<InputTextPropsType> = memo((
    {
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName, name, title,
        customStyle,

        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        onChangeText && onChangeText(e.currentTarget.value)
    };
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        onEnter && e.key === 'Enter' && onEnter()
    };

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`;
    const finalInputClassName = `${error ? `${s.errorInput} ${s.superInput}` : s.superInput} ${className}`;

    return (
        <div className={customStyle ? `${customStyle} ${s.inputWrapper}` : s.inputWrapper}>
            <input name={name}
                   type={type}
                   onChange={onChangeCallback}
                   onKeyPress={onKeyPressCallback}
                   className={finalInputClassName}
                   {...restProps}
            />
            <CSSTransition in={!!error}
                           timeout={300}
                           classNames={s}
                           unmountOnExit
                           mountOnEnter>
            <div className={finalSpanClassName}>{error}</div>
            </CSSTransition>
        </div>
    )
});

export default InputTextSecondary
