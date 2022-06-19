import React, {memo, useState} from 'react';
import styleModule from './DropDownMenu.module.scss';
import {CSSTransition} from 'react-transition-group';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons/faAngleDown';
import {Checkbox} from '../../../generic/Checkbox/Checkbox';

type DropDownMenuType = {
    title: string
    data: any[]
    item?: any
    styleToggleButton?: Object
}

export const DropDownMenu = memo(({title, data, styleToggleButton}: DropDownMenuType) => {
    const [editMode, setEditMode] = useState(false);
    const onSettingsClickHandler = () => {
        setEditMode(!editMode)
    };
    const [checked, setChecked] = useState<boolean>(false);
    const items = data.map((item, index) => {
        return (
            <div key={item + index} className={styleModule.menuItem}>
                <Checkbox checked={checked}
                          onChangeChecked={setChecked}>
                    {item}
                </Checkbox>
            </div>
        )
    })
    return (
        <div tabIndex={0}
             onBlur={() => setEditMode(false)}
             className={styleModule.dropdownWrapper}>
            <div className={styleModule.toggleButton} style={styleToggleButton}
                 onClick={onSettingsClickHandler}>
                {title} <FontAwesomeIcon icon={faAngleDown}
                                         className={styleModule.angleDown}/>
            </div>
            <CSSTransition in={editMode}
                           classNames={styleModule}
                           timeout={600}
                           unmountOnExit
                           mountOnEnter>
                <div className={styleModule.dropdownBody}>
                    {items}
                </div>
            </CSSTransition>
        </div>
    );
})