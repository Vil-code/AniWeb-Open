import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import About from './About'


it('renders About component correctly', () => {
    const component = render(<About />)

    expect(component.container.querySelector('.about-title')).toHaveTextContent(
        'About this site'
    )
    expect(component.container.querySelector('.about-functions')).toHaveTextContent(
        'Site functions'
    )
    expect(component.container.querySelector('.about-rules')).toHaveTextContent(
        'Rules'
    )
})