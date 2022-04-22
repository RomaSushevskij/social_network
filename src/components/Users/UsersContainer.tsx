import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {
    becomeFollower,
    getUsers,
    repeatGetUsers,
    stopBeingFollower,
    toggleFollowingInProcess,
    UserType
} from "../../redux/redusers/usersReducer/usersReducer";
import React from "react";
import {
    getCurrentPageSelector,
    getFollowingInProcessUsersIdSelector,
    getIsFetchingSelector,
    getPageSizeSelector,
    getUsersSelector,
    getUsersTotalCountSelector
} from '../../redux/selectors/usersSelectors';


class UsersApiContainer extends React.PureComponent<UsersApiContainerPropsType> {

    componentDidMount(): void {
        const {currentPage, pageSize, getUsers} = this.props
        //get request for getting users (with thunk)
        getUsers(pageSize, currentPage)

    }

    // action for pressing on page number
    onChangePage = (pageNumber: number) => {
        const {pageSize, repeatGetUsers,} = this.props
        repeatGetUsers(pageSize, pageNumber)
    }

    render() {
        return (
            <Users {...this.props}
                   onChangePage={this.onChangePage}
            />
        )
    }
}

//functionality for redux

type MapStateToPropsType = {
    users: UserType[],
    usersTotalCount: number,
    pageSize: number,
    currentPage: number
    isFetching: boolean
    followingInProcessUsersId: number[]
}
type MapDispatchToPropsType = {
    becomeFollower: (userID: number) => void
    stopBeingFollower: (userID: number) => void
    toggleFollowingInProcess: (userId: number, followingInProcess: boolean) => void
    getUsers: (pageSize: number, currentPage: number) => void
    repeatGetUsers: (pageSize: number, pageNumber: number) => void
}

export type UsersApiContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsersSelector(state),
        usersTotalCount: getUsersTotalCountSelector(state),
        pageSize: getPageSizeSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProcessUsersId: getFollowingInProcessUsersIdSelector(state),
    }
}

export const UsersContainer = connect(mapStateToProps, {
    becomeFollower,
    stopBeingFollower,
    toggleFollowingInProcess,
    getUsers,
    repeatGetUsers,
} as MapDispatchToPropsType)(UsersApiContainer)