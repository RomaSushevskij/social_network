import React, {FormEvent, KeyboardEvent} from "react";
import styleModule from './AddPostForm.module.css';
import {Button} from "../../generic/Button/Button";
import {Field, Form, Formik, FormikState} from "formik";
import {Textarea} from '../../generic/Textarea/Textarea';

type AddPostFormValuesType = {
    newPostText: string
}

type AddPostFormPropsType = {
    addPost: (newPostText: string) => void
}

type OnSubmitParamsType = {
    setSubmitting: (isSubmitting: boolean) => void
    resetForm: (nextState?: Partial<FormikState<{ newPostText: string; }>> | undefined) => void
}

export function AddPostForm({addPost}: AddPostFormPropsType) {

    const onSubmitHandler = (values: AddPostFormValuesType, {setSubmitting, resetForm}: OnSubmitParamsType) => {
        values.newPostText.trim() && addPost(values.newPostText);
        setSubmitting(false)
        resetForm()
    }
    const onAddPostWithEnter = (e: KeyboardEvent<HTMLFormElement>,
                                handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void) => {
        if (!e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
            handleSubmit()
        }
    };

    return (
        <Formik
            initialValues={{newPostText: '',}}
            onSubmit={onSubmitHandler}
        >
            {({isSubmitting, handleSubmit}) => (
                <Form className={styleModule.formWrapper}
                      onSubmit={handleSubmit}
                      onKeyPress={(e) => onAddPostWithEnter(e, handleSubmit)}>
                    <div className={styleModule.writePost}>
                        <Field name="newPostText" component={TextAreaField}/>
                    </div>
                    <div className={styleModule.addPostButton}>
                        <Button type={'submit'}
                                name={'Add post'}
                                disabled={isSubmitting}/>
                    </div>
                </Form>
            )}
        </Formik>
    );
}


const TextAreaField = (props: any) => {
    return (
        <Textarea {...props}
                  placeholder={'Here you can leave your post'}
                  background={'#ffffff'}
                  color={'#60575A'}/>
    )
}



