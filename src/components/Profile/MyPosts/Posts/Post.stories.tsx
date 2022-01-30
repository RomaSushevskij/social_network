import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Post} from './Post';
import {action} from "@storybook/addon-actions";

const getCategoryObj = (categoryName: 'Colors' | 'Events' | 'Main') => {
    return ({
        table: {
            category: categoryName
        }
    })
};

export default {
    title: 'Post',
    component: Post,
    argTypes: {
        background: {
            ...getCategoryObj('Colors'),
            control: 'color',
            defaultValue: '#FF6347'
        },
        color: {
            ...getCategoryObj('Colors'),
            control: 'color',
            defaultValue: '#ffffff'
        },
        name: {
            defaultValue: 'Roman Sushevskij',
            ...getCategoryObj('Main')
        },
        image: {
            ...getCategoryObj('Main'),
        },
        likeCount: {
            ...getCategoryObj('Main'),
            defaultValue: 0
        },
        message: {
            ...getCategoryObj('Main'),
            defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur dicta dignissimos magni quae rem temporibus.'
        },
        id: {
            ...getCategoryObj('Main'),
        }
    },

} as ComponentMeta<typeof Post>;

const onRemovePost = (id:number) => {
    alert(`post with id ${id} was removed`)
}

const Template: ComponentStory<typeof Post> = (args) => {
    return (
        <Post {...args} />
    )
}

export const PostSomeone = Template.bind({});
PostSomeone.args = {
    id: 13,
    name: 'Sushevskij Roman',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur dicta dignissimos magni quae rem temporibus.',
    likeCount: 199,
    image: 'https://cdn-icons-png.flaticon.com/512/147/147142.png',
    removePost: onRemovePost
};




