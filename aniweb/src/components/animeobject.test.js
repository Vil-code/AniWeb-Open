import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, act } from '@testing-library/react'
import AnimeObject2 from './AnimeObject2';
import {
    BrowserRouter as Router
  } from "react-router-dom";
  window.scrollTo = jest.fn();

describe('renders animeobject correctly', () => {
    it('renders profile name correctly', async () => {
        await act(async () => {
            const component = render(<Router><AnimeObject2 title={'testAnime'} description={'testDescription'} genres={'testGenre'} url={'testUrl'} comment={[{text: 'testcomment1', person: 'user1'}, {text: 'testcomment2', person: 'user2'}]} user={{username: 'testuser'}} /></Router>)
    
        expect(component.container.querySelector('.animeobject-title')).toHaveTextContent(
            'testAnime'
        )
        expect(component.container.querySelector('.description-main')).toHaveTextContent(
            'testDescription'
        )
        expect(component.container.querySelector('.g')).toHaveTextContent(
            'testGenre'
        )
        expect(component.container.querySelector('.comment-container:nth-child(2) .comment-d')).toHaveTextContent(
            'testcomment1'
        )
        expect(component.container.querySelector('.comment-container:first-child .comment-d')).toHaveTextContent(
            'testcomment2'
        )
        })
        
    })
    afterAll(() => {
        jest.clearAllMocks();
      });
  })

