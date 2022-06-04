import React from 'react'
import {ProfileStatus} from './ProfileStatus';
import {fireEvent, render, screen} from '@testing-library/react';

describe('ProfileStatus component', () => {
    it('status from props should be in the local state', () => {
        const status = `It's my new status`;
        render(<ProfileStatus status={status} updateStatus={() => {
        }}/>);
        screen.debug();
        expect(screen.getByText(status)).toBeInTheDocument();
    })
    it(`after creation span should be displayed`, () => {
        const status = `It's my new status`;
        const role = 'profileStatusSpan';
        render(<ProfileStatus status={status} updateStatus={() => {
        }}/>);
        screen.debug();
        const span = screen.getByRole(role)
        expect(span).toBeInTheDocument();
    })
    it(`after creation input should'd be displayed`, () => {
        const status = `It's my new status`;
        const role = 'profileStatusInput';
        render(<ProfileStatus status={status} updateStatus={() => {
        }}/>);
        screen.debug();
        const input = screen.queryByRole(role)
        expect(input).not.toBeInTheDocument();
    })
    it(`input should be displayed in edit mode instead of span`, () => {
        const status = `It's my new status`;
        const roleSpan = 'profileStatusSpan';
        const roleInput = 'profileStatusInput';
        render(<ProfileStatus status={status} updateStatus={() => {
        }}/>);
        screen.debug();
        const span = screen.getByRole(roleSpan)
        expect(span).toBeInTheDocument();
        expect(span.innerHTML).toContain(status);
        fireEvent.doubleClick(span)
        screen.debug();
        const input2 = screen.getByRole(roleInput)
        expect(input2).toHaveValue(status);
        expect(input2).toBeInTheDocument();
    })
    it(`callback should be called`, () => {
        const status = `It's my new status`;
        const roleSpan = 'profileStatusSpan';
        const roleInput = 'profileStatusInput';
        const mockCallback = jest.fn();
        render(<ProfileStatus status={status} updateStatus={mockCallback}/>);
        screen.debug();
        const span = screen.getByRole(roleSpan)
        expect(span).toBeInTheDocument();
        expect(span.innerHTML).toContain(status);
        fireEvent.doubleClick(span)
        const input2 = screen.getByRole(roleInput)
        expect(input2).toHaveValue(status);
        expect(input2).toBeInTheDocument();
        screen.debug();
        fireEvent.blur(input2);
        expect(mockCallback.mock.calls.length).toBe(1);
        screen.debug();
    })
})
