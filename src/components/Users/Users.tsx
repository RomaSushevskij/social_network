import React from "react";
import styleModule from './Users.module.css';
import {User} from "./User/User";
import {UsersPropsType} from "./UsersContainer";
import axios from "axios"
import {UserType} from "../../redux/redusers/usersReducer/usersReducer";
import {Paginator} from "../generic/Paginator/Paginator";


export type GetUsersDataType = {
    error: string | null
    items: Array<UserType>
    totalCount: number
}

export class Users extends React.Component<UsersPropsType> {

    componentDidMount(): void {
        const {usersPage, setUsers, setUsersTotalCount} = this.props
        //get request for getting users
        if (!usersPage.users.length) {
            axios.get<GetUsersDataType>(`https://social-network.samuraijs.com/api/1.0/users?count=12`).then(response => {
                setUsers(response.data.items)
                setUsersTotalCount(response.data.totalCount)
            })
        }
    }

    //optimization of unnecessary rendering. Alternative of React.memo
    shouldComponentUpdate(nextProps: Readonly<UsersPropsType>, nextState: Readonly<{}>): boolean {
        return nextProps !== this.props || nextState !== this.state
    }

    onChangePage = (pageNumber: number) => {
        const {setUsers} = this.props
        this.props.setCurrentPage(pageNumber)
        axios.get<GetUsersDataType>(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`, {
            withCredentials: true,
            headers: {
                "API-KEY": "10732160-f45a-4879-8e6f-b2819bc13c24"
            }
        }).then(response => {
            setUsers(response.data.items)
        })
    }

    render() {
        const {usersPage, becomeFollower, stopBeingFollower} = this.props
        let userElements = usersPage.users.map(user => <User {...user}
                                                             becomeFollower={becomeFollower}
                                                             stopBeingFollower={stopBeingFollower}/>);

        const {usersTotalCount, pageSize, currentPage} = this.props

        return (
            <div className={styleModule.usersWrapper}>
                <div>
                    <Paginator portionSize={10}
                               currentPage={currentPage}
                               pageSize={pageSize}
                               totalItemsCount={usersTotalCount}
                               onChangePage={this.onChangePage}/>
                </div>
                <div className={styleModule.usersBlock}>
                    {userElements}
                </div>
            </div>
        )
    }
}


