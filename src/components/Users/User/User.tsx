import React from "react";
import styleModule from "./User.module.css";
import userPhotoDefault from "./../../../usersAvatars/user.png";
import {NavLink} from "react-router-dom";
import {becomeFollower, UserType} from "../../../redux/redusers/usersReducer/usersReducer";
import {Button} from "../../generic/Button/Button";
import {BUTTON_STYLE} from "../../Profile/MyPosts/MyPosts";
import styled from "styled-components";
import {FOLLOW_UNFOLLOW_RESULT_CODES, usersAPI} from "../../../api/api";


type UserPropsType = {
    /**
     * Callbock that add someone user in followers
     */
    becomeFollower: (userID: number) => void
    /**
     * Callbock that remove someone user from followers
     */
    stopBeingFollower: (userID: number) => void
    followingInProcessUsersId: number[]
    toggleFollowingInProcess: (userId: number, followingInProcess: boolean) => void
    background?: string
    color?: string
} & UserType

export const User = React.memo((props: UserPropsType) => {
    const UserWrapper = styled.div`
    & {
    background: ${props.background ? props.background : 'tomato'};
    color: ${props.color ? props.color : 'white'}
    }
    `
    const Img = styled.img`
    & {
    border-color: ${props.color ? props.color : 'white'}
    }
    `

    //is follow button disabled?
    const isFollowingButtonDisabled = props.followingInProcessUsersId.includes(props.id)

    return (
        <UserWrapper className={styleModule.userWrapper}>
            <div className={styleModule.avatar}>
                <NavLink to={`/profile/${props.id}`}>
                    <Img src={props.photos.small !== null ? props.photos.small : userPhotoDefault} alt=""/>
                </NavLink>
            </div>
            <div className={styleModule.fullName}>
                {props.name}
            </div>
            <div className={styleModule.status}>
                <span>{props.status}</span>
            </div>
            <div className={styleModule.followed}>
                {props.followed ?
                    <Button name={'Unfollow'}
                            onClick={()=> props.stopBeingFollower(props.id)}
                            backgroundHover={BUTTON_STYLE.BACKGROUND_HOVER}
                            background={BUTTON_STYLE.BACKGROUND}
                            colorHover={BUTTON_STYLE.COLOR_HOVER}
                            disabled={isFollowingButtonDisabled}/> :
                    <Button name={'Follow'}
                            onClick={() => props.becomeFollower(props.id)}
                            backgroundHover={BUTTON_STYLE.BACKGROUND_HOVER}
                            background={BUTTON_STYLE.BACKGROUND}
                            colorHover={BUTTON_STYLE.COLOR_HOVER}
                            disabled={isFollowingButtonDisabled}/>
                }
            </div>
        </UserWrapper>
    )
})
