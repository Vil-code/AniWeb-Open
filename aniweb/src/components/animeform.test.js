import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, act } from '@testing-library/react'
import Animeform from './Animeform';
import {
    BrowserRouter as Router
  } from "react-router-dom";

it ('renders animeform correctly', () => {
    const component = render(<Router> <Animeform /> </Router>)
    
        expect(component.container).toHaveTextContent(
            'anime title'
        )
        expect(component.container).toHaveTextContent(
            'description'
        )
        expect(component.container).toHaveTextContent(
            'genres'
        )
        expect(component.container).toHaveTextContent(
            'img url (optional)'
        )
})

