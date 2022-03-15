import React from "react";
import styleModule from './Settings.module.css';
import {UnderConstruction} from "../generic/UnderConstruction/UnderConstruction";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

function Settings(props:any) {
       return (
        <div>
            <UnderConstruction/>
        </div>
    );
}

export const SettingsContainer = withAuthRedirect(Settings)

