describe('Recipes', () => {
  it('display a recipe grid', () => {
    cy.visit('/recipes');
    cy.get('#recipes').should('be.visible');
  });
  it('grid images are visible', () => {
    cy.visit('/recipes');
    cy.get('#recipes img').should('be.visible');
    // GitHub Actions won't be able to download from Netlify LFS
    // .each((image) => {
    //   expect(image[0].naturalWidth).to.be.greaterThan(0);
    // });
  });
});
