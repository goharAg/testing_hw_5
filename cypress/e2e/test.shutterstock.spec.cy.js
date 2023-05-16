describe('Shutterstock Search functionality Test', () => {

  beforeEach(() => {
    cy.visit('https://www.shutterstock.com/');
  });


  it('should successfully load search results', () => {

    cy.get('input[type="search"]').type('flower').type('{enter}')

    cy.url().should('include', 'flower');

    cy.get('div[data-automation="AssetGrids_MosaicAssetGrid_div"]').should('be.visible').within(() => {

      cy.get('div[role="img"]').each((result) => {
        cy.wrap(result).should('exist');
      })

    })
  })

  it('should open the image in a preview  when the image button is clicked', () => {
    cy.get('input[type="search"]').type('flower').type('{enter}');

    cy.get('div[data-automation="AssetGrids_MosaicAssetGrid_div"]')
        .find('div[role="img"]')
        .first()
        .click()


    cy.get('button[data-automation="AssetDownloadCta_DownloadButton"]').should('be.visible');

  });


  it('should display no search results for dummy text', () => {
    const searchTerm = '2834yr8934d8939r042';

    cy.get('input[type="search"]').type(searchTerm).type('{enter}');

    cy.url().should('include', searchTerm);

    cy.get('h4[data-automation="NoSearchResultsWithImages_Header"]').should('be.visible');
    cy.contains('Sorry, we couldn\'t find any matches for').should('be.visible');
  });
})