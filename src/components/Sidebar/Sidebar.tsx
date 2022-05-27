import style from './Sidebar.module.scss'
import {useSelector} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {UserLogo} from '../generic/Avatar/Avatar';
import {useState} from 'react';

export const SideBar = () => {
    const [random, setRandom] = useState(0)
    const followers = useSelector((state: AppStateType) => state.profilePage.followers);
    const randomFollowers = Math.floor(random * (followers.length - 4 + 1 ));
    const finalFollowers = followers.slice(randomFollowers, randomFollowers + 4)
    return (
        <div className={style.sidebarWrapper}>
            <div className={style.title}>
                Followers
                <span onClick={()=>setRandom(Math.random())}>Refresh</span>
            </div>
            <div className={style.content}>
                {finalFollowers.map(follower => <FollowerItem key={follower.id}
                                                         name={follower.name}
                                                         avatar={follower.photos.small}
                                                         status={follower.status}/>)}
            </div>
        </div>
    )
}

type FollowerItemType = {
    name: string
    avatar: string | null
    status: string | null
}
const FollowerItem = ({
                          name,
                          avatar,
                          status
                      }: FollowerItemType) => {

    return (
        <div className={style.itemWrapper}>
            <div className={style.avatar}>
                {avatar ? <img src={avatar} alt="Avatar"/> : <UserLogo/>}
            </div>
            <div className={style.nameAndStatus}>
                <span className={style.name}>{name}</span>
                <span className={style.status}>{status}</span>
            </div>
            <div className={style.action}>
                <button>
                    Unfollow
                </button>
            </div>
        </div>
    )
}