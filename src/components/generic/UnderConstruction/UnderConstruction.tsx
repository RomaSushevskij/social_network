import logo from './../../../underConstruction.png'
import styleModule from './UnderConstruction.module.css'
export const UnderConstruction = () => {
    return (
        <div className={styleModule.container}>
            <img src={logo} alt="Under Construction"/>
        </div>
    )
}