import React, {memo, useEffect} from "react";
import styleModule from './Settings.module.scss';
import {NavLink, Route, Routes, useNavigate} from 'react-router-dom';
import InputTextSecondary from '../generic/InputTextSecondary/InputTextSecondary';
import {TextareaSecondary} from '../generic/TextareaSecondary/TextareaSecondary';
import {Checkbox} from '../generic/Checkbox/Checkbox';
import {useFormik} from 'formik';
import {Button} from '../generic/Button/Button';
import {useSelector} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';

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

export const ProfileSettingsForm = memo(() => {
    const fullName = useSelector((state: AppStateType) => state.profilePage.profile?.fullName)
    const aboutMe = useSelector((state: AppStateType) => state.profilePage.profile?.aboutMe)
    const lookingForAJob = useSelector((state: AppStateType) => state.profilePage.profile?.lookingForAJob)
    const lookingForAJobDescription = useSelector((state: AppStateType) => state.profilePage.profile?.lookingForAJobDescription)
    const formik = useFormik({
        initialValues: {
            fullName: fullName,
            aboutMe: aboutMe,
            lookingForAJob: lookingForAJob,
            lookingForAJobDescription: lookingForAJobDescription,
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <div className={styleModule.settingsFormWrapper}>
            <form onSubmit={formik.handleSubmit}>
                <div className={styleModule.field}>
                    <p className={styleModule.fieldTitle}>
                        Full name
                    </p>
                    <InputTextSecondary placeholder={'Your name...'}
                                        {...formik.getFieldProps('fullName')}/>
                </div>
                <div className={styleModule.field}>
                    <p className={styleModule.fieldTitle}>
                        About me
                    </p>
                    <TextareaSecondary placeholder={'A few words about myself...'}
                                       {...formik.getFieldProps('aboutMe')}/>
                </div>
                <div className={`${styleModule.field} ${styleModule.checkbox}`}>
                    <p className={styleModule.fieldTitle}>
                        Looking for a job
                    </p>
                    <Checkbox {...formik.getFieldProps('lookingForAJob')}
                              checked={formik.values.lookingForAJob}>
                        Looking for a job
                    </Checkbox>
                </div>
                <div className={styleModule.field}>
                    <p className={styleModule.fieldTitle}>
                        Job description
                    </p>
                    <TextareaSecondary placeholder={'Description of the job you are looking for...'}
                                       {...formik.getFieldProps('lookingForAJobDescription')}
                                       disabled={!formik.values.lookingForAJob}
                                       className={styleModule.optionalField}/>
                </div>
                <Button type={'submit'} name={'Save'}/>
            </form>
        </div>
    )
})


export const ContactsSettingsForm = memo(() => {
    const contacts = useSelector((state: AppStateType) => state.profilePage.profile?.contacts)
    const contactsTitles = contacts && Object.keys(contacts);
    const formik = useFormik({
        initialValues: {
            ...contacts
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <div className={styleModule.settingsFormWrapper}>
            <form onSubmit={formik.handleSubmit}>
                {contactsTitles && contactsTitles.map(key => {
                        return (
                            <div className={styleModule.field}
                                 key={key}>
                                <p className={styleModule.fieldTitle}>
                                    {`${key[0].toUpperCase()}${key.slice(1)}`}
                                </p>
                                <InputTextSecondary placeholder={`${key}...`}
                                                    {...formik.getFieldProps(key)}/>
                            </div>
                        )
                    }
                )}
                <Button type={'submit'} name={'Save'}/>
            </form>
        </div>

    )
})

export default Settings;
