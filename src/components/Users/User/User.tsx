import React from "react";
import styleModule from "./User.module.css";
import {NavLink} from "react-router-dom";
import {UserType} from "../../../redux/redusers/usersReducer/usersReducer";
import {Button} from "../../generic/Button/Button";
import {BUTTON_STYLE} from "../../Profile/MyPosts/MyPosts";
import {Avatar} from '../../generic/Avatar/Avatar';


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

    //is follow button disabled?
    const isFollowingButtonDisabled = props.followingInProcessUsersId.includes(props.id)

    return (
        <div className={styleModule.userWrapper}>
            <div className={styleModule.avatar}>
                <NavLink to={`/profile/${props.id}`}>
                    <Avatar style={{width:'90px', height:'90px'}} photo={props.photos.small}/>
                </NavLink>
            </div>
            <div className={styleModule.fullName}>
                {props.name}
            </div>
            <div className={styleModule.followed}>
                {props.followed ?
                    <Button name={'Unfollow'}
                            onClick={() => props.stopBeingFollower(props.id)}
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
        </div>
    )
})
