import styleModule from './UnderConstruction.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {faPaintRoller} from '@fortawesome/free-solid-svg-icons/faPaintRoller';

export const UnderConstruction = () => {
    return (
        <div className={styleModule.container}>
            <FontAwesomeIcon icon={faPaintRoller} className={styleModule.logo}/>
            <div className={styleModule.description}>
                <h1>Page</h1>
                <h1>under</h1>
                <h1>construction</h1>
            </div>
        </div>
    )
}
