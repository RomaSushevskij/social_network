import styleModule from './Sticker.module.scss'

export const Sticker = ()=> {
    return (
        <div className={styleModule.stickerWrapper}>
            <p><b>Email:</b> free@samuraijs.com</p>
            <p><b>Password:</b> free</p>
        </div>
    )
}