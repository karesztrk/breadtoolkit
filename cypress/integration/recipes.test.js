describe('Recipes', () => {
  it('display a recipe grid', () => {
    cy.visit('/recipes');
    cy.get('#recipes').should('be.visible');
  });
  it('grid images are visible', () => {
    cy.visit('/recipes');
    cy.get('#recipes div').and('be.visible');
    // GitHub Actions won't be able to download from Netlify LFS
    // .each((image) => {
    //   expect(image[0].naturalWidth).to.be.greaterThan(0);
    // });
  });
  it('supports searching', () => {
    cy.visit('/recipes');
    cy.get('#recipes p[title]').then((title) => {
      const [first] = title;
      const { title: recipeTitle } = first;
      cy.get('#search-input').clear().type(recipeTitle);
      cy.get('#recipes p[title]').should('have.length', 1);
    });
  });
});
