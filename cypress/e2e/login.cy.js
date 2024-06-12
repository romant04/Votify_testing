describe("Votify login", () => {
  const email = "roman.tarnai.04@gmail.com";
  const password = "silneheslo1234";

  beforeEach(() => {
    cy.visit(Cypress.env("loginUrl"));
  });

  it("should render the login page", () => {
    // login form
    cy.get("form").should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('button[type="submit"]:visible').should("exist");

    // links
    cy.get('a[href="/cs/sign-up?"]').should("exist");
    cy.get('a[href="/cs/forgot-password?"]').should("exist");
  });

  it("should not allow blank email", () => {
    cy.get("form").submit();
    cy.contains("Povinné").should("exist");
  });

  it("should not allow invalid email", () => {
    cy.get('input[name="email"]').type("invalid-email");
    cy.get("form").submit();
    cy.contains("Nevalidní e-mail").should("exist");
  });

  it("should not allow blank password", () => {
    // Fill email first
    cy.get('input[name="email"]').type(email);

    cy.get("form").submit();
    cy.contains("Povinné").should("exist");
  });

  it("should not allow invalid password", () => {
    // Fill email first
    cy.get('input[name="email"]').type(email);

    cy.get('input[name="password"]').type("heslo");
    cy.get("form").submit();
    cy.contains("Zadali jste neplatné uživatelské jméno nebo heslo").should(
      "exist"
    );
  });

  it("should login successfully", () => {
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get("form").submit();

    cy.url().should("include", "app.votify.app");
  });
});
