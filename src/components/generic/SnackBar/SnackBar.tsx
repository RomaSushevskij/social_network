import style from './SnackBar.module.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useEffect, useRef, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import {NullableType} from '../../../redux/redux-store';
import {setAppError, setAppMessage} from '../../../redux/redusers/app/appReducer';
import {useDispatch} from 'react-redux';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons/faCircleExclamation';


export enum SNACK_BAR_TYPES {
    ERROR = 'error',
    SUCCESS = 'success'
}

export enum MESSAGES_FOR_SUCCESS_BAR {
    NOTHING = '',
    LOGGED_IN_SUCCESSFULLY = 'Logged in successfully',
    REGISTRATION_COMPLETED_SUCCESSFULLY = 'Registration completed successfully',
    PASSWORD_CHANGED_SUCCESSFULLY = 'Password changed successfully',
    STATUS_CHANGED_SUCCESSFULLY = 'Status changed successfully',
    PROFILE_UPDATED_SUCCESSFULLY = 'Profile updated successfully',
    CONTACTS_UPDATED_SUCCESSFULLY = 'Contacts updated successfully',
    YOUR_PHOTO_UPDATED_SUCCESSFULLY = 'Your photo updated successfully',
}

type ErrorBarPropsType = {
    message: string
    type: SNACK_BAR_TYPES
}

export const SnackBar = ({message, type,}: ErrorBarPropsType) => {
    //property on which the display of the SnackBar depends
    const [isShowError, setIsShowError] = useState(false);
    const dispatch = useDispatch();
    const nodeRef = useRef(null);

    //synchronization appError and isShowError
    useEffect(() => {
        if (!!message) {
            setIsShowError(true)
        }
    }, [message]);

    //closing SnackBar by click and than clear appError after some time
    let closeTimerId = useRef<NullableType<ReturnType<typeof setTimeout>>>(null);
    const onCloseErrorBarHandler = () => {
        setIsShowError(false);
        closeTimerId.current = setTimeout(() => {
            type === SNACK_BAR_TYPES.ERROR && dispatch(setAppError(''))
            type === SNACK_BAR_TYPES.SUCCESS && dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.NOTHING))

        }, 300)
    };

    //closing SnackBar after some time
    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setIsShowError(false);
        }, 4000);
        return () => {
            clearTimeout(timeoutID);
            clearTimeout(closeTimerId.current as ReturnType<typeof setTimeout>);
        }
    }, []);

    //clear appError after some time
    useEffect(() => {
        const timeoutID = setTimeout(() => {
            if (type === SNACK_BAR_TYPES.ERROR) {
                dispatch(setAppError(''))
            }
            if (type === SNACK_BAR_TYPES.SUCCESS) {
                dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.NOTHING))
            }
        }, 4400);
        return () => {
            clearTimeout(timeoutID);
        }
    }, []);

    const finalClassName = type === SNACK_BAR_TYPES.SUCCESS ?
        `${style.snackBarWrapper} ${style.successBarWrapper}` :
        SNACK_BAR_TYPES.ERROR ? `${style.snackBarWrapper} ${style.errorBarWrapper}` : style.snackBarWrapper;

    return (
        <CSSTransition
            in={isShowError}
            timeout={300}
            classNames={style}
            unmountOnExit
            mountOnEnter
            nodeRef={nodeRef}
        >
            <div className={finalClassName}
                 ref={nodeRef}>
                <div className={style.icon}>
                    <FontAwesomeIcon icon={type === SNACK_BAR_TYPES.SUCCESS ? faCircleCheck : faCircleExclamation}/>
                </div>
                <p>{message}</p>
                <div className={style.closeSnackBar}
                     onClick={onCloseErrorBarHandler}>
                    <FontAwesomeIcon icon={faXmark}/>
                </div>
            </div>
        </CSSTransition>
    )
};