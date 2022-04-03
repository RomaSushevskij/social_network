import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './Checkbox.module.css'
import styled from "styled-components";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
    bgColor?: string
    field?: any
    form?: any
    meta?: any
}

const Checkbox: React.FC<SuperCheckboxPropsType> = (
    {
        type,
        onChange, onChangeChecked,
        className, spanClassName,
        children,
        bgColor,
        ref, field, form, meta,

        ...restProps
    }
) => {
    const FakeFlagSpan = styled.span``
    const InputCheckbox = styled.input``
    const Label = styled.label`
        & input${InputCheckbox}:checked + span${FakeFlagSpan} {
            background-color: ${bgColor ? bgColor : '#007FFF'};
            border-color: ${bgColor ? bgColor : '#007FFF'};
        }
        &:hover input${InputCheckbox}:checked + span${FakeFlagSpan}{
            box-shadow: 0 0 8px ${bgColor ? bgColor : '#007FFF'};
        }
    `


    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        onChangeChecked && onChangeChecked(e.currentTarget.checked);
    };
    const finalInputClassName = `${s.checkbox} ${className ? className : ''}`
    return (
        <Label className={s.label}>
            <InputCheckbox
                type={'checkbox'}
                onChange={onChangeCallback}
                className={finalInputClassName}
                {...restProps}
                {...field}
            />
            <FakeFlagSpan className={s.fakeFlag}></FakeFlagSpan>
            {children && <span className={s.spanClassName}>{children}</span>}
        </Label>
    )
}

export default Checkbox
