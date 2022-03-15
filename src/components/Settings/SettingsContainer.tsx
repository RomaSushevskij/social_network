import {Settings} from "./Settings";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";


export const SettingsContainer = (props:any) => {
    const isAuth = useSelector((state:AppStateType) => state.auth.isAuth)
    return (
        <Settings isAuth={isAuth}/>
    )
}