describe('Calculator', () => {
  it('supports basic ingredients change', () => {
    cy.visit('/calculator');
    cy.get('#flour').clear().type('{selectall}1000');

    cy.get('#water').clear().type('{selectall}690');

    cy.get('#salt').clear().type('{selectall}20');

    cy.get('#starter').clear().type('{selectall}200');

    cy.get('dl dd').should('contain', '1910 gram');
    cy.get('dl p').should('contain', '70.1%');
  });
  it('supports bakers math switch', () => {
    cy.visit('/calculator');

    cy.get('dl dd').should('contain', '955 gram');
    cy.get('dl p').should('contain', '70.1%');

    cy.get('.chakra-stack label #bakersMath').click({ force: true });

    cy.get('dl dd').should('contain', '955 gram');
    cy.get('dl p').should('contain', '81.7%');
  });
  it('supports imperial units switch', () => {
    cy.visit('/calculator');

    cy.get('dl dd').should('contain', '955 gram');
    cy.get('dl p').should('contain', '70.1%');

    cy.get('.chakra-stack label #imperialUnits').click({ force: true });

    cy.get('dl dd').should('contain', '35 ounce');
    cy.get('dl p').should('contain', '68.1%');
  });
  it('can add extra milk as ingredient', () => {
    cy.visit('/calculator');

    cy.get('label[aria-label="Enable wholemilk"]').click();
    cy.get('#wholemilk').clear().type(50);

    cy.get('dl dd').should('contain', '1005 gram');
    cy.get('dl p').should('contain', '78.0%');
  });
  it('can reset the settings', () => {
    cy.visit('/calculator');

    const flour = '500 gram';
    const water = '345 gram';
    const salt = '10 gram';
    const starter = '100 gram';

    cy.get('#flour').should('value', flour);
    cy.get('#water').should('value', water);
    cy.get('#salt').should('value', salt);
    cy.get('#starter').should('value', starter);

    cy.get('#flour ~ div div[role="button"]:first-child').click();
    cy.get('#water ~ div div[role="button"]:first-child').click();
    cy.get('#salt ~ div div[role="button"]:first-child').click();
    cy.get('#starter ~ div div[role="button"]:first-child').click();

    cy.get('button[aria-label="Reset settings"]').click();

    cy.get('#flour').should('value', flour);
    cy.get('#water').should('value', water);
    cy.get('#salt').should('value', salt);
    cy.get('#starter').should('value', starter);
  });
});
