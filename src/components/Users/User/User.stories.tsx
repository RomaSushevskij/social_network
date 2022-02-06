import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {User} from './User';
import {action} from "@storybook/addon-actions";
import {UserPhotoType} from "../../../redux/redusers/usersReducer/usersReducer";
import {BrowserRouter} from "react-router-dom";

const getCategoryObj = (categoryName: 'Colors' | 'Events' | 'Main') => {
    return ({
        table: {
            category: categoryName
        }
    })
};

export default {
    title: 'User',
    component: User,
    argTypes: {
        background: {
            ...getCategoryObj('Colors'),
            control: 'color',
            defaultValue: '#ff6347'
        },
        color: {
            ...getCategoryObj('Colors'),
            control: 'color',
            defaultValue: '#ffffff'
        },
        id: {
            ...getCategoryObj('Main'),
        },
        name: {
            defaultValue: 'Roman',
            ...getCategoryObj('Main')
        },
        photos: {
            ...getCategoryObj('Main')
        },
        status: {
            ...getCategoryObj('Main'),
            defaultValue: 'Hello, World!'
        },
        followed: {
            ...getCategoryObj('Main'),
            defaultValue: false
        },
        becomeFollower: {
            ...getCategoryObj("Events")
        },
        stopBeingFollower:{
            ...getCategoryObj("Events")
        }
    }
} as ComponentMeta<typeof User>;

const becameFollower = (id:number) => {
    alert(`User with id ${id} was added in followers`)
}
const stopBeingFollower = (id:number) => {
    alert(`User with id ${id} was removed from followers`)
}


const Template: ComponentStory<typeof User> = (args) => <BrowserRouter> <User {...args} /></BrowserRouter>;
export const UserRoman = Template.bind({});
UserRoman.args = {
    name: 'Roman',
    id: 131313,
    photos: {
        small: 'https://cdn-icons-png.flaticon.com/512/147/147142.png',
        large: 'https://cdn-icons-png.flaticon.com/512/147/147142.png'
    },
    status: 'I learn JS, React & Redux',
    followed: true,
    becomeFollower: becameFollower,
    stopBeingFollower:stopBeingFollower
};


