import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {
    becomeFollower,
    getUsers,
    repeatGetUsers,
    SearchUsersFilterType,
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
    getSearchUsersFilterSelector,
    getUsersSelector,
    getUsersTotalCountSelector
} from '../../redux/selectors/usersSelectors';


class UsersApiContainer extends React.PureComponent<UsersApiContainerPropsType> {
    state = {
        pageSize: 20
    }

    componentDidMount(): void {
        const {getUsers} = this.props
        //get request for getting users (with thunk)
        getUsers(this.state.pageSize, 1);

    }

    // action for pressing on page number
    onChangePage = (pageNumber: number) => {
        const {pageSize, repeatGetUsers,} = this.props
        repeatGetUsers(pageSize, pageNumber, this.props.searchUsersFilter)
    }
    onChangePageSize = (pageSize: number) => {
        const {repeatGetUsers} = this.props
        this.setState({
            pageSize: Number(pageSize)
        })
        repeatGetUsers(Number(pageSize), this.props.currentPage, this.props.searchUsersFilter)
    }

    render() {
        return (
            <Users {...this.props}
                   onChangePage={this.onChangePage}
                   setPageSize={this.onChangePageSize}
                   pageSize={this.state.pageSize}
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
    searchUsersFilter: SearchUsersFilterType
}
type MapDispatchToPropsType = {
    becomeFollower: (userID: number) => void
    stopBeingFollower: (userID: number) => void
    toggleFollowingInProcess: (userId: number, followingInProcess: boolean) => void
    getUsers: (pageSize: number, currentPage: number, searchFilter?: SearchUsersFilterType) => void
    repeatGetUsers: (pageSize: number, pageNumber: number, searchFilter?: SearchUsersFilterType) => void
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
        searchUsersFilter: getSearchUsersFilterSelector(state)
    }
}

const UsersContainer = connect(mapStateToProps, {
    becomeFollower,
    stopBeingFollower,
    toggleFollowingInProcess,
    getUsers,
    repeatGetUsers,
} as MapDispatchToPropsType)(UsersApiContainer)

export default UsersContainer