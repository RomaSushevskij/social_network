import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Dialog} from './Dialog';
import {BrowserRouter} from "react-router-dom";

const getCategoryObj = (categoryName: 'Colors' | 'Events' | 'Main') => {
    return ({
        table: {
            category: categoryName
        }
    })
};

export default {
    title: 'Dialog',
    component: Dialog,
    argTypes: {
        background: {
            ...getCategoryObj('Colors'),
            control: 'color',
            defaultValue: '#FFFFFF'
        },
        color: {
            ...getCategoryObj('Colors'),
            control: 'color',
            defaultValue: '#333333'
        },
        image: {
            ...getCategoryObj('Main'),
        },
        id: {
            ...getCategoryObj('Main'),
        }
    },

} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => {
    return (
        <BrowserRouter>
            <Dialog {...args} />
        </BrowserRouter>
    )
}

export const DialogSomeone = Template.bind({});
DialogSomeone.args = {
    id: 13,
    name: 'Someone',
    image: 'https://cdn-icons-png.flaticon.com/512/147/147142.png',
};




