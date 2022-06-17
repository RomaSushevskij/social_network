import React, {memo} from "react";
import styleModule from './LoginForm.module.css';
import {Button} from "../../generic/Button/Button";
import {Checkbox} from "../../generic/Checkbox/Checkbox";
import {useFormik} from "formik";
import {LoginWithApiPropsType} from '../../Login/Login';
import s from '../../generic/InputText/InputText.module.css';
import {CSSTransition} from 'react-transition-group';
import InputTextSecondary from '../../generic/InputTextSecondary/InputTextSecondary';

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormPropsType = LoginWithApiPropsType

export const LoginForm = memo(({login, errorMessage, captchaURL}: LoginFormPropsType) => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: true,
            captcha: ''
        },
        onSubmit: (values: LoginFormValuesType) => {
            const {email, password, rememberMe, captcha} = values;
            login(email, password, rememberMe, captcha)
        },
        validate: values => {
            const errors: Partial<LoginFormValuesType> = {};
            if (!values.email) {
                errors.email = 'Field is required';
            }
            if (!values.password) {
                errors.password = 'Field is required';
            }
            if (captchaURL && !values.captcha) {
                errors.captcha = 'Field is required';
            }
            return errors;

        }
    });
    return (
        <div className={styleModule.wrapperLoginForm}>
            <form className={styleModule.formWrapper}
                  onSubmit={formik.handleSubmit}>
                <CSSTransition in={!!errorMessage}
                               timeout={300}
                               classNames={s}
                               unmountOnExit
                               mountOnEnter>
                    <div className={styleModule.formErrorBlock}>{errorMessage}</div>
                </CSSTransition>
                <div className={styleModule.title}>Log in</div>
                <div className={styleModule.formElement}>
                    <InputTextSecondary type="email"
                                        placeholder={'Login'}
                                        {...formik.getFieldProps('email')}
                                        error={formik.errors.email}/>
                </div>
                <div className={styleModule.formElement}>
                    <InputTextSecondary type="password"
                                        placeholder={'Password'}
                                        {...formik.getFieldProps('password')}
                                        error={formik.errors.password}/>
                </div>
                <div className={`${styleModule.formElement} ${styleModule.checkMark}`}>
                    <Checkbox id={"remember_me"}
                              type="checkbox"
                              {...formik.getFieldProps('rememberMe')}>
                        Remember Me
                    </Checkbox>

                </div>
                {!!captchaURL &&
                <>
                    <div className={styleModule.captchaBlock}>
                        <img src={captchaURL} alt="Captcha"/>
                    </div>
                    <div className={styleModule.formElement}>
                        <InputTextSecondary type="text"
                                            placeholder={'Type the code from the image'}
                                            {...formik.getFieldProps('captcha')}
                                            error={formik.errors.captcha}/>
                    </div>
                </>
                }
                <div className={`${styleModule.formElement} ${styleModule.submitButton}`}>
                    <Button name={'Login'}
                            type={'submit'}/>
                </div>
            </form>
            <span>© Copyright 2022 By Linkspace</span>
        </div>
    );
})







