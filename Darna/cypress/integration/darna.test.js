
describe("test e2e",()=>{
    /*  it("first test ",()=>{
        expect(true).to.equal(true)
    }) */
   /*  it("successfully loads",()=>{
       cy.visit("/")
    }) */
   it('Test Inscription', () => {
   cy.visit('/');
   cy.wait(1000);
   cy.get('.posting_job > ul > :nth-child(3) > a').click()
   cy.url().should("include", "/register")
   /* cy.wait(2000);
   cy.visit('/register'); */
   cy.wait(2000);
   cy.get(':nth-child(2) > .form-row > :nth-child(1) > .form-control').clear().type("iselm khemiri");
   cy.wait(2000)
   cy.get(':nth-child(2) > .form-row > :nth-child(2) > .form-control').clear().type("1995-12-23");
   cy.wait(2000)
   cy.get(':nth-child(3) > .form-control').clear().type("Islemkh@gmail.com");
   cy.wait(2000)
   cy.get(':nth-child(4) > .form-row > :nth-child(1) > .form-control').clear().type("22584741");
   cy.wait(2000)
   cy.get(':nth-child(4) > .form-row > :nth-child(2) > .form-control').clear().type("étudiante");
   cy.wait(2000)
   cy.get(':nth-child(5) > .form-row > :nth-child(1) > .form-control').clear().type("islem1234");
   cy.wait(2000)
   cy.get(':nth-child(5) > .form-row > :nth-child(2) > .form-control').clear().type("islem1234");
   cy.wait(2000)
   cy.get('.form-btn').click()
   cy.wait(2000)
   cy.get('.swal2-confirm').click()
   cy.wait(2000)
   cy.get(':nth-child(2) > .form-row > :nth-child(1) > .form-control').clear().type("iselm khemiri");
   cy.wait(2000)
   cy.get(':nth-child(2) > .form-row > :nth-child(2) > .form-control').clear().type("1995-12-23");
   cy.wait(2000)
   cy.get(':nth-child(3) > .form-control').clear().type("Islemkh123@gmail.com");
   cy.wait(2000)
   cy.get(':nth-child(4) > .form-row > :nth-child(1) > .form-control').clear().type("22584741");
   cy.wait(2000)
   cy.get(':nth-child(4) > .form-row > :nth-child(2) > .form-control').clear().type("étudiante");
   cy.wait(2000)
   cy.get(':nth-child(5) > .form-row > :nth-child(1) > .form-control').clear().type("islem1234");
   cy.wait(2000)
   cy.get(':nth-child(5) > .form-row > :nth-child(2) > .form-control').clear().type("islem1234");
   cy.wait(2000)
   cy.get('.form-btn').click()
   cy.wait(2000)
   cy.get('.swal2-confirm').click()
   cy.url().should("include", "/login")
   //
   cy.get('#signin-email').clear().type("Islemkh123@gmail.com");
   cy.wait(2000)
   cy.get('#signup-password').clear().type("islem1234");
   cy.wait(2000)
   cy.get('.form-btn').click()
   cy.wait(2000)
   cy.get('.swal2-confirm').click()
   cy.wait(2000)
   });
   it('Test User banni', () => {
     cy.get('#signin-email').clear().type("marwar.chrigui@gmail.com");
     cy.wait(2000)
     cy.get('#signup-password').clear().type("marwa2020");
     cy.wait(2000)
     cy.get('.form-btn').click()
     cy.wait(2000)
     cy.get('.swal2-confirm').click()
   });
   });






