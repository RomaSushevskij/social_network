import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, memo} from 'react'
import s from './SearchInputText.module.css'
import {CSSTransition} from 'react-transition-group';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    customStyle?: string
}

const SearchInputText: React.FC<InputTextPropsType> = memo((
    {
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName, title,
        customStyle, form,

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
    const finalInputClassName = `${error ? `${s.errorInput} ${s.superInput}` : s.superInput} ${className ? s[className] : className}`;
    return (
        <div className={customStyle ? `${customStyle} ${s.inputWrapper}` : s.inputWrapper}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className={s.searchLogo}/>
            <input type={type}
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

export default SearchInputText
