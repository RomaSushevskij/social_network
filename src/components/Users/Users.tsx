import React from "react";
import styleModule from './Users.module.css';
import User from "./User/User";
import {UsersPropsType} from "./UsersContainer";

const Users = ({
                   usersPage,
                   becomeFollower,
                   stopBeingFollower,
                   ...props
               }: UsersPropsType) => {
    let userElements = usersPage.users.map(user => <User {...user}
                                                         becomeFollower={becomeFollower}
                                                         stopBeingFollower={stopBeingFollower}/>);
    if (usersPage.users.length === 0) {
        props.setUsers([
            {


                name: 'Ruslan',
                id: 1,
                photos: {
                    small: 'https://sun9-15.userapi.com/impg/O_LNAi5kKsq4-ViNecim4rUQkihvDLuTnXfL2w/BSAIvsvBviM.jpg?size=863x1080&quality=96&sign=8c552a2a19907e2e040b0475efdb6b85&type=album',
                    large: null
                },
                status: 'Learn JS',
                followed: true
            },
            {
                name: 'Mariya',
                id: 2,
                photos: {
                    small: null,
                    large: null
                },
                status: 'I like to live',
                followed: false
            },
            {
                name: 'Ivan',
                id: 3,
                photos: {
                    small: 'https://sun9-53.userapi.com/impf/c623626/v623626744/19d9c/KBDd8fH-BOg.jpg?size=1280x960&quality=96&sign=03d1a85127b8411ce8b5b0b4118f78f6&type=album',
                    large: null
                },
                status: 'All is good',
                followed: true
            }
        ])
    }
    return (
        <div className={styleModule.usersWrapper}>
            <div className={styleModule.usersElements}>
                {userElements}
            </div>
        </div>
    )

}

export default Users;
