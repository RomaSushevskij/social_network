import React from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Music} from "./components/Music/Music";
import {News} from "./components/News/News";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {Login} from "./components/Login/Login";
import {connect} from 'react-redux';
import {AppStateType} from './redux/redux-store';
import {initializeApp} from './redux/redusers/app/appReducer';
import {Preloader} from './components/generic/Preloader/Preloader';
import {getAppError, getAppMessage, getInitializedSelector} from './redux/selectors/appSelectors';
import {faGlobe} from '@fortawesome/free-solid-svg-icons/faGlobe';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {getIsAuthSelector} from './redux/selectors/authSelectors';
import {withSuspense} from './hoc/withSuspense';
import {SNACK_BAR_TYPES, SnackBar} from './components/generic/SnackBar/SnackBar';


const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer').then(({default: UsersContainer}) => ({default: UsersContainer})));
const Settings = React.lazy(() => import('./components/Settings/Settings').then(({default: Settings}) => ({default: Settings})));
const UsersContainerLazy = withSuspense(UsersContainer);
const SettingsLazy = withSuspense(Settings);


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
    SETTINGS: '/settings/*',
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
        const {appError, appMessage} =this.props
        if (!this.props.initialized) {
            return (
                <div style={{height: '100vh'}}>
                    <Preloader size={'30px'} color={'#5B48E3'}/>
                </div>
            )
        }

        return (
            <>
                {this.props.isAuth ?
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
                                <Route path={PATH.USERS} element={<UsersContainerLazy/>}/>
                                <Route path={PATH.SETTINGS} element={<SettingsLazy/>}/>
                                <Route path={PATH.LOGIN} element={<Login/>}/>
                            </Routes>
                        </div>
                    </div> : <Login/>
                }
                {/*<SnackBar message={appError} type={SNACK_BAR_TYPES.ERROR}/>*/}
                <SnackBar message={appMessage} type={SNACK_BAR_TYPES.SUCCESS}/>
            </>
        )
    }
}

export type AppAPIContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    initialized: boolean
    isAuth: boolean
    appError:string
    appMessage:string
}
type MapDispatchToPropsType = {
    initializeApp: () => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        initialized: getInitializedSelector(state),
        isAuth: getIsAuthSelector(state),
        appError: getAppError(state),
        appMessage:getAppMessage(state),
    }
};

export default connect(mapStateToProps, {initializeApp} as MapDispatchToPropsType)(App);
