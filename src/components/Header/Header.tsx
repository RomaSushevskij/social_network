import React from "react";
import styleModule from './Header.module.css';
import styled from "styled-components";

export type HeaderPropsType = {
    title: string
    description?: string
    background: string
    color: string
    logo?: string
}

export const Header = React.memo(({
                           title,
                           description,
                           background,
                           color,
                           logo, ...props
                       }: HeaderPropsType) => {
    const Header = styled.header`
    & {
    background: ${background}
    `;
    const TitleDescription = styled.div`
    & p {
    color: ${color}
    }
    `;
    return (
        <Header className={styleModule.header}>
            <div className={styleModule.logoAndDescription}>
                <div className={styleModule.logo}>
                    <img src={logo} className={styleModule.main_logo}/>
                </div>
                <TitleDescription className={styleModule.title_description}>
                    <p>{title}</p>
                    <p>{description}</p>
                </TitleDescription>
            </div>
            <div className={styleModule.loginStatus}>

            </div>
        </Header>
    );
})

