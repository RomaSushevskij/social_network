import React from "react";
import styleModule from './LoginForm.module.css';
import InputText from "../../generic/InputText/InputText";
import {Button} from "../../generic/Button/Button";
import Checkbox from "../../generic/Checkbox/Checkbox";


export function LoginForm(props: any) {

    return (
        <div className={styleModule.wrapperLoginForm}>
            <form className={styleModule.formWrapper}>
                <div className={styleModule.formElement}>
                    <InputText type={'text'} placeholder={'Login'}/>
                </div>
                <div className={styleModule.formElement}>
                    <InputText type={'password'} placeholder={'Password'}/>
                </div>
                <div className={`${styleModule.formElement} ${styleModule.checkMark}`}>
                    <Checkbox id={"remember_me"}>
                        {'Remember me'}
                    </Checkbox>
                </div>
                <div className={styleModule.formElement}>
                    <Button name={'Login'}
                            onClick={() => {
                            }}/>
                </div>
            </form>
        </div>
    );
}



