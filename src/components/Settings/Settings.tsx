import React, {memo, useEffect} from "react";
import styleModule from './Settings.module.scss';
import {NavLink, Route, Routes, useNavigate} from 'react-router-dom';
import {ContactsSettingsForm} from '../forms/ContactsForm/ContactsSettingsForm';
import {ProfileSettingsForm} from '../forms/ProfileUpdateForm/ProfileSettingsForm';

const Settings = memo((props: any) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/settings/profile')
    }, [])
    return (
        <div className={styleModule.settingsWrapper}>
            <div className={styleModule.title}>
                Account Setting
            </div>
            <div className={styleModule.links}>
                <NavLink to={'/settings/profile'}

                         className={l => l.isActive ? styleModule.activeLink : ''}>
                    Profile
                </NavLink>
                <NavLink to={'/settings/contacts'}
                         className={l => l.isActive ? styleModule.activeLink : ''}>
                    Contacts
                </NavLink>
            </div>
            <Routes>
                <Route path={'profile'} element={<ProfileSettingsForm/>}/>
                <Route path={'contacts'} element={<ContactsSettingsForm/>}/>
            </Routes>
        </div>
    );
})
export default Settings;
