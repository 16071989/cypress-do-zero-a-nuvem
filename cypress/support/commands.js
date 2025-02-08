// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').should('be.visible').type('Felipe').should('have.value', 'Felipe')
    cy.get('#lastName').should('be.visible').type('Silva').should('have.value', 'Silva')
    cy.get('#email').should('be.visible').type('felipe.silva@teste.com').should('have.value', 'felipe.silva@teste.com')
    cy.get('#phone').should('be.visible').type('11969692424').should('have.value', '11969692424')
    cy.get('#product').select(1).should('be.visible', 'blog')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click().should('be.visible')
})