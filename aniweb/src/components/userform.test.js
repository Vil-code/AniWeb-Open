import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, act } from '@testing-library/react'
import Userform from './Userform';
import {
    BrowserRouter as Router
  } from "react-router-dom";

it ('renders userform correctly', () => {
    const component = render(<Router> <Userform /> </Router>)
    
        expect(component.container).toHaveTextContent(
            'username'
        )
        expect(component.container).toHaveTextContent(
            'password'
        )
})
