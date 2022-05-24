import styleModule from "./CustomNavLink.module.css";
import React from "react";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLinkItem} from "../Navbar";

export const CustomNavLink = ({path, title, iconTitle}: NavLinkItem) => {
    const resultClassName = title === 'Users' ?
        `${styleModule.item} ${styleModule.users}` :
        styleModule.item
    return (
        <div className={resultClassName}>
            <NavLink to={path}
                     className={nav => nav.isActive ? styleModule.active : ''}>
                <FontAwesomeIcon icon={JSON.parse(iconTitle)} className={styleModule.icon}/>{title}
            </NavLink>
        </div>
    )
}