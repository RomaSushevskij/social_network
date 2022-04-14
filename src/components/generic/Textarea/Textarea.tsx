import React, {ChangeEvent, KeyboardEvent, LegacyRef} from "react";
import style from './Textarea.module.css'

type TextareaPropsType = {
    textareaValue?: string
    setTextareaValue?: (e: ChangeEvent<HTMLTextAreaElement>) => void
    onAddWithEnter?: (e: KeyboardEvent<HTMLTextAreaElement>) => void
    reference?: LegacyRef<HTMLTextAreaElement>
    placeholder?: string
    background: string
    color: string
    field?: any
    form?: any
    meta?: any
}

export const Textarea = React.memo(({
                                        textareaValue,
                                        setTextareaValue,
                                        reference,
                                        placeholder,
                                        onAddWithEnter,
                                        background,
                                        color,
                                        field,
                                        form,
                                        meta,
                                        ...restProps
                                    }: TextareaPropsType) => {
    const styles = {
        background: background,
        color: color
    };
    return (
        <textarea placeholder={placeholder}
                  className={style.textarea}
                  onChange={setTextareaValue}
                  onKeyPress={onAddWithEnter}
                  value={textareaValue}
                  ref={reference}
                  style={styles}
                  {...field}
        />
    )
})