import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {

    getUsers,
    repeatGetUsers,
    unfollow,
    toggleFollowingInProcess,
    UserType, becomeFollower, stopBeingFollower
} from "../../redux/redusers/usersReducer/usersReducer";
import React from "react";


class UsersApiContainer extends React.Component<UsersApiContainerPropsType> {

    componentDidMount(): void {
        const {currentPage, pageSize, getUsers} = this.props
        //get request for getting users (with thunk)
        getUsers(pageSize, currentPage)

    }

    //optimization of unnecessary rendering. Alternative of React.memo
    shouldComponentUpdate(nextProps: Readonly<UsersApiContainerPropsType>, nextState: Readonly<{}>): boolean {
        return nextProps !== this.props || nextState !== this.state
    }

    // action for pressing on page number
    onChangePage = (pageNumber: number) => {
        const {pageSize,repeatGetUsers,} = this.props
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
    repeatGetUsers: (pageSize:number, pageNumber:number) => void
}

export type UsersApiContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        usersTotalCount: state.usersPage.usersTotalCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProcessUsersId: state.usersPage.followingInProcessUsersId,
    }
}

export const UsersContainer = connect(mapStateToProps, {
    becomeFollower,
    stopBeingFollower,
    toggleFollowingInProcess,
    getUsers,
    repeatGetUsers,
} as MapDispatchToPropsType)(UsersApiContainer)