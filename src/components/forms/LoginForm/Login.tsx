import React from "react";
import styleModule from './LoginForm.module.css';
import InputText from "../../generic/InputText/InputText";
import {Button} from "../../generic/Button/Button";
import Checkbox from "../../generic/Checkbox/Checkbox";
import {Field, Form, Formik} from "formik";

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export function LoginForm() {
    const onSubmitGHandler = (values: LoginFormValuesType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        console.log(values)
        setSubmitting(false)
    }
    return (
        <div className={styleModule.wrapperLoginForm}>
            <div className={styleModule.title}>login</div>
            <Formik
                initialValues={{email: '', password: '', rememberMe: true}}
                onSubmit={onSubmitGHandler}>
                {({isSubmitting}) => (
                    <Form className={styleModule.formWrapper}>
                        <div className={styleModule.formElement}>
                            <Field type="email"
                                   name="email"
                                   component={InputText}
                                   placeholder={'Login'}/>

                        </div>
                        <div className={styleModule.formElement}>
                            <Field type="password"
                                   name="password"
                                   component={InputText}
                                   placeholder={'Password'}/>
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



