import React, {memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../../redux/redux-store';
import {useNavigate} from 'react-router-dom';
import {useFormik} from 'formik';
import {UploadProfileModelType} from '../../../api/api';
import {updateProfile} from '../../../redux/redusers/profileReducer/profileReducer';
import styleModule from './ProfileSettingsForm.module.scss';
import {Preloader} from '../../generic/Preloader/Preloader';
import InputTextSecondary from '../../generic/InputTextSecondary/InputTextSecondary';
import {TextareaSecondary} from '../../generic/TextareaSecondary/TextareaSecondary';
import {Checkbox} from '../../generic/Checkbox/Checkbox';
import {Button} from '../../generic/Button/Button';

export const ProfileSettingsForm = memo(() => {
    const fullName = useSelector((state: AppStateType) => state.profilePage.profile?.fullName)
    const userId = useSelector((state: AppStateType) => state.profilePage.profile?.userId)
    const aboutMe = useSelector((state: AppStateType) => state.profilePage.profile?.aboutMe)
    const lookingForAJob = useSelector((state: AppStateType) => state.profilePage.profile?.lookingForAJob)
    const lookingForAJobDescription = useSelector((state: AppStateType) => state.profilePage.profile?.lookingForAJobDescription)
    const isFetching = useSelector((state: AppStateType) => state.usersPage.isFetching);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            fullName: fullName,
            aboutMe: aboutMe as string,
            lookingForAJob: lookingForAJob,
            lookingForAJobDescription: lookingForAJobDescription as string,
        },
        onSubmit: values => {
            const profileModel: UploadProfileModelType = {
                fullName: values.fullName,
                aboutMe: values.aboutMe,
                lookingForAJob: values.lookingForAJob,
                lookingForAJobDescription: values.lookingForAJobDescription,
                userId: userId
            }
            dispatch(updateProfile(profileModel, navigate))
        },
        validate: values => {
            const errors: Partial<UploadProfileModelType> = {};
            if (!values.fullName) {
                errors.fullName = 'Field is required';
            }
            if (!values.aboutMe) {
                errors.aboutMe = 'Field is required';
            }
            return errors;
        }
    });
    const isSubmitButtonDisabled = formik.errors.fullName || formik.errors.aboutMe;
    return (
        <div className={styleModule.settingsFormWrapper}>
            <div className={styleModule.description}>
                <h3>Basic</h3>
                <p>Basic settings for your profile...</p>
            </div>
            <div className={styleModule.settingsFormContainer}>
                <form onSubmit={formik.handleSubmit}>
                    {isFetching ? <Preloader size={'30px'} color={'#EC4899'}/> :
                        <>
                            <div className={styleModule.field}>
                                <p className={styleModule.fieldTitle}>
                                    Full name
                                </p>
                                <InputTextSecondary placeholder={'Your name...'}
                                                    {...formik.getFieldProps('fullName')}
                                                    error={formik.errors.fullName}
                                                    className={!formik.errors.fullName ? styleModule.border : ''}/>
                            </div>
                            <div className={styleModule.field}>
                                <p className={styleModule.fieldTitle}>
                                    About me
                                </p>
                                <TextareaSecondary placeholder={'A few words about myself...'}
                                                   {...formik.getFieldProps('aboutMe')}
                                                   error={formik.errors.aboutMe}
                                                   className={!formik.errors.aboutMe ? styleModule.border : ''}/>
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
                                                   className={!formik.errors.lookingForAJobDescription ?
                                                       `${styleModule.optionalField} ${styleModule.border}` :
                                                       styleModule.optionalField}/>
                            </div>
                            <Button type={'submit'} name={'Save'} disabled={!!isSubmitButtonDisabled}/>
                        </>
                    }
                </form>
            </div>
        </div>
    )
})