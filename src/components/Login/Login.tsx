import React from "react";
import styleModule from './Login.module.css';
import {LoginForm} from "../forms/LoginForm/LoginForm";
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {login} from '../../redux/redusers/auth/authReducer';
import {Navigate} from 'react-router-dom';

export type LoginWithApiPropsType =
    MapStateToPropsType &
    MapDispatchToProps

export function LoginWithApi(props: LoginWithApiPropsType) {
    if (props.isAuth) {

        return <Navigate to={'/profile'}/>
    }
    return (
        <div className={styleModule.wrapperLogin}>
            <LoginForm {...props}/>
        </div>
    );
}

type MapStateToPropsType = {
    isAuth: boolean
}
type MapDispatchToProps = {
    login: (email: string, password: string, rememberMe: boolean) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export const Login = connect(mapStateToProps, {login} as MapDispatchToProps)(LoginWithApi)



