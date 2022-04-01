import React from "react";
import styleModule from './ProfileStatus.module.css';
import EditableSpan from "../../generic/EditableSpan/EditableSpan";

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export class ProfileStatus extends React.PureComponent<ProfileStatusPropsType> {
    state = {
        status: this.props.status
    }
    onChangeText = (status: string) => {
        this.setState({
            status
        })
    }
    onBlurEnterCallback = () => {
        this.props.updateStatus(this.state.status)
    }

    render() {

        return (
            <div className={styleModule.profileStatus}>
                <EditableSpan
                    value={this.state.status}
                    onChangeText={this.onChangeText}
                    spanProps={{children: this.props.status ? undefined : 'enter status...'}}
                    onBlur={this.onBlurEnterCallback}
                    onEnter={this.onBlurEnterCallback}/>
            </div>
        )
    }

};

