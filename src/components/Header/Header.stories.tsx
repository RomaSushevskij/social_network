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
            ...getCategoryObj('Colors'),
            defaultValue: logo
        }
    },

} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;
export const FacebookHeader = Template.bind({});
FacebookHeader.args = {
    background: '#3F66A2',
    color: '#F7F7F7',
    title: 'Facebook',
    description: 'Social network',
    logo:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEU7WZj///8lS5Hi5e0hSJArTpPy9Pg0VZfT2OUwUpW1vtQ4V5ckSpEpTZIuUJSLmr3Jz995irRGYZ1yhbFedKeossygq8hpfazEy9zo6/Ld4etQaaFYcKXX3OiBkbiYpcS+xtmQnr+xutGFlbpkeaoAOYkQQI2+KnXKAAAEaklEQVR4nO3da3uaMByGccBIpOFste20523f/yNObb3aHQqPkBD+2XO/2ptqftNCIQSi+KN0EUrpJ1V0/kfdZCpPwihXuqn/ENZtoqOQ0klbfxZWyvgekvWMqj6E68L3cJxUrM/CKkzggVi9CWvleyTOUquTsA3vd/CcaY/COvE9Docl9UHYhLWb+D3dHISZ71E4TcdRGu525phKo0XuexBOyxfRIuQNzWFTQ6H4KJQfhfKjUH4Uyo9C+VEoPwrlR6H8KPScMTrLsvJYdkprbUx0yTn6+Qp1VuR5e91Uj9vNqe3jc/X6sL653rVZfpzLXZaZ7rfOU2iyJL/Z3t7FX5befaufNo/Nrpc4R2Gmdtv7r3G/9VT2vdrshKYw247P7s+upAlNvq/7WXKFB9/qIp80YWZuL/QJE75fORGsUJeXfkGFCct92s+RLCyaQT45wmLIr6AkYfE6FChEWA79ikoR6uvhQBFCo0cARQgVehghVVg+jgEKEB6vrAtbqAb9rSZIqG/GAecvVIvAhXo9Ejh7YT5qTyFAaHZjgXMXllehC9Vo4MyF47czcxcux39JZy5Uw07NyBFa2JLOXJg9WxDOemZmecEZ7rur5/XOJOqveoE+hTk6xZRuW7VEJkP/mT+hKUHgJi/HrDzzKNxjwOtk3Mo6f0L9AAH3Y1dl+RNmWwRY9W9KevInLF8A4GL8qjN/wgKZzn4Yv3LQoxA5B2Vh4aA/YQ6corGxftejENjhby0sb/UoBI4sbKxQnrew/5qu/vwJkaNDG+8zb2EW/Gc46k/u92YutPA+8xYuLbwPhe6ikEI0Ct1FIYVoFLqLQgrRKHQXhRSiUeiuMIRdJ5IQoY0bxzoVGqO/DhHmHT9/yrPQZP2GkT30G4UL935Xq08gBL6msoUpcGNS2ULk1quyhTWwO5EtfAEmNmQLn4FZcNnCdfDbUmQWXLYQmSMWLYTuRC5a+A0ZuWjhLXJ0JVq4Qeb5RQuR3aFs4U3wR8DQs1VEC6GrTyULkaND2cJ7aOCShU/Q6VTJwg10BbFk4Wvwwu/QNdKShdgoJAuxcQsW3mFPcRIsXAX/GfYvcpYuBBfUCBYCM2vChcDMmmthpFddAYiuH78HB+F2Hr/oeCjxD2CW+2fXU41nIewqjGsxuqKQQjQK3UUhhWgUuotCCtEodBeFFKJR6C4KKUSj0F0UUohGobsopBCNQndRSCEahe6ikEI0Ct1FIYVoFLqLQgrRKHQXhRSiUeguCilEo9BdFFKIRqG7KKQQjUJ3UUghGoXuopBCNArdRSGFaP+HELuTje2mEuaLCLqTq/2mEqo0Qm5O76CphDqOrDw5+fImEurmILTxfO/Lm0iY1Achdh9Q200jNG18FNY+tjXTCNXqJIwrG4+sufS9pxAWVfwmjNfTE6cQFuv4LIwrNfXvonuhUVX8IYxXbTLtTsO1UCft+822ovPL1Y1Wedetp+wG3Qlr6HhypZv6/CrRp1dMFxPWD4yHv/jn/75fCu1Z0D7LW34AAAAASUVORK5CYII='
};



