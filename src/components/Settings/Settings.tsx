import React from "react";
import styleModule from './Settings.module.css';
import {UnderConstruction} from "../generic/UnderConstruction/UnderConstruction";
import {Navigate} from "react-router-dom";

type SettingsPropType = {
    isAuth:boolean
}

export function Settings(props:SettingsPropType) {
    if (!props.isAuth) {
        return (
            <Navigate to={'/login'}/>
        )
    }
    return (
        <div>
            <UnderConstruction/>
        </div>
    );
}

