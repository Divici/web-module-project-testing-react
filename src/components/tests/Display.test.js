import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchShow from './../../api/fetchShow';

import Display from './../Display';

jest.mock('./../../api/fetchShow');

const testShow = {
    name: 'Test',
    summary: 'Summary',
    seasons: [
        {
            id: 0,
            name: 'Season 1',
            episodes: []
        },
        {
            id: 1,
            name: 'Season 2',
            episodes: []
        },
    ]
};


test('renders without errors with no props', ()=>{
    render(<Display />);
});

test('renders Show component when the button is clicked ', async ()=>{
    fetchShow.mockResolvedValueOnce(testShow);

    render(<Display />);

    const button = screen.getByRole('button');
    userEvent.click(button);

    const show = await screen.findByTestId('show-container');
    expect(show).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async ()=>{
    fetchShow.mockResolvedValueOnce(testShow);

    render(<Display />);

    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() =>{
        const seasons = screen.queryAllByTestId('season-option');
        expect(seasons).toHaveLength(2);
    })
});

test('displayFunc is called when the fetch button is pressed', async ()=>{
    fetchShow.mockResolvedValueOnce(testShow);
    const displayFunc = jest.fn();

    render(<Display displayFunc={displayFunc}/>);

    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(()=>{
        expect(displayFunc).toBeCalled();
    });
});