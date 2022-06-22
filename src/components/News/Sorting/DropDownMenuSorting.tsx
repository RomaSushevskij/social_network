import React, {memo, useRef, useState} from 'react';
import styleModule from './DropDownMenuSorting.module.scss';
import {CSSTransition} from 'react-transition-group';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons/faAngleDown';
import {setSortParams} from '../../../redux/redusers/news/newsReducer';
import {useDispatch, useSelector} from 'react-redux';
import {Radio} from '../../generic/Radio/Radio';
import {AppStateType} from '../../../redux/redux-store';

type DropDownMenuType = {
    title: string
    data: string[]
    item?: any
    styleToggleButton?: Object
}

export const DropDownMenuSorting = memo(({
                                             title,
                                             data,
                                             styleToggleButton
                                             , ...props
                                         }: DropDownMenuType) => {

    const [editMode, setEditMode] = useState(false);
    const onSettingsClickHandler = () => {
        setEditMode(!editMode)
    };
    const dispatch = useDispatch();
    const sort = useSelector((state: AppStateType) => state.news.params.sort);
    return (
        <div tabIndex={0}
             onBlur={() => {
                 setEditMode(false)
             }}
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
                    <Radio name={'radio'}
                           options={data}
                           value={sort}
                           onChangeOption={(value) => dispatch(setSortParams(value))}
                           />
                </div>
            </CSSTransition>
        </div>
    );
})