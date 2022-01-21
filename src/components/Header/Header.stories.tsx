import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import logo from '../../main-logo.png'

import {Header} from './Header';

const getCategoryObj = (categoryName: 'Colors' | 'Events' | 'Main') => {
    return ({
        table: {
            category: categoryName
        }
    })
};

export default {
    title: 'Header',
    component: Header,
    argTypes: {
        title: {
            ...getCategoryObj('Main'),
            defaultValue: 'Title'
        },
        description: {
            ...getCategoryObj('Main'),
            defaultValue: 'Description'
        },
        background: {
            ...getCategoryObj('Colors'),
            control: 'color',
            defaultValue: '#7D823F'
        },
        color: {
            ...getCategoryObj('Colors'),
            control: 'color',
            defaultValue: '#ffffff'
        },
        logo: {
            ...getCategoryObj('Main'),
            defaultValue: logo
        }
    },

} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;
export const FacebookHeader = Template.bind({});
FacebookHeader.args = {
    background: '#1178F2',
    color: '#F7F7F7',
    title: 'Facebook',
    description: 'Social network',
    logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png'
};



