import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, memo} from 'react'
import s from './InputText.module.css'
import {CSSTransition} from 'react-transition-group';


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    customStyle?: string
    field?: any
    form?: any
    meta?: any
    name?: string
}

const InputText: React.FC<InputTextPropsType> = memo((
    {
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName, name, title,
        customStyle, field, form, meta,

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
    const finalInputClassName = `${error || form?.errors[field.name] ? `${s.errorInput} ${s.superInput}` : s.superInput} ${className ? s[className] : className}`;
    return (
        <div className={customStyle ? `${customStyle} ${s.inputWrapper}` : s.inputWrapper}>
            <input name={name}
                   type={type}
                   onChange={onChangeCallback}
                   onKeyPress={onKeyPressCallback}
                   className={finalInputClassName}
                   {...field}
                   {...restProps}
            />
            <CSSTransition in={error || form?.errors[field.name] && form?.touched[field.name]}
                           timeout={300}
                           classNames={s}
                           unmountOnExit
                           mountOnEnter>
                <div className={finalSpanClassName}>{form?.errors[field.name]}</div>
            </CSSTransition>
        </div>
    )
});

export default InputText
