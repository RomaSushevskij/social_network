import React, {FormEvent, KeyboardEvent} from "react";
import styleModule from './LoginForm.module.css';
import InputText from "../../generic/InputText/InputText";
import {Button} from "../../generic/Button/Button";
import Checkbox from "../../generic/Checkbox/Checkbox";
import {Field, Form, Formik} from "formik";
import {composeValidators, maxLength, requiredField} from '../../../utils/validators';
import {LoginWithApiPropsType} from '../../Login/Login';
import s from '../../generic/InputText/InputText.module.css';
import {CSSTransition} from 'react-transition-group';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

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
    return (
        <div className={styleModule.wrapperLoginForm}>
            <div className={styleModule.title}>login</div>
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
                        <div className={styleModule.formElement}>
                            <Field type="email"
                                   name="email"
                                   component={InputText}
                                   placeholder={'Login'}
                                   validate={composeValidators(requiredField, maxLength30)}/>

                        </div>
                        <div className={styleModule.formElement}>
                            <Field type="password"
                                   name="password"
                                   component={InputText}
                                   placeholder={'Password'}
                                   validate={composeValidators(requiredField, maxLength30)}/>
                        </div>
                        <div className={`${styleModule.formElement} ${styleModule.checkMark}`}>
                            <Field type="checkbox"
                                   name="rememberMe"
                                   component={CheckBoxField}/>
                        </div>
                        <div className={styleModule.formElement}>
                            <Button name={'Login'}
                                    disabled={isSubmitting}/>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

const CheckBoxField = (props: any) => {
    return (
        <Checkbox {...props} id={"remember_me"}
                  bgColor={'#68ACBA'}>
            {'Remember me'}
        </Checkbox>
    )
}






