/// <reference types="cypress" />


describe('basic functionality', () => {
  beforeEach(() => {
    cy.visit('localhost:3001')
    cy.get('.login').click()
    cy.get('.input-username').type('will')
    cy.get('.input-password').type('1234')
    cy.get('.login-button').click()
    cy.wait(3000)
    cy.get('.gg-close').click()
  })

  it('sidebar is visible', () => {
  
    cy.get('.sidebar').should('have.length', 1)

  })


  it ('can post anime', () => {
    cy.visit('localhost:3001/animelist')
    cy.get('.view-animeform').click()
    cy.get('#animename').type('My Hero Academia')
    cy.get('#description').type('A superhero shounen anime, not much more.')
    cy.get('#genres').type('shounen, action')
    cy.get('#img-url').type('https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21459-oZMZ7JwS5Sxq.jpg')
    cy.get('.create-anime-button').click()
    cy.wait(2000)
    cy.get('.animeobject-title:first').contains('My Hero Academia')
  })

  it ('can post news', () => {
    cy.get('.news').click()
    
    cy.wait(500)
    cy.get('.post-news').click()

    cy.get('#newsform').type('News test')
    cy.get('#description').type('News description')

    cy.get('.create-news-button').click()
    cy.wait(2000)
    cy.get('.news-title:first').contains('News test')
  })

  it ('can post comments on anime', () => {
    
    cy.get('.animeobject:first').click()
    cy.wait(500)
    cy.get('.show-comment-form').click()
    
    cy.get('.comment-desc').type('Test comment')
    cy.get('.create-comment-button').click()
    cy.wait(2000)
    cy.get('.comment-d:first').contains('Test comment')
  })

  it ('can post comments on news', () => {
    cy.get('.news').click()
    cy.get('.read-more:first').click()
    cy.wait(500)
    cy.get('.show-comment-form-news').click()
    
    cy.get('.comment-desc').type('Test comment')
    cy.get('.create-comment-button').click()
    cy.wait(2000)
    cy.get('.comment-d:first').contains('Test comment')
  })

  it ('can change profile picture', () => {
    cy.get('.open-sidebar').click()
    cy.wait(200)
    cy.get('.open-profile').click()
    cy.get('.gg-close').click()
    cy.get('.change-profile').click()
    
    cy.get('.profile-url').type('https://s4.anilist.co/file/anilistcdn/user/avatar/large/b815342-HyBArQJNerBA.png')
    cy.get('.change-profile-button').click()
    cy.wait(3000)
    cy.get('.profile-picture').should('have.attr', 'src').should('include','https://s4.anilist.co/file/anilistcdn/user/avatar/large/b815342-HyBArQJNerBA.png')
  })


  it ('can logout', () => {
    cy.get('.open-sidebar').click()
  
    cy.get('.logout').click()
    cy.wait(1000)
    cy.get('.login').should('have.length', 1)
  })

  it('can create new user', () => {
    cy.get('.open-sidebar').click()
  
    cy.get('.logout').click()
    cy.wait(1000)
    cy.get('.signup').click()

    const randomNumber = Math.floor(Math.random() * 10000);
    cy.get('.userform-username').type('user' + randomNumber)
    cy.get('.userform-password').type('12345')

    cy.get('.create-user-button').click()
    cy.wait(4000)
    cy.get('.login-title').contains('Login')

  })

})
