import React from "react";
import styleModule from './Users.module.css';
import {User} from "./User/User";
import {InitialStateUsersType, UserType} from "../../redux/redusers/usersReducer/usersReducer";
import {Paginator} from "../generic/Paginator/Paginator";


export type GetUsersDataType = {
    error: string | null
    items: Array<UserType>
    totalCount: number
}

type UsersPropsType = {
    usersPage: InitialStateUsersType
    becomeFollower: (userID: number) => void
    stopBeingFollower: (userID: number) => void
    currentPage: number
    pageSize: number
    usersTotalCount: number
    onChangePage: (pageNumber: number) => void
}

export const Users = (props: UsersPropsType) => {

    const {
        usersPage,
        becomeFollower,
        stopBeingFollower,
        usersTotalCount,
        pageSize,
        currentPage,
        onChangePage,
    } = props

    let userElements = usersPage.users.map(user => <User {...user}
                                                         becomeFollower={becomeFollower}
                                                         stopBeingFollower={stopBeingFollower}/>);
    return (
        <div className={styleModule.usersWrapper}>
            <div>
                <Paginator portionSize={10}
                           currentPage={currentPage}
                           pageSize={pageSize}
                           totalItemsCount={usersTotalCount}
                           onChangePage={onChangePage}/>
            </div>
            <div className={styleModule.usersBlock}>
                {userElements}
            </div>
        </div>
    )

}



