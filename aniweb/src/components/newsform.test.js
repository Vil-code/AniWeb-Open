import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, act } from '@testing-library/react'
import Newsform from './Newsform';
import {
    BrowserRouter as Router
  } from "react-router-dom";

it ('renders newsform correctly', () => {
    const component = render(<Router> <Newsform /> </Router>)
    
        expect(component.container).toHaveTextContent(
            'description'
        )
})
