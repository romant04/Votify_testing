describe("Votify register", () => {
  const usedEmail = "roman.tarnai.04@gmail.com";
  const email = chance.email();
  const password = "silneheslo1234";

  beforeEach(() => {
    cy.visit(Cypress.env("registerUrl"));
  });

  it("should render the register page", () => {
    // register form
    cy.get("form").should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('input[name="passwordConfirm"]').should("exist");
    cy.get('button[type="submit"]:visible').should("exist");

    // links
    cy.get('a[href="/cs?"]').should("exist");
  });
});
// successful-sign-up
