import React, {memo, useEffect, useState} from "react";
import styleModule from './ProfileStatusHooks.module.css';
import EditableSpan from "../../generic/EditableSpan/EditableSpan";

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatusHooks = memo(({status, updateStatus}: ProfileStatusPropsType) => {
    const [localStatus, setLocalStatus] = useState(status);
    const onBlurEnterCallback = () => {
        updateStatus(localStatus)
    }
    useEffect(() => {
        setLocalStatus(status)
    }, [status])
    return (
        <div className={styleModule.profileStatus}>
            <EditableSpan
                value={localStatus}
                onChangeText={setLocalStatus}
                spanProps={{children: status ? undefined : 'enter status...'}}
                onBlur={onBlurEnterCallback}
                onEnter={onBlurEnterCallback}/>
        </div>
    )
});

