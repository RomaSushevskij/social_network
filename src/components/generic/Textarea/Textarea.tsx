import React, {ChangeEvent, LegacyRef, KeyboardEvent} from "react";
import style from './Textarea.module.css'

type TextareaPropsType = {
    textareaValue: string
    setTextareaValue: (e: ChangeEvent<HTMLTextAreaElement>) => void
    onAddWithEnter?: (e: KeyboardEvent<HTMLTextAreaElement>) => void
    reference?: LegacyRef<HTMLTextAreaElement>
    placeholder: string
    background: string
    color: string
}

export const Textarea = ({
                             textareaValue,
                             setTextareaValue,
                             reference,
                             placeholder,
                             onAddWithEnter,
                             background,
                             color,
                             ...restProps
                         }: TextareaPropsType) => {
    const styles = {
        background:background,
        color: color
    }
    return (
        <textarea placeholder={placeholder}
                  className={style.textarea}
                  onChange={setTextareaValue}
                  onKeyPress={onAddWithEnter}
                  value={textareaValue}
                  ref={reference}
                  style={styles}
                  />
    )
};