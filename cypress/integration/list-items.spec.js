describe('List Items', () => {
    beforeEach(() => {
        cy.seedAndVisit()
    })

    it('CN01-properly displays completed items', () => {
       cy.get('.todo-list li')
       .filter('.completed')
       .should('have.length',1)
       .and('contain','Eggs')
       .find('.toggle')
       .should('be.checked')
    })

    it.only('CN02-Shows remaining todos in the footer', () => {
        cy.get('.todo-count')
        .should('contain', 3)
     })
    

     it.only('CN03-Removes a todo', () => {
        cy.route({
           url: '/api/todos/1',
           method: 'DELETE',
           status: 200,
           response: {}
        })

        cy.get('.todo-list li')
           .as('list')
        
        cy.get('@list')   
           .first()
           .find('.destroy')
           .invoke('show')
           .click()

        cy.get('@list')
        .should('have.length',3)
        .and('not.contain','Milk')   
    })
     
     it.only('CN04-Marks an incomplete',() => {
        cy.fixture('todos')
         .then(todos => {
            const target = Cypress._.head(todos)
            cy.route(
               'PUT',
               `/api/todos/${target.id}`,
               Cypress._.merge(target, {isComplete: true})
            )
         })

         cy.get('.todo-list li')
            .first()
            .as('first-todo')

         cy.get('@first-todo')   
            .find('.toggle')
            .click()
            .should('be.checked')
         
            cy.get('@first-todo')   
            .should('have.class','completed')

            cy.get('.todo-count')   
            .should('contain',2)
     } )
})    