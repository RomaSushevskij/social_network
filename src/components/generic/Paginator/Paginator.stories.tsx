import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Paginator} from './Paginator';

const getCategoryObj = (categoryName: 'Colors' | 'Events' | 'Main') => {
    return ({
        table: {
            category: categoryName
        },
    })
};

export default {
    title: 'Paginator',
    component: Paginator,
    parameters: {
        backgrounds: {
            default: 'default',
            values: [
                {name: 'default', value: 'linear-gradient(90deg, rgb(255, 99, 71), rgb(62, 139, 134));'},
                {name: 'tomato', value: 'tomato'},
            ],
        },
    },
    argTypes: {

        portionSize: {
            ...getCategoryObj('Main')
        },
        currentPage: {
            ...getCategoryObj('Main')
        },
        totalItemsCount: {
            ...getCategoryObj('Main')
        },
        pageSize: {
            ...getCategoryObj('Main')
        },
        onChangePage: {
            ...getCategoryObj('Events')
        },
    },

} as ComponentMeta<typeof Paginator>;

export const UsersPaginator: ComponentStory<typeof Paginator> = (args) => {
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <Paginator {...args}
                   portionSize={10}
                   currentPage={currentPage}
                   pageSize={12}
                   totalItemsCount={1000}
                   onChangePage={setCurrentPage}/>
    )
};



