import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Header from './header'
import {
    BrowserRouter as Router
  } from "react-router-dom";

it('renders header correctly', () => {
    const component = render(<Router><Header /></Router>)

    expect(component.container).toHaveTextContent(
        'Main'
    )
    expect(component.container).toHaveTextContent(
        'Anime'
    )
    expect(component.container).toHaveTextContent(
        'News'
    )
    expect(component.container).toHaveTextContent(
        'About'
    )
})