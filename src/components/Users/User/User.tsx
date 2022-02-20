import React from "react";
import styleModule from "./User.module.css";
import userPhotoDefault from "./../../../usersAvatars/user.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../../redux/redusers/usersReducer/usersReducer";
import {Button} from "../../generic/Button/Button";
import {BUTTON_STYLE} from "../../Profile/MyPosts/MyPosts";
import styled from "styled-components";
import axios from "axios";


export type PostFollowDataType = {
    resultCode: number
    messages: Array<string>
    data: object
    fieldsErrors: Array<any>
}
export type DeleteFollowDataType = PostFollowDataType

type UserPropsType = {
    /**
     * Callbock that add someone user in followers
     */
    becomeFollower: (userID: number) => void
    /**
     * Callbock that remove someone user from followers
     */
    stopBeingFollower: (userID: number) => void
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
    let onFollowClick = () => {
        axios.post<PostFollowDataType>(`https://social-network.samuraijs.com/api/1.0/follow/${props.id}`, {}, {
            withCredentials: true,
            headers: {
                "API-KEY": "10732160-f45a-4879-8e6f-b2819bc13c24"
            }
        }).then(response => {
            if (response.data.resultCode === 0) {
                props.becomeFollower(props.id);
            }
        })
    };
    let onUnfollowClick = () => {
        axios.delete<DeleteFollowDataType>(`https://social-network.samuraijs.com/api/1.0/follow/${props.id}`, {
            withCredentials: true,
            headers: {
                "API-KEY": "10732160-f45a-4879-8e6f-b2819bc13c24"
            }
        }).then(response => {
            if (response.data.resultCode === 0) {
                props.stopBeingFollower(props.id)
            }
        })

    };
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
                            onClick={onUnfollowClick}
                            backgroundHover={BUTTON_STYLE.BACKGROUND_HOVER}
                            background={BUTTON_STYLE.BACKGROUND}
                            colorHover={BUTTON_STYLE.COLOR_HOVER}/> :
                    <Button name={'Follow'}
                            onClick={onFollowClick}
                            backgroundHover={BUTTON_STYLE.BACKGROUND_HOVER}
                            background={BUTTON_STYLE.BACKGROUND}
                            colorHover={BUTTON_STYLE.COLOR_HOVER}/>
                }
            </div>
        </UserWrapper>
    )
})
