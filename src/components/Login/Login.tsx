import React from "react";
import styleModule from './Login.module.css';
import {LoginForm} from "../forms/LoginForm/LoginForm";
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {Navigate} from 'react-router-dom';
import {getIsFetchingSelector} from '../../redux/selectors/usersSelectors';
import {getCaptchaURL, getIsAuthSelector} from '../../redux/selectors/authSelectors';
import {Preloader} from '../generic/Preloader/Preloader';
import {Sticker} from '../generic/Sticker/Sticker';
import {login} from "../../redux/sagas/auth/authSagas";

export type LoginWithApiPropsType =
    MapStateToPropsType &
    MapDispatchToProps

export function LoginWithApi(props: LoginWithApiPropsType) {
    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div className={styleModule.wrapperLogin}>
            <div className={styleModule.stickerBlock}>
                <Sticker/>
            </div>
            {props.isFetching ? <Preloader size={'30px'} color={'#EC4899'}/> : <LoginForm {...props}/>}
        </div>
    );
}

type MapStateToPropsType = {
    isAuth: boolean
    isFetching: boolean
    captchaURL: string
}
type MapDispatchToProps = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: getIsAuthSelector(state),
    isFetching: getIsFetchingSelector(state),
    captchaURL: getCaptchaURL(state),
})

export const Login = connect(mapStateToProps, {login} as MapDispatchToProps)(LoginWithApi)



