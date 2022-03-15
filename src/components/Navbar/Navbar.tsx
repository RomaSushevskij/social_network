import React, {useState} from "react";
import './Navbar.module.css';
import styleModule from './Navbar.module.css';
import {
    faCommentDots,
    faHeadphonesAlt,
    faNewspaper,
    faSlidersH,
    faUserAlt,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {CustomNavLink} from "./NavLink/CustomNavLink";
import {Button} from "../generic/Button/Button";
import {Navigate,useNavigate} from 'react-router-dom';


export type NavLinkItem = {
    title: string
    path: string
    iconTitle: string
    withAuthRedirect: boolean
}


export const NavbarContainer = React.memo((props: MapStateToPropsType) => {
    const navigate = useNavigate()

    const navLinksArr: NavLinkItem[] = [
        {title: 'Profile', path: '/profile', iconTitle: JSON.stringify(faUserAlt), withAuthRedirect: true,},
        {title: 'Messages', path: '/dialogs', iconTitle: JSON.stringify(faCommentDots), withAuthRedirect: true,},
        {title: 'News', path: '/news', iconTitle: JSON.stringify(faNewspaper), withAuthRedirect: false,},
        {title: 'Music', path: '/music', iconTitle: JSON.stringify(faHeadphonesAlt), withAuthRedirect: false,},
        {title: 'Users', path: '/users', iconTitle: JSON.stringify(faUsers), withAuthRedirect: false,},
        {title: 'Settings', path: '/settings', iconTitle: JSON.stringify(faSlidersH), withAuthRedirect: true,},
    ]
    const [navLinks, setNavLinks] = useState<NavLinkItem[]>(navLinksArr)

    let resultNavLinks = navLinks
    if (!props.isAuth) {
        resultNavLinks = navLinks.filter(nav => !nav.withAuthRedirect)
    }

    const customNavLinks = resultNavLinks.map(navLink => {
            return (
                <CustomNavLink key={navLink.title} {...navLink}/>
            )

    })
    return (
        <>
            <nav className={styleModule.nav}>
                {customNavLinks}
                {!props.isAuth && <div className={styleModule.buttonBlock}>
                    <Button name={'Login'} onClick={()=>navigate('/login')}/>
                </div>}
            </nav>

        </>
    )
})

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
type MapStateToPropsType = {
    isAuth: boolean
}

export const Navbar = connect(mapStateToProps)(NavbarContainer)
