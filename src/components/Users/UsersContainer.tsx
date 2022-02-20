import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {
    becomeFollower,
    setCurrentPage,
    setIsFetchingValue,
    setUsers,
    setUsersTotalCount,
    stopBeingFollower,
    UserType
} from "../../redux/redusers/usersReducer/usersReducer";
import React from "react";
import {usersAPI} from "../../api/api";


class UsersApiContainer extends React.Component<UsersApiContainerPropsType> {

    componentDidMount(): void {
        const {currentPage, pageSize, users, setUsers, setUsersTotalCount, setIsFetchingValue} = this.props
        //get request for getting users
        if (!users.length) {
            setIsFetchingValue(true)
            usersAPI.getUsers(pageSize, currentPage).then(data => {
                setIsFetchingValue(false)
                setUsers(data.items)
                setUsersTotalCount(data.totalCount)
            })
        }
    }

    //optimization of unnecessary rendering. Alternative of React.memo
    shouldComponentUpdate(nextProps: Readonly<UsersApiContainerPropsType>, nextState: Readonly<{}>): boolean {
        return nextProps !== this.props || nextState !== this.state
    }

    // action for pressing on page number
    onChangePage = (pageNumber: number) => {
        const {pageSize, setUsers, setIsFetchingValue} = this.props
        this.props.setCurrentPage(pageNumber)
        setIsFetchingValue(true)
        usersAPI.getUsers(pageSize, pageNumber).then(data => {
            setIsFetchingValue(false)
            setUsers(data.items)
        })
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
}
type MapDispatchToPropsType = {
    becomeFollower: (userID: number) => void
    stopBeingFollower: (userID: number) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (page: number) => void
    setUsersTotalCount: (usersTotalCount: number) => void
    setIsFetchingValue: (isFetching: boolean) => void
}

export type UsersApiContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        usersTotalCount: state.usersPage.usersTotalCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}

export const UsersContainer = connect(mapStateToProps, {
    becomeFollower,
    stopBeingFollower,
    setUsers,
    setCurrentPage,
    setUsersTotalCount,
    setIsFetchingValue,
} as MapDispatchToPropsType)(UsersApiContainer)