import style from './Sidebar.module.scss'
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {UserLogo} from '../generic/Avatar/Avatar';
import {memo, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {stopBeingFollower} from '../../redux/redusers/usersReducer/usersReducer';

export const SideBar = memo(() => {
    const [random, setRandom] = useState(Math.random())
    const followers = useSelector((state: AppStateType) => state.profilePage.followers);
    const randomFollowers = Math.floor(random * (followers.length - 4 + 1));
    const finalFollowers = followers.slice(randomFollowers, randomFollowers + 4)
    return (
        <div className={style.sidebarWrapper}>
            <div className={style.title}>
                Followers
                <span onClick={() => setRandom(Math.random())}>Refresh</span>
            </div>
            <div className={style.content}>
                {finalFollowers.map(follower => <FollowerItem key={follower.id}
                                                              name={follower.name}
                                                              avatar={follower.photos.small}
                                                              status={follower.status}
                                                              id={follower.id}/>)}
            </div>
        </div>
    )
})

type FollowerItemType = {
    name: string
    avatar: string | null
    status: string | null
    id: number
}
const FollowerItem = memo(({
                          name,
                          avatar,
                          status,
                          id
                      }: FollowerItemType) => {
    const dispatch = useDispatch();

    return (
        <div className={style.itemWrapper}>
            <div className={style.avatar}>
                <NavLink to={`/profile/${id}`}>
                    {avatar ? <img src={avatar} alt="Avatar"/> : <UserLogo/>}
                </NavLink>
            </div>
            <div className={style.nameAndStatus}>
                <span className={style.name}>{name}</span>
                <span className={style.status}>{status}</span>
            </div>
            <div className={style.action}>
                <button onClick={()=>dispatch(stopBeingFollower(id))}>
                    Unfollow
                </button>
            </div>
        </div>
    )
})