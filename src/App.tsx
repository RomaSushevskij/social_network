import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";


function App() {
    return (
        <div className="app_wrapper">
            <Header/>
            <Navbar/>
            <div className="app_wrapper_content">
                <Profile/>
            </div>
        </div>
    );
}

export default App;
