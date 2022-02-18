import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, act } from '@testing-library/react'
import Sidebar from './Sidebar';
import {
    BrowserRouter as Router
  } from "react-router-dom";


  describe('sidebar two states tests', () => {
    it('renders sidebar correctly when NOT logged in', async () => {
        await act(async () => {
            const component = render(<Router><Sidebar user={{username: ''}} /></Router>)
    
        expect(component.container).toHaveTextContent(
            'Login'
        )
        expect(component.container).toHaveTextContent(
            'Sign up'
        )

        })
        
      
    })

        it('renders sidebar correctly when logged in', async () => {
            await act(async () => {
                const component = render(<Router><Sidebar user={{username: 'testuser'}} /></Router>)
        
            expect(component.container).toHaveTextContent(
                'Profile'
            )
            expect(component.container).toHaveTextContent(
                'Logout'
            )
            })
        })
  })

