import React from "react";
import styleModule from './Users.module.css';
import {User} from "./User/User";
import {UsersPropsType} from "./UsersContainer";
import axios from "axios"
import {UserType} from "../../redux/redusers/usersReducer/usersReducer";
import {Button} from "../generic/Button/Button";


export type GetUsersDataType = {
    error: string | null
    items: Array<UserType>
    totalCount: number
}

export const Users = React.memo(({
                                     usersPage,
                                     becomeFollower,
                                     stopBeingFollower,
                                     ...props
                                 }: UsersPropsType) => {
    let userElements = usersPage.users.map(user => <User {...user}
                                                         becomeFollower={becomeFollower}
                                                         stopBeingFollower={stopBeingFollower}/>);
    const getUsers = () => {
        if (!usersPage.users.length) {
            axios.get<GetUsersDataType>('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                props.setUsers(response.data.items)
            })
        }
    }

    return (
        <div className={styleModule.usersWrapper}>
            <div className={styleModule.buttonBlock}>
                <Button name={'Get users'} onClick={getUsers}/>
            </div>
            <div className={styleModule.usersBlock}>
                {userElements}
            </div>
        </div>
    )
})

