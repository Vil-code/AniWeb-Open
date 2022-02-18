import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, act } from '@testing-library/react'
import News2 from './News2';
import {
    BrowserRouter as Router
  } from "react-router-dom";
  window.scrollTo = jest.fn();

describe('renders news correctly', () => {
    it('renders profile name correctly', async () => {
        await act(async () => {
            const component = render(<Router><News2 title={'testNews'} description={'testDescription'} comment={[{text: 'testcomment1', person: 'user1'}, {text: 'testcomment2', person: 'user2'}]} user={{username: 'testuser'}} /></Router>)
    
        expect(component.container.querySelector('.news-title')).toHaveTextContent(
            'testNews'
        )
        expect(component.container.querySelector('.news-description')).toHaveTextContent(
            'testDescription'
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

