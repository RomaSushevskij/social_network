import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Button} from './Button';
import {action} from "@storybook/addon-actions";

const getCategoryObj = (categoryName: 'Colors' | 'Events' | 'Main') => {
    return ({
        table: {
            category: categoryName
        }
    })
};

export default {
    title: 'Button',
    component: Button,
    argTypes: {
        name: {
            ...getCategoryObj('Main'),
            defaultValue: 'Title'
        },
        backgroundHover: {
            ...getCategoryObj('Colors'),
            control: 'color',
            defaultValue: '#ffbf47'
        },
        background: {
            ...getCategoryObj('Colors'),
            control: 'color',
            defaultValue: '#ffffff'
        },
        colorHover: {
            ...getCategoryObj('Colors'),
            control: 'color',
            defaultValue: '#ffffff'
        },
        callback: {
            ...getCategoryObj('Main')
        }
    },

} as ComponentMeta<typeof Button>;

const onAddButtonClick = action('Post has been added');
const onSendButtonClick = action('Message has been sent');
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const AddButton = Template.bind({});
AddButton.args = {
    name: 'Add post',
    callback: onAddButtonClick,
    background: '#ffe1a9',
    backgroundHover: '#ffbf47',
    colorHover: '#ffffff'
};
export const SendButton = Template.bind({});
SendButton.args = {
    name: 'Send',
    callback: onSendButtonClick,
    background: '#ffffff',
    backgroundHover: 'tomato'
};


