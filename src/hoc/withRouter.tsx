//hoc for getting params
import React from "react";
import {useParams} from "react-router-dom";

export const withRouter = (WrappedComponent: typeof React.Component | React.FC) => {
    const ComponentWithRouter = (props: object) => {
        const params = useParams<'*'>() //... <= profile/*
        return (
            <WrappedComponent {...props} params={params}/>
        )
    }
    return ComponentWithRouter
}