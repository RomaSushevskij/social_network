import React, {LegacyRef} from "react";
import style from './Textarea.module.css'

type TextareaPropsType = {
    textareaValue: string
    setTextareaValue: () => void
    reference: LegacyRef<HTMLTextAreaElement>
    placeholder:string
}

export const Textarea = ({textareaValue, setTextareaValue, reference, placeholder, ...props}:TextareaPropsType) => {
    return (
        <textarea placeholder={placeholder} className={style.textarea} onChange={setTextareaValue} value={textareaValue} ref={reference}/>
    )
};