import { ChartsComponent } from '../../src/app/charts/charts.component';

describe('ChartsComponent', () => {
    beforeEach(() => {
        cy.mount(ChartsComponent)
    })

    it('should contain a parent folder of class \'container\'', () => {
        cy.get('div').should('have.class', 'container')
    })

    it('should contain a header with the title \'Charts Component\'', () => {
        cy.get('div').find('h1').should('contain', 'Charts Component')
    })

    it('should contain two canvas elements', () => {
        cy.get('canvas').should('have.length', 2);
    })
})