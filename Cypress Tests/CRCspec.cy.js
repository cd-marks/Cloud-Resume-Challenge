describe('Cloud Resume Challenge Testing', () => {
  
  it('Simulate POST request to CRC API', () => {
    
    // Verify correct input produces expected output
    cy.request({
        method: 'POST', 
        url: 'https://xo89eva9p1.execute-api.us-east-1.amazonaws.com/prod/visitorcounter',
        failOnStatusCode: false
    })
      .then(response => {
        expect(response.status).to.eq(200)
        
        // Calculate the difference between the updated count and starting count
        // If the difference equals 1, the counter incremented successfullly
        const values = response.body
        let incCheck = parseInt(values[1]) - parseInt(values[0])
        expect(incCheck).to.eq(1)
    })
  });

  it('Verify non-POST method returns expected error', () => {
    
    // Verify using an incorrect HTTP method returns a 403 error
    cy.request({ 
      url: 'https://xo89eva9p1.execute-api.us-east-1.amazonaws.com/prod/visitorcounter',
      failOnStatusCode: false
      })
      .then(response => {
        expect(response.status).to.eq(403)
      })
  });


  // Tests for working links 
  it('Check for broken links on resume website', () => {
    cy.visit('https://resumebycm.com');

    // Get all non-email links
    cy.get('a:not([href*="mailto:"])').each(link => { 
      
      // If a URL goes to LinkedIn, also accept a 999 response
      if(link.prop('href').includes('linkedin.com')) {
        cy.request({
          url: link.prop('href'),
          failOnStatusCode: false
        })
        .then(response => {
          expect(response.status).to.be.oneOf([200, 999])
        })
      } 
      
      // For all others links, expect a 200 response
      else if (link.prop('href')) {
        cy.request( {
          url: link.prop('href'),
          failOnStatusCode: false
        })
        .then(response => {
          expect(response.status).to.eq(200)
        })
      }
    })
  })

})