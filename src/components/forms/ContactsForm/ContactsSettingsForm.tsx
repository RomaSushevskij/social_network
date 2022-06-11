import React, {memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../../redux/redux-store';
import {useNavigate} from 'react-router-dom';
import {useFormik} from 'formik';
import {updateContacts} from '../../../redux/redusers/profileReducer/profileReducer';
import styleModule from './ContactsSettingsForm.module.scss';
import {Preloader} from '../../generic/Preloader/Preloader';
import InputTextSecondary from '../../generic/InputTextSecondary/InputTextSecondary';
import {Button} from '../../generic/Button/Button';

export const ContactsSettingsForm = memo(() => {
    const contacts = useSelector((state: AppStateType) => state.profilePage.profile?.contacts)
    const isFetching = useSelector((state: AppStateType) => state.usersPage.isFetching);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const contactsTitles = contacts && Object.keys(contacts);
    const formik = useFormik({
        initialValues: {
            ...contacts
        },
        onSubmit: values => {
            dispatch(updateContacts(values, navigate))
        },
    });
    return (
        <div className={styleModule.settingsFormWrapper}>
            <div className={styleModule.description}>
                <h3>Social links</h3>
                <p>Here you can enter your contacts...</p>
            </div>
            <div className={styleModule.settingsFormContainer}>
                <form onSubmit={formik.handleSubmit}>
                    {isFetching ? <Preloader size={'30px'} color={'#EC4899'}/> :
                        <>
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
                            < Button type={'submit'} name={'Save'}/>
                        </>}
                </form>
            </div>
        </div>
    )
})