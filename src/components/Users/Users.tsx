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
    } = props

    let userElements = users.map(user => <User {...user}
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
            {isFetching ? <Preloader size={'100px'} color={'#ffffff'}/> :
                <div className={styleModule.usersBlock}>
                    {userElements}
                </div>}

        </div>
    )
})



