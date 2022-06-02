import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {ProfileStatus} from './ProfileStatus';

test('status from props should be in the local state', () => {
    const status = `It's my new status`;
    render(<ProfileStatus status={status} updateStatus={() => {
    }}/>)
})