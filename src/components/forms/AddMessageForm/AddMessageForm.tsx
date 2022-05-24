import React, {FormEvent, KeyboardEvent} from "react";
import styleModule from './AddMessageForm.module.css';
import {Button} from "../../generic/Button/Button";
import {Field, Form, Formik, FormikState} from "formik";
import {Textarea} from '../../generic/Textarea/Textarea';

type AddPostFormValuesType = {
    newMessageText: string
}

type AddMessageFormPropsType = {
    addMessage: (newMessageText: string) => void
}

type OnSubmitParamsType = {
    setSubmitting: (isSubmitting: boolean) => void
    resetForm: (nextState?: Partial<FormikState<{ newMessageText: string; }>> | undefined) => void
}

export function AddMessageForm({addMessage}: AddMessageFormPropsType) {

    const onSubmitHandler = (values: AddPostFormValuesType, {setSubmitting, resetForm}: OnSubmitParamsType) => {
        values.newMessageText.trim() && addMessage(values.newMessageText);
        setSubmitting(false)
        resetForm()
    }
    const onAddMessageWithEnter = (e: KeyboardEvent<HTMLFormElement>,
                                   handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void) => {
        if (!e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
            handleSubmit()
        }
    };

    return (
        <Formik
            initialValues={{newMessageText: '',}}
            onSubmit={onSubmitHandler}>
            {({isSubmitting, handleSubmit}) => (
                <Form className={styleModule.writeAndSendMessage}
                      onSubmit={handleSubmit}
                      onKeyPress={(e) => onAddMessageWithEnter(e, handleSubmit)}>
                    <div className={styleModule.writeMessage}>
                        <Field name="newMessageText" component={TextAreaField}/>
                    </div>
                    <div className={styleModule.sendMessage}>
                        <Button name={'Send'}
                                type={'submit'}
                                disabled={isSubmitting}
                                background={'#2563EB'}
                                backgroundHover={'#1F4DAA'}/>
                    </div>
                </Form>


            )}
        </Formik>
    );
}


const TextAreaField = (props: any) => {
    return (
        <Textarea {...props}
                  placeholder={'Enter your message'}
                  background={'#ffffff'}
                  color={'#60575A'}/>
    )
}





