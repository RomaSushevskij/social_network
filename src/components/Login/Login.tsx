import React from "react";
import styleModule from './Login.module.css';
import {LoginForm} from "../forms/LoginForm/Login";


export function Login(props: any) {

    return (
        <div className={styleModule.wrapperLogin}>
            <LoginForm/>
        </div>
    );
}



