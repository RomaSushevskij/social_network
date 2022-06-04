import React from "react";
import styleModule from './Users.module.css';
import {User} from "./User/User";
import {Paginator} from "../generic/Paginator/Paginator";
import {Preloader} from "../generic/Preloader/Preloader";
import {UsersApiContainerPropsType} from "./UsersContainer";


type UsersPropsType = UsersApiContainerPropsType & {
    onChangePage: (pageNumber: number) => void
    setPageSize: (pageSize: number) => void
    pageSize:number
}

export const Users = React.memo((props: UsersPropsType) => {
    const {
        users,
        becomeFollower,
        stopBeingFollower,
        usersTotalCount,
        currentPage,
        onChangePage,
        isFetching,
        followingInProcessUsersId,
        toggleFollowingInProcess,
        setPageSize,
        pageSize
    } = props

    let userElements = users.map(user => <User key={user.id}
                                               {...user}
                                               becomeFollower={becomeFollower}
                                               stopBeingFollower={stopBeingFollower}
                                               followingInProcessUsersId={followingInProcessUsersId}
                                               toggleFollowingInProcess={toggleFollowingInProcess}/>);
    return (
        <div className={styleModule.usersWrapper}>
            {isFetching ? <Preloader size={'30px'} color={'#5B48E3'}/> :
                <div className={styleModule.usersBlock}>
                    {userElements}
                </div>}
            <div className={styleModule.paginatorBlock}>
                <Paginator portionSize={5}
                           currentPage={currentPage}
                           pageSize={pageSize}
                           totalItemsCount={usersTotalCount}
                           onChangePage={onChangePage}
                           onChangePageSize={setPageSize}/>
            </div>
        </div>
    )
})



