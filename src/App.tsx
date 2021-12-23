import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {Music} from "./components/Music/Music";
import {News} from "./components/News/News";
import {Settings} from "./components/Settings/Settings";
import {StateType} from "./redux/state";


export type AppPropsType = {
    state: StateType
    addNewPost: () => void
    addNewMessage: () => void
    updateNewPostText: (newPostText: string) => void
    updateNewMessageText: (newMessageText: string) => void
}

function App(props: AppPropsType) {
    return (
        <BrowserRouter>
            <div className="app_wrapper">
                <Header/>
                <Navbar/>
                <div className="app_wrapper_content">
                    <Routes>
                        <Route path='/' element={<Navigate to={'profile'}/>}/><Route/>
                        <Route path='/profile' element={<Profile profilePage={props.state.profilePage}
                                                                 addNewPost={props.addNewPost}
                                                                 updateNewPostText={props.updateNewPostText}/>}/>
                        <Route path='/dialogs/*' element={<Dialogs dialogsPage={props.state.dialogsPage}
                                                                   addNewMessage={props.addNewMessage}
                                                                   updateNewMessageText={props.updateNewMessageText}/>}/>
                        <Route path='/music' element={<Music/>}/>
                        <Route path='/news' element={<News/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
