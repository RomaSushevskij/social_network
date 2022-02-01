import React from "react";
import styleModule from "./User.module.css";
import userPhotoDefault from "./../../../usersAvatars/user.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../../redux/redusers/usersReducer";

type UserPropsType = {
    becomeFollower: (userID: number) => void
    stopBeingFollower: (userID: number) => void
} & UserType

const User = (props: UserPropsType) => {
    let onFollowClick = () => {
        props.becomeFollower(props.id);
    };
    let onUnfollowClick = () => {
        props.stopBeingFollower(props.id)
    };
    return (

        <div className={styleModule.userBody}>
            <div className={styleModule.avatarAndFollowed}>
                <div className={styleModule.avatar}>
                    <NavLink to={`/profile/${props.id}`}>
                        <img src={props.photos.small !== null ? props.photos.small : userPhotoDefault} alt=""/>
                    </NavLink>
                </div>
                <div className={styleModule.followed}>
                    {props.followed ?
                        <button onClick={onUnfollowClick}>Unfollow</button> :
                        <button
                            onClick={onFollowClick}>Follow</button>}
                </div>
            </div>
            <div className={styleModule.userInformation}>
                <div className={styleModule.fullNameAndStatus}>
                    <div className={styleModule.fullName}>
                        {props.name}
                    </div>
                    <div className={styleModule.status}>
                        {props.status}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default User;
