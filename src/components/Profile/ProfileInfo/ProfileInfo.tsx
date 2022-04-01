import React from "react";
import styleModule from './ProfileInfo.module.css';
import top_wallpaper from "../../../top-wallpaper.jpg";
import logo_avatar from '../../../usersAvatars/user.png';
import {ProfileAPIContainerPropsType} from "../ProfileContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {ProfileStatus} from "../ProfileStatus/ProfileStatus";

type ProfileInfoPropsType = ProfileAPIContainerPropsType

export const ProfileInfo = React.memo(({
                                           profile,
                                           status,
                                           updateStatus,
                                       }: ProfileInfoPropsType) => {

    return (
        <div className={styleModule.profileInfo}>
            <div className={styleModule.top_wallpaper}>
                <img src={top_wallpaper} alt="top_wallpaper"/>
            </div>
            <div className={styleModule.avatarAndFullName}>
                <div className={styleModule.image}>
                    <img src={profile?.photos.large || logo_avatar}/>
                </div>
                <div className={styleModule.fullName}>{profile?.fullName}</div>

                {/*кнопка изменения фото*/}
                {/*{isOwner &&
                <div className={styleModule.editMainPhoto}>
                    <input onChange={onChangeAvatarPhoto} type="file"/>
                    <label>
                        <svg height="20" viewBox="0 0 512 512">
                            <path
                                d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"></path>
                        </svg>
                    </label>
                </div>}*/}

            </div>
            <div className={styleModule.description}>

                {/*{!editProfileMode &&*/}

                <div className={styleModule.wrapper_description}>


                    {/*<ProfileStatus status={status} updateStatus={updateStatus}/>*/}
                    <ProfileStatus status={status} updateStatus={updateStatus}/>
                    <div className={styleModule.aboutMe}>{profile?.aboutMe}</div>

                    <div className={styleModule.lookingForAJob}>
                        <div className={styleModule.statusJob}>
                            <div className={styleModule.heading}>OPEN TO WORK:</div>
                            <div className={styleModule.logo}>{profile?.lookingForAJob ?
                                <FontAwesomeIcon icon={faCheck} className={styleModule.iconYes}/> :
                                <FontAwesomeIcon icon={faTimes} className={styleModule.iconNot}/>}
                            </div>
                        </div>
                        <div className={styleModule.descriptionJob}>{profile?.lookingForAJobDescription}</div>
                    </div>


                    {/*{isOwner &&
                    <div className={styleModule.toEditMode}>
                        <button onClick={activateEditMode}>
                            <svg viewBox="0 0 469 469">
                                <path d="M438.931,30.403c-40.4-40.5-106.1-40.5-146.5,0l-268.6,268.5c-2.1,2.1-3.4,4.8-3.8,7.7l-19.9,147.4
		c-0.6,4.2,0.9,8.4,3.8,11.3c2.5,2.5,6,4,9.5,4c0.6,0,1.2,0,1.8-0.1l88.8-12c7.4-1,12.6-7.8,11.6-15.2c-1-7.4-7.8-12.6-15.2-11.6
		l-71.2,9.6l13.9-102.8l108.2,108.2c2.5,2.5,6,4,9.5,4s7-1.4,9.5-4l268.6-268.5c19.6-19.6,30.4-45.6,30.4-73.3
		S458.531,49.903,438.931,30.403z M297.631,63.403l45.1,45.1l-245.1,245.1l-45.1-45.1L297.631,63.403z M160.931,416.803l-44.1-44.1
		l245.1-245.1l44.1,44.1L160.931,416.803z M424.831,152.403l-107.9-107.9c13.7-11.3,30.8-17.5,48.8-17.5c20.5,0,39.7,8,54.2,22.4
		s22.4,33.7,22.4,54.2C442.331,121.703,436.131,138.703,424.831,152.403z"/>
                            </svg>
                        </button>
                    </div>
                    }*/}

                </div>

                {/*}*/}

                {/*{editProfileMode && <EditProfileForm onSubmit={onSubmit} profile={profile}
                                                     updateProfileDescription={updateProfileDescription}/>}

                <Contacts profile={profile} updateProfileDescription={updateProfileDescription} />*/}
            </div>
        </div>
    )
});

