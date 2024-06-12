import Chance from "chance";

const chance = new Chance();

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

  it("should not allow blank email", () => {
    cy.get('button[type="submit"]:visible').click();
    cy.get('button[type="submit"]:visible').click(0, 50, { force: true });
    cy.contains("Povinné").should("exist");
  });

  it("should not allow invalid email", () => {
    cy.get('input[name="email"]').type("invalid-email");
    cy.get('button[type="submit"]:visible').click();
    cy.contains("Nevalidní e-mail").should("exist");
  });

  it("should not allow blank password", () => {
    // Fill email first
    cy.get('input[name="email"]').type(email);

    cy.get('button[type="submit"]:visible').click();
    cy.get('button[type="submit"]:visible').click(0, 50, { force: true });
    cy.contains("Povinné").should("exist");
  });

  it("should not allow blank password confirmation", () => {
    // Fill email and password first
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);

    cy.get('button[type="submit"]:visible').click();
    cy.get('button[type="submit"]:visible').click(0, 50, { force: true });
    cy.contains("Povinné").should("exist");
  });

  it("should not allow weak password", () => {
    // Fill email first
    cy.get('input[name="email"]').type(email);

    cy.get('input[name="password"]').type("heslo");
    cy.get('button[type="submit"]:visible').click();
    cy.contains("Musí obsahovat alespoň 8 znaků").should("exist");
  });

  it("should not allow different password confirmation", () => {
    // Fill email and password first
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);

    cy.get('input[name="passwordConfirm"]').type("different-password");
    cy.get('button[type="submit"]:visible').click();
    cy.contains("Kontrola hesla se neshoduje").should("exist");
  });

  it("should not allow used email", () => {
    cy.get('input[name="email"]').type(usedEmail);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="passwordConfirm"]').type(password);
    cy.get('button[type="submit"]:visible').click();
    cy.contains("Tento e-mail již někdo používá").should("exist");
  });

  it("should register successfully", () => {
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="passwordConfirm"]').type(password);
    cy.get('button[type="submit"]:visible').click();

    cy.url().should("include", "successful-sign-up");
  });
});
