//hoc for getting params
import React from "react";
import {useParams, useNavigate} from "react-router-dom";

export const withRouter = (WrappedComponent: typeof React.Component | React.FC) => {
    const ComponentWithRouter = (props: object) => {
        const params = useParams<'*'>() //... <= profile/*
        const navigate = useNavigate();
        return (
            <WrappedComponent {...props} params={params} navigate={navigate}/>
        )
    }
    return ComponentWithRouter
}