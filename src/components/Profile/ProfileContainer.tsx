import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType, setProfile} from "../../redux/redusers/profileReducer/profileReducer";
import {Profile} from "./Profile";
import {Preloader} from "../generic/Preloader/Preloader";
import {useParams} from "react-router-dom";


class ProfileAPIContainer extends React.Component<ProfileAPIContainerPropsType> {

    componentDidMount(): void {
        debugger
        const {setProfile,params} = this.props
        let userId = params["*"]
        if(!userId || userId === '*') {
            userId = '20392'
        }
        axios.get<ProfileType>(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`, {
            withCredentials: true,
            headers: {
                "API-KEY": "10732160-f45a-4879-8e6f-b2819bc13c24"
            }
        })
            .then(response => {
                setProfile(response.data)
            })
    }

    //getting own profile after switching from someone profile to your own
    componentDidUpdate(prevProps: Readonly<ProfileAPIContainerPropsType>, prevState: Readonly<{}>, snapshot?: any): void {
        debugger
        if(prevProps.params ! == this.props.params) {
            const {setProfile, params} = this.props
            let userId = params["*"]
            if (!userId || userId === '*') {
                userId = '20392'
            }
            axios.get<ProfileType>(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`, {
                withCredentials: true,
                headers: {
                    "API-KEY": "10732160-f45a-4879-8e6f-b2819bc13c24"
                }
            })
                .then(response => {
                    setProfile(response.data)
                })
        }
    }

    render() {

        return this.props.profile ? (
                <Profile {...this.props}/>) :
            (<Preloader size={'100px'} color={'#ffffff'}/>
            )
    }
}

export type ProfileAPIContainerPropsType =
    MapStateToPropsType &
    MapDispatchToPropsType &
    {params: {['*']:string}} //... <= profile/*... => type for props

type MapStateToPropsType = {
    profile: ProfileType | null
}
type MapDispatchToPropsType = {
    setProfile: (profile: ProfileType) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile
})

//hoc for getting params
const withRouter = (WrappedComponent: typeof React.Component) => {
    const ComponentWithRouter = (props: object) => {
        const params = useParams<'*'>() //... <= profile/*
        return (
            <WrappedComponent {...props} params={params}/>
        )
    }
    return ComponentWithRouter
}

export const ProfileContainer = connect(mapStateToProps, {setProfile} as MapDispatchToPropsType)(withRouter(ProfileAPIContainer))


