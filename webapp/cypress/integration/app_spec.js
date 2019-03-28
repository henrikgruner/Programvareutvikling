// This is necessary for mocking the server to work since we use fetch and not XHR for the requests!
// https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/stubbing-spying__window-fetch#readme
Cypress.on("window:before:load", win => {
  delete win.fetch;
});

describe.skip("Public Routes Not Crashing", () => {
  it("Enter frontpage", () => {
    cy.server();
    cy.fixture("auctions").as("auctionsJson");
    cy.route({
      method: "GET",
      url: "**/auctions/",
      response: "@auctionsJson"
    });
    cy.visit("");
    cy.url().should("include", "/");
    cy.get("input[type=text]").should(
      "have.attr",
      "placeholder",
      "Søk etter auksjoner .."
    );
  });
  it("Enter login page", () => {
    cy.visit("login");
    cy.url().should("include", "/login");
    cy.contains("Logg inn");
  });
  it("Enter signup page", () => {
    cy.visit("signup");
    cy.url().should("include", "/signup");
    cy.contains("Lag en ny bruker");
  });
  it("Enter an auction detail page", () => {
    cy.server();
    cy.fixture("open_auction").as("auctionJson");
    cy.route({
      method: "GET",
      url: "**/auctions/1/",
      response: "@auctionJson"
    });
    cy.visit("/auctions/1");
    cy.url().should("include", "/auctions/1");
    cy.contains("Veldig stort badeslott");
  });
  it("Enter 404 page", () => {
    cy.visit("bad-route");
    cy.contains("404 - Page not found");
  });
});

describe.skip("Private Routes Not Crashing ", () => {
  // Must be logged in for ths to work
  it("Enter frontpage", () => {
    cy.visit("profile");
    cy.url().should("include", "/profile");
    cy.contains("Welcome to the profile page");
  });
  it("Enter login page", () => {
    cy.visit("profile/auctions");
    cy.url().should("include", "/profile/auctions");
    cy.contains("Dine auksjoner");
  });
  it("Enter signup page", () => {
    cy.visit("profile/delete-me");
    cy.url().should("include", "/profile/delete-me");
    cy.contains("Ønsker du virkelig å slette brukeren din");
    cy.get("button").contains("Slett bruker");
  });
});

describe.skip("Redirect When Not Logged In", () => {
  it("Redirect from profile page to login", () => {
    cy.visit("profile");
    cy.url().should("include", "/login");
  });
  it("Redirect from delete user page to login", () => {
    cy.visit("profile/delete-me");
    cy.url().should("include", "/login");
  });
  it("Redirect from my auctions page to login", () => {
    cy.visit("profile/auctions");
    cy.url().should("include", "/login");
  });
  it("Redirect from report page to login", () => {
    cy.visit("report");
    cy.url().should("include", "/login");
  });
});

describe.skip("Front page", () => {
  beforeEach(function() {
    // runs once before all tests in the block
    cy.server();
    cy.fixture("auctions").as("auctionsJson");
    cy.route({
      method: "GET",
      url: "**/auctions/",
      response: "@auctionsJson"
    }).as("getAuctions");
  });

  it("As a user I can see a list of active auctions", () => {
    cy.visit("/");
    cy.contains("Veldig stort badeslott");
    cy.contains("DAB-adapter til hjemmet – Oppladbar/Bluetooth/AUX");
    cy.contains("Sminkekoffert med all makeup du trenger!");
  });
  it("As a user I can click on an auction to get to the detail page", () => {
    cy.fixture("open_auction").as("auctionJson");
    cy.route({
      method: "GET",
      url: "**/auctions/1/",
      response: "@auctionJson"
    });
    cy.visit("/");
    cy.get('[href="/auctions/1"]').click();
    cy.url().should("include", "/auctions/1");
  });
  it("No auctions - I want to see a placeholder", () => {
    cy.route({
      method: "GET",
      url: "**/auctions/",
      response: []
    });
    cy.visit("/");
    cy.contains("Det er ingen aktive auksjoner akkurat nå");
  });
  it("As a user I can search for an auction", () => {
    cy.route({
      method: "GET",
      url: "**/auctions/",
      response: "@auctionsJson"
    });
    cy.visit("/");
    cy.get("input[type=text]").type("s");
    cy.contains("Sminkekoffert med all makeup du trenger!");
    cy.contains("Veldig stort badeslott");
    cy.get("h1").each($h1 => {
      console.log($h1.text());
      const text = $h1.text();
      expect(text).not.to.include(
        "DAB-adapter til hjemmet – Oppladbar/Bluetooth/AUX"
      );
    });

    cy.get("input[type=text]")
      .clear()
      .type("sminkek");
    cy.contains("Sminkekoffert med all makeup du trenger!");
    cy.get("h1").each($h1 => {
      console.log($h1.text());
      const text = $h1.text();
      expect(text).not.to.include(
        "DAB-adapter til hjemmet – Oppladbar/Bluetooth/AUX"
      );
      expect(text).not.to.include("Veldig stort badeslott");
    });

    cy.get("input[type=text]")
      .clear()
      .type("ikke en auksjon");
    cy.contains("Ingen resultater for dette søket");
  });
});

describe("Auction page", () => {
  it("Not logged in - As a user I can see details of an auction", () => {
    cy.server();
    cy.fixture("open_auction").as("auctionJson");
    cy.route({
      method: "GET",
      url: "**/auctions/1/",
      response: "@auctionJson"
    });
    cy.visit("/auctions/1");
    cy.url().should("include", "/auctions/1");
    cy.contains("Veldig stort badeslott");
    cy.contains("3050 kr");
    cy.contains("Norvagvegen 72, 1977 Hunnyvag");
    cy.contains("Du må logge inn for å by");
  });
});

describe("Authentication", () => {
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
    cy.contains("Vanlige Tove");
  });
});
