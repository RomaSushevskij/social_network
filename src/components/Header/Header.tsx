import React from "react";
import styleModule from './Header.module.css';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {HeaderAPIContainerPropsType} from "./HeaderContainer";
import logo_avatar from '../../usersAvatars/user.png'
import {PATH} from '../../App';
import {useNavigate} from 'react-router-dom';

export type HeaderPropsType = {
    title: string
    description?: string
    background: string
    color: string
    logo?: string
} & HeaderAPIContainerPropsType


export const Header = React.memo((props: HeaderPropsType) => {
    const navigate = useNavigate()
    const {
        title,
        description,
        background,
        color,
        logo,
        avatar,
        fullName,
        auth,
    } = props
    const Header = styled.header`
    & {
    background: ${background}
    `;
    const TitleDescription = styled.div`
    & p {
    color: ${color}
    }
    `;
    return (
        <Header className={styleModule.header}>
            <div className={styleModule.logoAndDescription}>
                <div className={styleModule.logo}>
                    <img src={logo} className={styleModule.main_logo}/>
                </div>
                <TitleDescription className={styleModule.title_description}>
                    <p>{title}</p>
                    <p>{description}</p>
                </TitleDescription>
            </div>
            <div className={styleModule.loginStatus}>

                {auth.isAuth ?
                    <div className={styleModule.loginAndAvatar}>
                        <div className={styleModule.avatar}
                        onClick={()=>{navigate(PATH.PROFILE)}}>
                            <img src={avatar ? avatar : logo_avatar}/>
                        </div>
                        <div className={styleModule.loginValue}>{fullName}</div>
                        <div className={styleModule.logoutButton}>
                            <button onClick={props.logout}>LOGOUT</button>
                        </div>
                    </div> :
                    <NavLink to={'/login'}>
                        LOGIN
                    </NavLink>}
            </div>
        </Header>
    );
})

