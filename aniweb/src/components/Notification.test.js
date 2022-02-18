import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Notification from './Notification'

describe('render Notification correctly under different conditions', () => {
    
    it ('renders userform correctly with NO message', () => {
    const component = render(<Notification message={null} />)
    
        expect(component.container).not.toHaveTextContent(
            'test'
        )
        
    })

    it ('renders userform correctly WITH message', () => {
    const component = render(<Notification message={'test'} />)
    
        expect(component.container).toHaveTextContent(
            'test'
        )
       
    })
})
