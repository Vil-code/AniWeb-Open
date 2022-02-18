import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, act } from '@testing-library/react'
import Loginform from './Loginform';
import {
    BrowserRouter as Router
  } from "react-router-dom";

it ('renders loginform correctly', () => {
    const component = render(<Router> <Loginform /> </Router>)
    
        expect(component.container).toHaveTextContent(
            'username'
        )
        expect(component.container).toHaveTextContent(
            'password'
        )
})
