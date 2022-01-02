import React, {ChangeEvent, LegacyRef, KeyboardEvent} from "react";
import style from './Textarea.module.css'

type TextareaPropsType = {
    textareaValue: string
    setTextareaValue: (e: ChangeEvent<HTMLTextAreaElement>) => void
    onAddWithEnter?: (e: KeyboardEvent<HTMLTextAreaElement>) => void
    reference?: LegacyRef<HTMLTextAreaElement>
    placeholder: string
}

export const Textarea = ({
                             textareaValue,
                             setTextareaValue,
                             reference,
                             placeholder,
                             onAddWithEnter,
                             ...restProps
                         }: TextareaPropsType) => {
    return (
        <textarea placeholder={placeholder}
                  className={style.textarea}
                  onChange={setTextareaValue}
                  onKeyPress={onAddWithEnter}
                  value={textareaValue}
                  ref={reference}/>
    )
};