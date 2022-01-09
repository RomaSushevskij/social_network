import React, {ChangeEvent, KeyboardEvent, LegacyRef, useState} from 'react';
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
        },
        background: {
            ...getCategoryObj('Colors'),
            control: 'color'
        },
        color: {
            ...getCategoryObj('Colors'),
            control: 'color'
        },


    },

} as ComponentMeta<typeof Textarea>;

const onKeyEnter = action('Post has been added');
const onKeyPress = action('Value of textarea has been changing');

const Template: ComponentStory<typeof Textarea> = (args) => <Textarea {...args} />;

export const TextareaForAddingPost = Template.bind({});
const onAddMessageWithEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        onKeyEnter()
    }
};
TextareaForAddingPost.args = {
    onAddWithEnter: onAddMessageWithEnter,
    placeholder: 'Here you can leave your post',
    background: '#ffefd0',
    color: '#60575A'
};
export const ChangingTextarea: ComponentStory<typeof Textarea> = (args) => {
    const [textareaValue, setTextareaValue] = useState<string>('');
    const onUpdateMessageText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaValue(e.currentTarget.value);
        onKeyPress();
    };
    return <Textarea {...args}
                     textareaValue={textareaValue}
                     setTextareaValue={onUpdateMessageText}
                     onAddWithEnter={onAddMessageWithEnter}/>
};
ChangingTextarea.args = {
    placeholder: 'Enter your message',
    background: '#000000',
    color: '#ffffff'
}


