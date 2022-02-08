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

export class Users extends React.Component<UsersPropsType> {

    getUsers() {
        const {usersPage} = this.props
        if (!usersPage.users.length) {
            axios.get<GetUsersDataType>('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                this.props.setUsers(response.data.items)
            })
        }
    }

    //optimization of unnecessary rendering. Alternative of React.memo
    shouldComponentUpdate(nextProps: Readonly<UsersPropsType>, nextState: Readonly<{}>): boolean {
        return nextProps !== this.props || nextState !== this.state
    }

    render() {
        const {usersPage, becomeFollower, stopBeingFollower} = this.props
        let userElements = usersPage.users.map(user => <User {...user}
                                                             becomeFollower={becomeFollower}
                                                             stopBeingFollower={stopBeingFollower}/>);

        return (
            <div className={styleModule.usersWrapper}>
                <div className={styleModule.buttonBlock}>
                    <Button name={'Get users'} onClick={this.getUsers}/>
                </div>
                <div className={styleModule.usersBlock}>
                    {userElements}
                </div>
            </div>
        )
    }
}


