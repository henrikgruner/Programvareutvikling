// These have to be mocked (but would be best if they weren't)
// or ci has to be updated to run the backend server as well
describe.skip("Login page & Logout", () => {
  beforeEach(() => {
    cy.fixture("normal_user").as("normalUser");
  });

  it("Should be able to login: normal user", function() {
    // mock this
    cy.visit("/login");
    cy.get('input[name="username"]')
      .type(this.normalUser.username)
      .should("have.value", this.normalUser.username);
    cy.get('input[name="password"]')
      .type(this.normalUser.password)
      .should("have.value", this.normalUser.password);
    cy.get("form").submit();
    cy.location("pathname").should("eq", "/");
    cy.getCookie("token").should("exist");
    cy.contains("Vanlige Tove");
  });

  it("Show error message when invalid credentials", function() {
    // mock this
    cy.visit("/login");
    cy.get('input[name="username"]')
      .type("invalid_username")
      .should("have.value", "invalid_username");
    cy.get('input[name="password"]')
      .type("password123")
      .should("have.value", "password123");
    cy.get("form").submit();
    cy.url().should("include", "/login");
    cy.getCookie("token").should("be.null");
    cy.contains("Logg inn");
    cy.contains("Brukernavn eller passord er feil");
  });

  it("Test logging out - should remove token", function() {
    // mock being logged in
    cy.visit("/login");
    cy.get('input[name="username"]')
      .type(this.normalUser.username)
      .should("have.value", this.normalUser.username);
    cy.get('input[name="password"]')
      .type(this.normalUser.password)
      .should("have.value", this.normalUser.password);
    cy.get("form").submit();
    cy.location("pathname").should("eq", "/");
    cy.contains("Logg ut").click();
    cy.getCookie("token").should("be.null");
    cy.contains("Logg inn");
  });
});

describe.skip("Signup page", () => {
  beforeEach(() => {
    cy.fixture("normal_user").as("normalUser");
  });

  it("Should be able to sign up with valid input", function() {
    // mock this ?
    cy.visit("/signup");
    cy.get('input[name="username"]')
      .type("kari_nordmann")
      .should("have.value", "kari_nordmann");
    cy.get('input[name="password"]')
      .type("password123")
      .should("have.value", "password123");
    cy.get("form").submit();
    cy.location("pathname").should("include", "/");
    cy.getCookie("token").should("exist");
    cy.contains("Vanlige Tove");
  });

  it("Should not be able to signup with invalid input", function() {
    // mock this
    cy.visit("/signup");
    cy.get('input[name="passwordConfirm"]')
      .type("password123")
      .should("have.value", "password123");
    cy.get("form").submit();

    cy.contains("Skriv inn ditt fornavn");
    cy.contains("Skriv inn ditt etternavn");
    cy.contains("Skriv inn et brukernavn");
    cy.contains("Skriv inn en e-post");
    cy.contains("Passordet må være minst 8 bokstaver");
    cy.contains("Passordene må være like");
    cy.contains("Skriv inn ett telefonnummer");
    // cy.contains("Skriv inn addressen din"); // Uncomment når teksten er fikset
    cy.contains("Du må godta retningslinjene for å kunne bruke denne siden");

    cy.url().should("include", "/signup");
    cy.getCookie("token").should("be.null");
  });
});
