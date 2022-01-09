import React, {ChangeEvent, KeyboardEvent, LegacyRef} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Textarea} from './Textarea';
import {action} from "@storybook/addon-actions";

const getCategoryObj = (categoryName: 'Colors' | 'Events' | 'Main') => {
    return ({
        table: {
            category: categoryName
        }
    })
};

export default {
    title: 'Textarea',
    component: Textarea,
    argTypes: {
        textareaValue: {
            ...getCategoryObj('Main')
        },
        reference: {
            ...getCategoryObj('Main')
        },
        placeholder: {
            ...getCategoryObj('Main'),
            defaultValue: 'Description of textarea value'
        },
        setTextareaValue: {
            ...getCategoryObj('Events')
        },
        onAddWithEnter: {
            ...getCategoryObj('Events')
        }, background: {
            control: 'color'
        },
        color: {
            control: 'color'
        },
        ...getCategoryObj('Colors'),

    },

} as ComponentMeta<typeof Textarea>;

const onKeyEnter = action('Post has been added');
const Template: ComponentStory<typeof Textarea> = (args) => <Textarea {...args} />;

export const TextareaForAddingPost = Template.bind({});
TextareaForAddingPost.args = {
    onAddWithEnter: onKeyEnter,
    placeholder: 'Here you can leave your post',
    background: '#ffefd0',
    color: '#60575A'

};

