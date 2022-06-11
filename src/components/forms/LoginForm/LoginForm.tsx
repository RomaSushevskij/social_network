import React, {FormEvent, KeyboardEvent, memo} from "react";
import styleModule from './LoginForm.module.css';
import {Button} from "../../generic/Button/Button";
import {Checkbox} from "../../generic/Checkbox/Checkbox";
import {Field, Form, Formik} from "formik";
import {composeValidators, maxLength, requiredField} from '../../../utils/validators';
import {LoginWithApiPropsType} from '../../Login/Login';
import s from '../../generic/InputText/InputText.module.css';
import {CSSTransition} from 'react-transition-group';
import InputTextSecondary from '../../generic/InputTextSecondary/InputTextSecondary';

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha:string
}
type OnSubmitParamsType = {
    setSubmitting: (isSubmitting: boolean) => void
}

type LoginFormPropsType = LoginWithApiPropsType

const maxLength30 = maxLength(30)

export const LoginForm = memo(({login, errorMessage, captchaURL}: LoginFormPropsType) => {
    const onSubmitGHandler = (values: LoginFormValuesType, {setSubmitting}: OnSubmitParamsType) => {
        const {email, password, rememberMe,captcha} = values;
        login(email, password, rememberMe, captcha)
        setSubmitting(false)
    }
    const onAddMessageWithEnter = (e: KeyboardEvent<HTMLFormElement>,
                                   handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void) => {
        if (!e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
            handleSubmit()
        }
    };
    return (
        <div className={styleModule.wrapperLoginForm}>
            <Formik
                initialValues={{email: '', password: '', rememberMe: true, captcha: ''}}
                onSubmit={onSubmitGHandler}>
                {({isSubmitting, handleSubmit}) => {
                    return (
                        <Form className={styleModule.formWrapper}
                              onSubmit={handleSubmit}
                              onKeyPress={(e) => onAddMessageWithEnter(e, handleSubmit)}>
                            <CSSTransition in={!!errorMessage}
                                           timeout={300}
                                           classNames={s}
                                           unmountOnExit
                                           mountOnEnter>
                                <div className={styleModule.formErrorBlock}>{errorMessage}</div>
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
                            {!!captchaURL &&
                            <>
                                <div className={styleModule.captchaBlock}>
                                    <img src={captchaURL} alt="Captcha"/>
                                </div>
                                <div className={styleModule.formElement}>
                                    <Field type="text"
                                           name="captcha"
                                           component={InputTextSecondary}
                                           placeholder={'Type the code from the image'}
                                           validate={composeValidators(requiredField)}/>
                                </div>
                            </>
                            }

                            <div className={`${styleModule.formElement} ${styleModule.submitButton}`}>
                                <Button name={'Login'}
                                        disabled={isSubmitting}/>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
            <span>© Copyright 2022 By Linkspace</span>
        </div>
    );
})

const CheckBoxField = memo((props: any) => {
    return (
        <Checkbox {...props} id={"remember_me"}
                  bgColor={'#68ACBA'}>
            Remember Me
        </Checkbox>
    )
})






