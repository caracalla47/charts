describe('Charts Component', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('url'));
        cy.wait(5000);
        cy.get('.c8y-cookie-banner')
            .find('button.btn.btn-primary.btn-block')
            .eq(0)
            .click();
        cy.get('#tenant').type(Cypress.env('tenant'));
        cy.get('#user').type(Cypress.env('username'));
        cy.get('#password').type(Cypress.env('password'));
        cy.get('button.btn.btn-primary.btn-lg.btn-block.form-group')
            .click({ force: true});

    })

    it('Should contain a H1 element with the title: \'Charts Component\'', () => {
        cy.get('h1')
            .should('exist');
    })

    it('Should have 2 canvas elements', () => {
        cy.get('canvas')
            .should('exist')
            .should('have.length', 2)
    })
})