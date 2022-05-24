import React from "react";
import styleModule from './ProfileInfo.module.css';
import {ProfileAPIContainerPropsType} from "../ProfileContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {ProfileStatus} from "../ProfileStatus/ProfileStatus";
import {Avatar} from '../../generic/Avatar/Avatar';
import userAvatar from '../../../assets/user-solid.svg'
import {Button} from '../../generic/Button/Button';

type ProfileInfoPropsType = ProfileAPIContainerPropsType

export const ProfileInfo = React.memo(({
                                           profile,
                                           status,
                                           updateStatus,
                                       }: ProfileInfoPropsType) => {

    return (
        <div className={styleModule.profileInfo}>
            <div className={styleModule.avatar}>
                <Avatar photo={profile?.photos.large || userAvatar}
                        style={{width: '200px', height: '200px'}}/>
            </div>
            <div className={styleModule.description}>
                <div className={styleModule.fullName}>{profile?.fullName}</div>
                <div className={styleModule.status}>
                    <span className={styleModule.title}>Status:</span>
                    <div className={styleModule.statusContent}>
                        <ProfileStatus status={status} updateStatus={updateStatus}/>
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
                <div className={styleModule.buttonsBlock}>
                    <Button name={'Follow'}/>
                    <Button name={'Send message'}/>
                </div>
            </div>
        </div>
    )
});

