/// <reference types="Cypress"/>

describe('Hacker Stories', () => {
  const initialTerm = 'React'
  const newTerm = 'Cypress'
  context('Hitting the real API', () => {
    beforeEach(() => {
      cy.intercept({
        method: 'GET',
        pathname: '**/search',
        query: {
          query: initialTerm,
          page: '0'
        }
      }).as('getInitialTermStories')

      cy.visit('/').wait('@getInitialTermStories')

      cy.contains('More').should('be.visible')
    })
    it('shows 20 stories, then the next 20 after clicking "More" ', () => {
      cy.intercept({
        method: 'GET',
        pathname: '**/search',
        query: {
          query: 'React',
          page: '1'
        }
      }).as('getNextStories')
      cy.get('.item').should('have.length', 20)

      cy.contains('More')
        .should('be.visible').click()

      cy.wait('@getNextStories')

      cy.get('.item').should('have.length', 40)
    })
    it('searches via the last searched term', () => {
      cy.intercept('GET', `**/search?query=${newTerm}&page=0`)
        .as('getNewTermStories')

      cy.get('#search').clear()
        .should('be.visible')
        .type(`${newTerm}{enter}`)

      cy.wait('@getNewTermStories')

      cy.get(`button:contains(${initialTerm})`)
        .should('be.visible')
        .click()

      cy.wait('@getInitialTermStories')

      cy.get('.item')
        .should('have.length', 20)
      cy.get('.item')
        .first()
        .should('contain', initialTerm)
      cy.get(`button:contains(${newTerm})`)
        .should('be.visible')
    })
  })
  context('Mocking the API', () => {
    context('Footer and list of stories', () => {
      beforeEach(() => {
        cy.intercept(
          'GET',
          `**/search?query=${initialTerm}&page=0`,
          { fixture: 'stories' }
        ).as('getStories')

        cy.visit('/')
          .wait('@getStories')
      })
      it('shows the footer', () => {
        cy.get('footer')
          .should('be.visible')
          .and('contain', 'Icons made by Freepik from www.flaticon.com')
      })
      context('List of stories', () => {
        const stories = require('../fixtures/stories.json')
        it('shows the right data for all rendered stories', () => {
          cy.get('.item').first()
            .should('contain', stories.hits[0].title)
            .and('contain', stories.hits[0].author)
            .and('contain', stories.hits[0].num_comments)
            .and('contain', stories.hits[0].points)
          cy.get(`.item a:contains(${stories.hits[0].title})`)
            .should('have.attr', 'href', stories.hits[0].url)

          cy.get('.item').last()
            .should('contain', stories.hits[1].title)
            .and('contain', stories.hits[1].author)
            .and('contain', stories.hits[1].num_comments)
            .and('contain', stories.hits[1].points)
          cy.get(`.item a:contains(${stories.hits[1].title})`)
            .should('have.attr', 'href', stories.hits[1].url)
        })
        it('shows one less story after dimissing the first story', () => {
          cy.get('.button-small')
            .first()
            .should('be.visible')
            .click()

          cy.get('.item').should('have.length', 1)
        })
        context('Order by', () => {
          it('orders by title', () => {
            cy.get('.list-header-button:contains(Title)')
              .should('be.visible').click()

            cy.get('.item:first')
              .should('be.visible')
              .and('contain', stories.hits[0].title)

            cy.get(`.item a:contains(${stories.hits[0].title})`)
              .should('have.attr', 'href', stories.hits[0].url)
          })
          it('orders by author', () => {
            cy.get('.list-header-button:contains(Author)')
              .should('be.visible').click()

            cy.get('.item:first')
              .should('be.visible')
              .and('contain', stories.hits[0].author)
          })
          it('orders by comments', () => {
            cy.get('.list-header-button:contains(Comments)')
              .should('be.visible').click()

            cy.get('.item:first')
              .should('be.visible')
              .and('contain', stories.hits[0].num_comments)
          })
          it('orders by points', () => {
            cy.get('.list-header-button:contains(Points)')
              .should('be.visible').click()

            cy.get('.item:first')
              .should('be.visible')
              .and('contain', stories.hits[0].points)
          })
        })
      })
    })
    context('Search', () => {
      context('Empty stories', () => {
        beforeEach(() => {
          cy.intercept('GET', `**/search?query=${initialTerm}&page=0`, { fixture: 'empty' })
            .as('getEmptyStories')
          cy.intercept('GET', `**/search?query=${newTerm}&page=0`, { fixture: 'stories' })
            .as('getStories')

          cy.visit('/')
            .get('#search')
            .clear()
        })
        it('shows no story when there is none', () => {
          cy.wait('@getEmptyStories')
            .get('.item')
            .should('not.exist')
        })
        context('Last searches', () => {
          it('shows a max of 5 buttons for the last searched terms', () => {
            const faker = require('faker')

            cy.intercept(
              'GET',
              '**/search**',
              { fixture: 'empty' }).as('getRandomStories')

            Cypress._.times(6, () => {
              cy.get('#search').clear()
                .should('be.visible')
                .type(`${faker.random.word()}{enter}`)
              cy.wait('@getRandomStories')
            })

            // cy.get('.last-searches button')
            //   .should('have.length', 5)
            cy.get('.last-searches')
              .within(() => {
                cy.get('button').should('have.length', 5)
              })
          })
        })
      })
      context('Fixture stories', () => {
        beforeEach(() => {
          cy.intercept('GET', `**/search?query=${initialTerm}&page=0`, { fixture: 'empty' })
            .as('getEmptyStories')
          cy.intercept('GET', `**/search?query=${newTerm}&page=0`, { fixture: 'stories' })
            .as('getFixtureStories')

          cy.visit('/')
            .wait('@getEmptyStories')
            .get('#search')
            .clear()
        })
        it('types and hits ENTER', () => {
          cy.get('#search')
            .should('be.visible')
            .type(`${newTerm}{enter}`)
            .wait('@getFixtureStories')

          cy.get('.item').should('have.length', 2)
          cy.get(`button:contains(${initialTerm})`)
            .should('be.visible')
        })
        it('types and clicks the submit button', () => {
          cy.get('#search')
            .should('be.visible')
            .type(newTerm)
          cy.contains('Submit')
            .should('be.visible')
            .click()

            .wait('@getFixtureStories')

          cy.get('.item').should('have.length', 2)
          cy.get(`button:contains(${initialTerm})`)
            .should('be.visible')
        })
        it('types and submits the form directly', () => {
          cy.get('#search')
            .should('be.visible')
            .type(newTerm)
          cy.get('form')
            .submit()

          cy.wait('@getFixtureStories')

          cy.get('.item').should('have.length', 2)
          cy.get(`button:contains(${initialTerm})`)
            .should('be.visible')
        })
      })
    })
  })
  context('Errors', () => {
    const errorMessage = 'Something went wrong ...'
    it('shows "Something went wrong ..." in case of a server error', () => {
      cy.intercept(
        'GET',
        '**/search**',
        { statusCode: 500 })
        .as('getServerError')

      cy.visit('/')
      cy.wait('@getServerError')

      cy.get(`p:contains(${errorMessage})`)
        .should('be.visible')
    })
    it('shows "Something went wrong ..." in case of a network error', () => {
      cy.intercept(
        'GET',
        '**/search**',
        { forceNetworkError: true })
        .as('getNetworkError')

      cy.visit('/')
      cy.wait('@getNetworkError')

      cy.get(`p:contains(${errorMessage})`)
        .should('be.visible')
    })
  })
})
