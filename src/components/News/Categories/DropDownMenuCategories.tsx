import React, {memo, useState} from 'react';
import styleModule from './DropDownMenuCategories.module.scss';
import {CSSTransition} from 'react-transition-group';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons/faAngleDown';
import {Checkbox} from '../../generic/Checkbox/Checkbox';
import {CategoriesType, NEWS_CATEGORIES, setCategory} from '../../../redux/redusers/news/newsReducer';
import {useDispatch} from 'react-redux';

type DropDownMenuType = {
    title: string
    data: NEWS_CATEGORIES[]
    item?: any
    styleToggleButton?: Object
    checkboxState: CategoriesType
}

export const DropDownMenuCategories = memo(({
                                      title,
                                      data,
                                      styleToggleButton,
                                      checkboxState
                                      , ...props
                                  }: DropDownMenuType) => {

    const [editMode, setEditMode] = useState(false);
    const onSettingsClickHandler = () => {
        setEditMode(!editMode)
    };
    const dispatch = useDispatch();
    const onChangeCategory = (item: NEWS_CATEGORIES, checked: boolean) => {
        dispatch(setCategory(item, checked))
    }
    const items = data.map((item, index) => {
        return (
            <div key={item} className={styleModule.menuItem}>
                <Checkbox key={item}
                          id={'checkbox'+ item}
                          checked={checkboxState[item]}
                          onChangeChecked={(checked) => {
                              onChangeCategory(item, checked)
                          }}>
                    {item}
                </Checkbox>
            </div>
        )
    })
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
                    {items}
                </div>
            </CSSTransition>
        </div>
    );
})