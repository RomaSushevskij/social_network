import React, {FormEvent, KeyboardEvent, useEffect} from "react";
import styleModule from './LoginForm.module.css';
import {Button} from "../../generic/Button/Button";
import {Checkbox} from "../../generic/Checkbox/Checkbox";
import {Field, Form, Formik, useFormik} from "formik";
import {composeValidators, maxLength, requiredField} from '../../../utils/validators';
import {LoginWithApiPropsType} from '../../Login/Login';
import s from '../../generic/InputText/InputText.module.css';
import {CSSTransition} from 'react-transition-group';
import InputTextSecondary from '../../generic/InputTextSecondary/InputTextSecondary';

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}
type OnSubmitParamsType = {
    setSubmitting: (isSubmitting: boolean) => void
    setStatus: (status?: any) => void
}

type LoginFormPropsType = LoginWithApiPropsType

const maxLength30 = maxLength(30)

export function LoginForm({login}: LoginFormPropsType) {

    const onSubmitGHandler = (values: LoginFormValuesType, {setSubmitting, setStatus}: OnSubmitParamsType) => {
        const {email, password, rememberMe} = values;
        login(email, password, rememberMe, setStatus)
        setSubmitting(false)
    }
    const onAddMessageWithEnter = (e: KeyboardEvent<HTMLFormElement>,
                                   handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void) => {
        if (!e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
            handleSubmit()
        }
    };
    useEffect(()=>{
        const formErrorBlock = document.querySelector('.formErrorBlock');
        const timeoutID = setTimeout(()=>{
            formErrorBlock && formErrorBlock.remove()
        },3000)
        return () => {
            clearTimeout(timeoutID)
        }
    },[])
    return (
        <div className={styleModule.wrapperLoginForm}>

            <Formik
                initialValues={{email: '', password: '', rememberMe: true}}
                onSubmit={onSubmitGHandler}>
                {({isSubmitting, handleSubmit, status}) => (
                    <Form className={styleModule.formWrapper}
                          onSubmit={handleSubmit}
                          onKeyPress={(e) => onAddMessageWithEnter(e, handleSubmit)}>
                        <CSSTransition in={status}
                                       timeout={300}
                                       classNames={s}
                                       unmountOnExit
                                       mountOnEnter>
                            <div className={styleModule.formErrorBlock}>{status}</div>
                        </CSSTransition>
                        <div className={styleModule.title}>Log in</div>
                        <div className={styleModule.formElement}>
                            <Field type="email"
                                   name="email"
                                   component={InputTextSecondary}
                                   placeholder={'Login'}
                                   validate={composeValidators(requiredField, maxLength30)}/>

                        </div>
                        <div className={styleModule.formElement}>
                            <Field type="password"
                                   name="password"
                                   component={InputTextSecondary}
                                   placeholder={'Password'}
                                   validate={composeValidators(requiredField, maxLength30)}/>
                        </div>
                        <div className={`${styleModule.formElement} ${styleModule.checkMark}`}>
                            <Field type="checkbox"
                                   name="rememberMe"
                                   component={CheckBoxField}/>
                        </div>
                        <div className={`${styleModule.formElement} ${styleModule.submitButton}`}>
                            <Button name={'Login'}
                                    disabled={isSubmitting}/>
                        </div>
                    </Form>
                )}
            </Formik>
            <span>© Copyright 2022 By Linkspace</span>
        </div>
    );
}

const CheckBoxField = (props: any) => {
    return (
        <Checkbox {...props} id={"remember_me"}
                  bgColor={'#68ACBA'}>
            {'Remember Me'}
        </Checkbox>
    )
}






