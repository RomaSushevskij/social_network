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
import {Preloader} from '../../generic/Preloader/Preloader';

type ProfileInfoPropsType = ProfileAPIContainerPropsType

export const ProfileInfo = React.memo(({
                                           profile,
                                           status,
                                           updateStatus,
                                           updatePhoto,
                                           isFetching
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
        updatePhoto(e.currentTarget.files && e.currentTarget.files[0])
        setHover(false);
    }
    const onChangePhotoClick = () => {
        inputRef.current?.click();
        setHover(false);
    }
    const contactsTitles = profile?.contacts && Object.keys(profile?.contacts);
    return (
        <div className={styleModule.profileInfo}>
            <div className={styleModule.avatar}>
                {isMyProfile ?
                    <div onMouseOver={() => setHover(true)}
                         onMouseOut={() => setHover(false)}
                         className={styleModule.avatarWrapper}>
                        {isFetching ? <Preloader size={'20px'} color={'#EC4899'}/> :
                            <>
                                <Avatar photo={profile?.photos?.large || userAvatar}
                                        style={{width: '200px', height: '200px'}}/>
                                <div className={hover ?
                                    `${styleModule.uploadAvatar} ${styleModule.hover}`
                                    : styleModule.uploadAvatar}>
                                    <FontAwesomeIcon icon={faCamera}
                                                     className={styleModule.uploadAvatarIcon}
                                                     onClick={onChangePhotoClick}/>
                                    <input ref={inputRef} type="file" onChange={onChangePhoto}/>
                                </div>
                            </>}
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
                <div className={styleModule.contacts}>
                    <span className={styleModule.title}>Contacts:</span>
                    {contactsTitles && contactsTitles.map(c => {
                        //@ts-ignore
                        const contactTitle = profile?.contacts[c]
                        return (
                            <Contact key={c} logoSrc={c}
                                     contactTitle={contactTitle}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
});

const contactsLogos = {
    'facebook': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
            d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
    </svg>,
    'website': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
            d="M448 32C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM96 96C78.33 96 64 110.3 64 128C64 145.7 78.33 160 96 160H416C433.7 160 448 145.7 448 128C448 110.3 433.7 96 416 96H96z"/>
    </svg>,
    'vk': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path
            d="M31.4907 63.4907C0 94.9813 0 145.671 0 247.04V264.96C0 366.329 0 417.019 31.4907 448.509C62.9813 480 113.671 480 215.04 480H232.96C334.329 480 385.019 480 416.509 448.509C448 417.019 448 366.329 448 264.96V247.04C448 145.671 448 94.9813 416.509 63.4907C385.019 32 334.329 32 232.96 32H215.04C113.671 32 62.9813 32 31.4907 63.4907ZM75.6 168.267H126.747C128.427 253.76 166.133 289.973 196 297.44V168.267H244.16V242C273.653 238.827 304.64 205.227 315.093 168.267H363.253C359.313 187.435 351.46 205.583 340.186 221.579C328.913 237.574 314.461 251.071 297.733 261.227C316.41 270.499 332.907 283.63 346.132 299.751C359.357 315.873 369.01 334.618 374.453 354.747H321.44C316.555 337.262 306.614 321.61 292.865 309.754C279.117 297.899 262.173 290.368 244.16 288.107V354.747H238.373C136.267 354.747 78.0267 284.747 75.6 168.267Z"/>
    </svg>,
    'twitter': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
            d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
    </svg>,
    'instagram': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path
            d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
    </svg>,
    'youtube': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <path
            d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
    </svg>,
    'github': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
        <path
            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
    </svg>,
    'mainLink': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
        <path
            d="M172.5 131.1C228.1 75.51 320.5 75.51 376.1 131.1C426.1 181.1 433.5 260.8 392.4 318.3L391.3 319.9C381 334.2 361 337.6 346.7 327.3C332.3 317 328.9 297 339.2 282.7L340.3 281.1C363.2 249 359.6 205.1 331.7 177.2C300.3 145.8 249.2 145.8 217.7 177.2L105.5 289.5C73.99 320.1 73.99 372 105.5 403.5C133.3 431.4 177.3 435 209.3 412.1L210.9 410.1C225.3 400.7 245.3 404 255.5 418.4C265.8 432.8 262.5 452.8 248.1 463.1L246.5 464.2C188.1 505.3 110.2 498.7 60.21 448.8C3.741 392.3 3.741 300.7 60.21 244.3L172.5 131.1zM467.5 380C411 436.5 319.5 436.5 263 380C213 330 206.5 251.2 247.6 193.7L248.7 192.1C258.1 177.8 278.1 174.4 293.3 184.7C307.7 194.1 311.1 214.1 300.8 229.3L299.7 230.9C276.8 262.1 280.4 306.9 308.3 334.8C339.7 366.2 390.8 366.2 422.3 334.8L534.5 222.5C566 191 566 139.1 534.5 108.5C506.7 80.63 462.7 76.99 430.7 99.9L429.1 101C414.7 111.3 394.7 107.1 384.5 93.58C374.2 79.2 377.5 59.21 391.9 48.94L393.5 47.82C451 6.731 529.8 13.25 579.8 63.24C636.3 119.7 636.3 211.3 579.8 267.7L467.5 380z"/>
    </svg>,
}
const Contact = ({contactTitle, logoSrc}: { contactTitle: string, logoSrc: string }) => {
    return (
        <div>
            {contactTitle ? <div className={styleModule.contact}>
                <div className={styleModule.contactlogo}>
                    <a href={contactTitle}
                       target="_blank">
                        {//@ts-ignore
                            contactsLogos[logoSrc]}
                    </a>
                </div>
            </div> : null}
        </div>
    )
}
