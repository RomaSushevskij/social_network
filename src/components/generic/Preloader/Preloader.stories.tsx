import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Preloader} from './Preloader';
import {action} from "@storybook/addon-actions";

const getCategoryObj = (categoryName: 'Colors' | 'Events' | 'Main') => {
    return ({
        table: {
            category: categoryName
        }
    })
};

export default {
    title: 'Preloader',
    component: Preloader,
    parameters: {
        backgrounds: {
            default: 'default',
            control: 'color',
            values: [
                {name: 'default', value: 'linear-gradient(90deg, rgb(255, 99, 71), rgb(62, 139, 134));'},
                {name: 'tomato', value: 'tomato'},
                {name: 'white', value: 'white'},
            ],
        }
    },
    argTypes: {
        color: {
            ...getCategoryObj('Colors'),
            control: 'color',
            defaultValue: '#000000'
        },
        size: {
            ...getCategoryObj('Colors'),
            defaultValue: '100px'
        },
    },

} as ComponentMeta<typeof Preloader>;


const Template: ComponentStory<typeof Preloader> = (args) => <Preloader {...args} />;

export const DefaultPreloder = Template.bind({});
DefaultPreloder.args = {
    color: '#ffffff',
    size: '100px',
};



