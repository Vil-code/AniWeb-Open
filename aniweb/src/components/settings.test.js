import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, act } from '@testing-library/react'
import Settings from './Settings';
import {
    BrowserRouter as Router
  } from "react-router-dom";
  window.scrollTo = jest.fn();

describe('sidebar two states tests', () => {
    it('renders profile name correctly', async () => {
        await act(async () => {
            const component = render(<Router><Settings user={{username: 'testuser'}} /></Router>)
    
        expect(component.container).toHaveTextContent(
            'testuser'
        )
        })
        
    })
    afterAll(() => {
        jest.clearAllMocks();
      });
  })

