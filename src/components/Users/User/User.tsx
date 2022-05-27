import React from "react";
import styleModule from "./User.module.css";
import {NavLink} from "react-router-dom";
import {UserType} from "../../../redux/redusers/usersReducer/usersReducer";
import {Avatar} from '../../generic/Avatar/Avatar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserMinus} from '@fortawesome/free-solid-svg-icons/faUserMinus';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';


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
                    <Avatar style={{width: '90px', height: '90px'}} photo={props.photos.small}/>
                </NavLink>
                <div className={styleModule.followed}>
                    {props.followed ?
                        <button disabled={isFollowingButtonDisabled}
                                onClick={() => props.stopBeingFollower(props.id)}>
                            <FontAwesomeIcon icon={faUserMinus}/>
                        </button> :
                        <button disabled={isFollowingButtonDisabled}
                                onClick={() => props.becomeFollower(props.id)}>
                            <FontAwesomeIcon icon={faUserPlus}/>
                        </button>
                    }
                </div>
            </div>
            <p className={styleModule.fullName}>
                {props.name}
            </p>
        </div>
    )
})
