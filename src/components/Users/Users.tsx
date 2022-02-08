import React from "react";
import styleModule from './Users.module.css';
import {User} from "./User/User";
import {UsersPropsType} from "./UsersContainer";
import axios from "axios"
import {UserType} from "../../redux/redusers/usersReducer/usersReducer";


export type GetUsersDataType = {
    error: string | null
    items: Array<UserType>
    totalCount: number
}

export class Users extends React.Component<UsersPropsType> {

    componentDidMount(): void {
        const {usersPage, setUsers} = this.props
        //get request for getting users
        if (!usersPage.users.length) {
            axios.get<GetUsersDataType>('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                setUsers(response.data.items)
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
                <div className={styleModule.usersBlock}>
                    {userElements}
                </div>
            </div>
        )
    }
}


