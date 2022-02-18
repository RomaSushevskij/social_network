import {connect} from "react-redux";
import {GetUsersDataType, Users} from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {
    followAC,
    InitialStateUsersType,
    setCurrentPageAC, setIsFetchingAC,
    setUsersAC,
    setUsersTotalCountAC,
    unfollowAC,
    UserType
} from "../../redux/redusers/usersReducer/usersReducer";
import {Dispatch} from "redux";
import React from "react";
import axios from "axios";


class UsersApiContainer extends React.Component<UsersApiContainerPropsType> {

    componentDidMount(): void {
        const {usersPage, setUsers, setUsersTotalCount, setIsFetchingValue} = this.props
        //get request for getting users
        if (!usersPage.users.length) {
            setIsFetchingValue(true)
            axios.get<GetUsersDataType>(`https://social-network.samuraijs.com/api/1.0/users?count=12`, {
                withCredentials: true,
                headers: {
                    "API-KEY": "10732160-f45a-4879-8e6f-b2819bc13c24"
                }
            }).then(response => {
                setIsFetchingValue(false)
                setUsers(response.data.items)
                setUsersTotalCount(response.data.totalCount)
            })
        }
    }

    //optimization of unnecessary rendering. Alternative of React.memo
    shouldComponentUpdate(nextProps: Readonly<UsersApiContainerPropsType>, nextState: Readonly<{}>): boolean {
        return nextProps !== this.props || nextState !== this.state
    }

    // action for pressing on page number
    onChangePage = (pageNumber: number) => {
        const {setUsers, setIsFetchingValue} = this.props
        this.props.setCurrentPage(pageNumber)
        setIsFetchingValue(true)
        axios.get<GetUsersDataType>(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`, {
            withCredentials: true,
            headers: {
                "API-KEY": "10732160-f45a-4879-8e6f-b2819bc13c24"
            }
        }).then(response => {
            setIsFetchingValue(false)
            setUsers(response.data.items)
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
    usersPage: InitialStateUsersType,
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
        usersPage: state.usersPage,
        usersTotalCount: state.usersPage.usersTotalCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        becomeFollower: (userID: number) => {
            dispatch(followAC(userID))
        },
        stopBeingFollower: (userID: number) => {
            dispatch(unfollowAC(userID))
        },
        setUsers: (users: UserType[]) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (page: number) => {
            dispatch(setCurrentPageAC(page))
        },
        setUsersTotalCount: (usersTotalCount: number) => {
            dispatch(setUsersTotalCountAC(usersTotalCount))
        },
        setIsFetchingValue: (isFetching: boolean) => {
            dispatch(setIsFetchingAC(isFetching))
        },
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersApiContainer)