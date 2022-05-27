import React from "react";
import styleModule from './Users.module.css';
import {User} from "./User/User";
import {Paginator} from "../generic/Paginator/Paginator";
import {Preloader} from "../generic/Preloader/Preloader";
import {UsersApiContainerPropsType} from "./UsersContainer";


type UsersPropsType = UsersApiContainerPropsType & {
    onChangePage: (pageNumber: number) => void
}

export const Users = React.memo((props: UsersPropsType) => {
    const {
        users,
        becomeFollower,
        stopBeingFollower,
        usersTotalCount,
        pageSize,
        currentPage,
        onChangePage,
        isFetching,
        followingInProcessUsersId,
        toggleFollowingInProcess,
    } = props

    let userElements = users.map(user => <User key={user.id}
                                               {...user}
                                               becomeFollower={becomeFollower}
                                               stopBeingFollower={stopBeingFollower}
                                               followingInProcessUsersId={followingInProcessUsersId}
                                               toggleFollowingInProcess={toggleFollowingInProcess}/>);
    return (
        <div className={styleModule.usersWrapper}>
            {isFetching ? <Preloader size={'60px'} color={'#ffffff'}/> :
                <div className={styleModule.usersBlock}>
                    {userElements}
                </div>}
            <div className={styleModule.paginatorBlock}>
                <Paginator portionSize={5}
                           currentPage={currentPage}
                           pageSize={pageSize}
                           totalItemsCount={usersTotalCount}
                           onChangePage={onChangePage}/>
            </div>
        </div>
    )
})



