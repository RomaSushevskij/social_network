import React, {DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes} from 'react'
import style from './EditableSpan.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import {CSSTransition} from "react-transition-group";
import InputText from "../InputText/InputText";


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

type EditableSpanType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    spanProps?: DefaultSpanPropsType
}
type StateType = {
    editMode: boolean
}

class EditableSpan extends React.Component<EditableSpanType> {
    state: StateType = {
        editMode: false
    }
    onEnterCallback = () => {
        const {onEnter} = this.props
        this.setState({
            editMode: false
        } as StateType);
        onEnter && onEnter()
    };
    onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        const {onBlur} = this.props
        this.setState({
            editMode: false
        } as StateType);
        onBlur && onBlur(e)
    };
    onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const {onDoubleClick} = this.props.spanProps || {}
        this.setState({
            editMode: true
        } as StateType);
        onDoubleClick && onDoubleClick(e)
    };

    render() {
        let {
            autoFocus,
            onBlur,
            onEnter,
            spanProps,
            ...restProps
        } = this.props;
        const {children, className, ...restSpanProps} = spanProps || {};
        const spanClassName = `${style.editSpan} ${className}`;

        return (
            <div className={style.editableSpanWrapper}>
                <CSSTransition in={this.state.editMode}
                               timeout={400}
                               classNames={style}
                               unmountOnExit
                               mountOnEnter>
                    <div className={style.inputWrapper}>
                        <InputText
                            className={'forStatus'}
                            autoFocus
                            onBlur={this.onBlurCallback}
                            onEnter={this.onEnterCallback}
                            onDoubleClick={this.onDoubleClickCallBack}
                            error={restProps.error}
                            customStyle={style.inputStyle}
                            {...restProps}/>
                    </div>
                </CSSTransition>
                <CSSTransition in={!this.state.editMode}
                               timeout={500}
                               classNames={style}
                               unmountOnExit
                               mountOnEnter>
                    <div className={style.spanWrapper}>
                    <span onDoubleClick={this.onDoubleClickCallBack}
                          className={spanClassName}
                          {...restSpanProps}
                          role={'profileStatusSpan'}>
                        {children || restProps.value}
                        <FontAwesomeIcon className={style.editPen} icon={faPencilAlt}/>
                    </span>
                    </div>
                </CSSTransition>
            </div>
        )
    }
}

export default EditableSpan
