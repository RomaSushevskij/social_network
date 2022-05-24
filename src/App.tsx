import React from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Music} from "./components/Music/Music";
import {News} from "./components/News/News";
import {SettingsContainer} from "./components/Settings/Settings";
import logo from './main-logo.png';
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {UsersContainer} from "./components/Users/UsersContainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {Login} from "./components/Login/Login";
import {connect} from 'react-redux';
import {AppStateType} from './redux/redux-store';
import {initializeApp} from './redux/redusers/app/appReducer';
import {Preloader} from './components/generic/Preloader/Preloader';
import {getInitializedSelector} from './redux/selectors/appSelectors';
import {faGlobe} from '@fortawesome/free-solid-svg-icons/faGlobe';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


export type PATHType = {
    PROFILE: string
    DIALOGS: string
    MUSIC: string
    NEWS: string
    USERS: string
    SETTINGS: string
    LOGIN: string
}
export const PATH: PATHType = {
    PROFILE: '/profile/*',
    DIALOGS: '/dialogs/*',
    MUSIC: '/music',
    NEWS: '/news',
    USERS: '/users',
    SETTINGS: '/settings',
    LOGIN: '/login',
};

export const HEADER_STYLE = {
    background: '#ffffff',
    color: '#3B3E43',
    logo: <FontAwesomeIcon icon={faGlobe}/>
};

class App extends React.Component<AppAPIContainerPropsType> {
    componentDidMount(): void {
        const {initializeApp} = this.props
        initializeApp()
    }

    render() {
        if(!this.props.initialized) {
            return <Preloader size={'60px'} color={'#ffffff'}/>
        }
        return (
            <div className="app_wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app_wrapper_content">
                    <Routes>
                        <Route path='/' element={<Navigate to={PATH.PROFILE}/>}/>
                        <Route path={PATH.PROFILE} element={<ProfileContainer/>}/>
                        <Route path={PATH.DIALOGS} element={<DialogsContainer/>}/>
                        <Route path={PATH.MUSIC} element={<Music/>}/>
                        <Route path={PATH.NEWS} element={<News/>}/>
                        <Route path={PATH.USERS} element={<UsersContainer/>}/>
                        <Route path={PATH.SETTINGS} element={<SettingsContainer/>}/>
                        <Route path={PATH.LOGIN} element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

export type AppAPIContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    initialized: boolean
}
type MapDispatchToPropsType = {
    initializeApp: () => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        initialized: getInitializedSelector(state)
    }
};

export default connect(mapStateToProps, {initializeApp} as MapDispatchToPropsType)(App);
