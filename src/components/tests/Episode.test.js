import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const mockEpisode = {
    id:1, 
    name: '', 
    image: 'https://i.ibb.co/2FsfXqM/stranger-things.png', 
    season: 1, 
    number: 1, 
    summary: 'Summary Test', 
    runtime: 1
}

const mockEpisodeNoImage = {
    id:1, 
    name: '',
    image: null,  
    season: 1, 
    number: 1, 
    summary: 'Summary Test', 
    runtime: 1
}

test("renders without error", () => {
    render(<Episode episode={mockEpisode} />);
});

test("renders the summary test passed as prop", ()=>{
    render(<Episode episode={mockEpisode} />);
    const summary = screen.queryByText(/Summary Test/i);
    expect(summary). toBeInTheDocument();
    expect(summary).toBeTruthy();
    expect(summary).toHaveTextContent('Summary Test');
});

test("renders default image when image is not defined", ()=>{
    render(<Episode episode={mockEpisodeNoImage} />);
    const imgAltText = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png');
    expect(imgAltText).toBeInTheDocument();
});
