import React, {useEffect, useState} from "react";
import styleModule from './Users.module.css';
import {User} from "./User/User";
import {Paginator} from "../generic/Paginator/Paginator";
import {Preloader} from "../generic/Preloader/Preloader";
import {useAppSelector} from "../../redux/hooks";
import {
    getCurrentPageSelector,
    getFollowingInProcessUsersIdSelector,
    getIsFetchingSelector,
    getPageSizeSelector,
    getSearchUsersFilterSelector,
    getUsersSelector,
    getUsersTotalCountSelector
} from "../../redux/selectors/usersSelectors";
import {
    becomeFollower,
    getUsers,
    repeatGetUsers,
    stopBeingFollower,
    toggleFollowingInProcess
} from "../../redux/redusers/usersReducer/usersReducer";
import {useDispatch} from "react-redux";

const Users = React.memo(() => {
    const dispatch = useDispatch();

    const users = useAppSelector(getUsersSelector);
    const searchUsersFilter = useAppSelector(getSearchUsersFilterSelector);
    const usersPageSize = useAppSelector(getPageSizeSelector);
    const currentPage = useAppSelector(getCurrentPageSelector);
    const isFetching = useAppSelector(getIsFetchingSelector);
    const usersTotalCount = useAppSelector(getUsersTotalCountSelector);
    const followingInProcessUsersId = useAppSelector(getFollowingInProcessUsersIdSelector);

    const [pageSize, setPageSize] = useState(20);

    const pageSizeRange = [20, 30, 40, 50, 100];

    useEffect(() => {
        dispatch(getUsers(pageSize, 1));
    }, [])


    const onChangePage = (pageNumber: number) => {
        dispatch(repeatGetUsers(usersPageSize, pageNumber, searchUsersFilter))
    };
    const onChangePageSize = (pageSizeValue: number) => {
        setPageSize(pageSizeValue)
        dispatch(repeatGetUsers(Number(pageSize), currentPage, searchUsersFilter));
    };
    const onBecomeFollower = (userId: number) => {
        dispatch(becomeFollower(userId))
    };
    const onStopBeingFollower = (userId: number) => {
        dispatch(stopBeingFollower(userId))
    };
    const onToggleFollowingInProcess = (userId: number, followingInProcess: boolean) => {
        dispatch(toggleFollowingInProcess(userId, followingInProcess))
    }

    const userElements = users.map(user => <User key={user.id}
                                               {...user}
                                               becomeFollower={onBecomeFollower}
                                               stopBeingFollower={onStopBeingFollower}
                                               followingInProcessUsersId={followingInProcessUsersId}
                                               toggleFollowingInProcess={onToggleFollowingInProcess}/>);


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
                           pageSizeRange={pageSizeRange}
                           onChangePage={onChangePage}
                           onChangePageSize={onChangePageSize}/>
            </div>
        </div>
    )
})

export default Users;


