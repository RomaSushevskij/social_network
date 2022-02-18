import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Message} from './Message';

const getCategoryObj = (categoryName: 'Colors' | 'Events' | 'Main') => {
    return ({
        table: {
            category: categoryName
        }
    })
};

export default {
    title: 'Message',
    component: Message,
    parameters: {
        backgrounds: {
            default: 'default',
            values: [
                {name: 'default', value: '#F0F0F8'},
                {name: 'tomato', value: 'tomato'},
            ],
        },
    },
    argTypes: {
        background: {
            ...getCategoryObj('Colors'),
            control: 'color',
            defaultValue: '#1EA7FD'
        },
        color: {
            ...getCategoryObj('Colors'),
            control: 'color',
            defaultValue: '#ffffff'
        },
        meBackground: {
            ...getCategoryObj('Colors'),
            control: 'color',
            defaultValue: '#1EA7FD'
        },
        meColor: {
            ...getCategoryObj('Colors'),
            control: 'color',
            defaultValue: '#ffffff'
        },
        message: {
            ...getCategoryObj('Main'),
            defaultValue:'Hello, World!'
        },
        name: {
            defaultValue:'Roman',
            ...getCategoryObj('Main')
        },
        time: {
            ...getCategoryObj('Main'),
            defaultValue:'13:00'
        },
        image: {
            ...getCategoryObj('Main'),
        },
        id: {
            ...getCategoryObj('Main'),
        }
    }
} as ComponentMeta<typeof Message>;

const Template: ComponentStory<typeof Message> = (args) => <Message {...args} />;
export const SomeOneMessage = Template.bind({});
SomeOneMessage.args = {
    id: 3,
    name:'Someone',
    message:'Hello',
    time:'13:45',
    background:'#FFFFFF',
    color:'#293440',
    meBackground:'#6B8AF4',
    meColor:'#FCFDFE',
    image: 'https://cdn-icons-png.flaticon.com/512/147/147142.png'
};
export const MyMessage = Template.bind({});
MyMessage.args = {
    id: 13,
    name:'Me',
    message:'Hello',
    time:'13:45',
    background:'#FFFFFF',
    color:'#293440',
    meBackground:'#6B8AF4',
    meColor:'#FCFDFE',
    image: 'https://cdn-icons-png.flaticon.com/512/147/147142.png'
};


