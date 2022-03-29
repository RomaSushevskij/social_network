import React from 'react';
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";
import {Navigate} from 'react-router-dom'


const mapStateToPropsAuth = (state:AppStateType):WithAuthRedirectComponentType => ({
    isAuth:state.auth.isAuth
})
type WithAuthRedirectComponentType = {
    isAuth:boolean
}

export const withAuthRedirect = (WrappedComponent: typeof React.Component | React.FC) => {

    const WithAuthRedirectComponent = (props:WithAuthRedirectComponentType) => {
        if(!props.isAuth) {
            return <Navigate to={'/login'}/>
        }
        return (
            <WrappedComponent {...props}/>
        )
    }
    return connect(mapStateToPropsAuth)(WithAuthRedirectComponent)
}