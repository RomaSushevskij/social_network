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
export const HelloMessage = Template.bind({});
HelloMessage.args = {
    name:'Lena',
    message:'Hello',
    time:'13:45',
    background:'#1EA7FD',
    color:'#ffffff',
    image: 'https://cdn-icons-png.flaticon.com/512/147/147142.png'
};

