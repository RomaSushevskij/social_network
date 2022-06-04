import React, {ChangeEvent, useRef, useState} from "react";
import styleModule from './ProfileInfo.module.css';
import {ProfileAPIContainerPropsType} from "../ProfileContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Avatar} from '../../generic/Avatar/Avatar';
import userAvatar from '../../../assets/user-solid.svg'
import {Button} from '../../generic/Button/Button';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../../redux/redux-store';
import {addDialog} from '../../../redux/redusers/dialogsReducer/dialogsReducer';
import {ProfileStatusHooks} from '../ProfileStatusHooks/ProfileStatusHooks';
import {faCamera} from '@fortawesome/free-solid-svg-icons/faCamera';

type ProfileInfoPropsType = ProfileAPIContainerPropsType

export const ProfileInfo = React.memo(({
                                           profile,
                                           status,
                                           updateStatus,
                                       }: ProfileInfoPropsType) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const myUserId = useSelector((state: AppStateType) => state.auth.id);
    const newDialogId = useSelector((state: AppStateType) => state.dialogsPage.dialogsData.length + 1);
    const params = useParams();
    const isMyProfile = params['*'] === myUserId?.toString() || params['*'] === '*' || !params['*'];
    const onSendMessageHandler = () => {
        dispatch(addDialog(profile?.fullName as string, profile?.userId as number, profile?.photos.small as string))
        navigate(`/dialogs/${newDialogId}`)
    }
    const inputRef = useRef<HTMLInputElement>(null)
    const [hover, setHover] = useState(false);
    const onChangePhoto = (e: ChangeEvent<HTMLInputElement>) => {

    }
    return (
        <div className={styleModule.profileInfo}>
            <div className={styleModule.avatar}>
                {isMyProfile ?
                    <div onMouseOver={() => setHover(true)}
                         onMouseOut={() => setHover(false)}
                         className={styleModule.avatarWrapper}>
                        <Avatar photo={profile?.photos.large || userAvatar}
                                style={{width: '200px', height: '200px'}}/>
                        <div className={hover ?
                            `${styleModule.uploadAvatar} ${styleModule.hover}`
                            : styleModule.uploadAvatar}>
                            <FontAwesomeIcon icon={faCamera}
                                             className={styleModule.uploadAvatarIcon}
                                             onClick={() => inputRef.current?.click()}/>
                            <input ref={inputRef} type="file" onChange={onChangePhoto}/>
                        </div>
                    </div> : <Avatar photo={profile?.photos.large || userAvatar}
                                     style={{width: '200px', height: '200px'}}/>
                }
            </div>
            <div className={styleModule.description}>
                <div className={styleModule.fullName}>{profile?.fullName}</div>
                <div className={styleModule.status}>
                    <span className={styleModule.title}>Status:</span>
                    <div className={styleModule.statusContent}>
                        {isMyProfile ? <ProfileStatusHooks status={status} updateStatus={updateStatus}/> :
                            <span className={styleModule.withoutEdit}>{status}</span>
                        }
                    </div>
                </div>

                <div className={styleModule.aboutMe}>
                    <span className={styleModule.title}>About me:</span> {profile?.aboutMe}
                </div>
                <div className={styleModule.lookingForAJob}>
                    <div className={styleModule.statusJob}>
                        <span className={styleModule.title}>Open to work:</span>
                        <div className={styleModule.logo}>{profile?.lookingForAJob ?
                            <FontAwesomeIcon icon={faCheck} className={styleModule.iconYes}/> :
                            <FontAwesomeIcon icon={faTimes} className={styleModule.iconNot}/>}
                        </div>
                    </div>
                    <div className={styleModule.descriptionJob}>
                            <span
                                className={styleModule.title}>Job description:</span> {profile?.lookingForAJobDescription}
                    </div>
                </div>
                {!isMyProfile && <div className={styleModule.buttonsBlock}>
                    <Button name={'Send message'}
                            onClick={onSendMessageHandler}/>
                </div>}
            </div>
        </div>
    )
});

