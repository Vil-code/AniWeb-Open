import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Scrollmenu from './ScrollMenu'


describe('scrollmenu in two states', () => {
    it('renders scrollmenu correctly when NOT logged in', async () => {
        
        const component = render(<Scrollmenu user={null} />)
    
        expect(component.container.querySelector('.genre-box')).toHaveTextContent(
            'All Genres'
        )
        expect(component.container.querySelector('.order-box')).toHaveTextContent(
            'Any Order'
        )
        
    })

        it('renders scrollmenu correctly when logged in', async () => {
           
            const component = render(<Scrollmenu user={{username: 'testuser'}} />)
        
            expect(component.container.querySelector('.genre-box')).toHaveTextContent(
                'All Genres'
            )
            expect(component.container.querySelector('.order-box')).toHaveTextContent(
                'Any Order'
            )    
            expect(component.container.querySelector('.view-animeform')).toHaveTextContent(
                'Post'
            )
        })
  })
