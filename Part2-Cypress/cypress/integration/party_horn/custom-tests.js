describe("Party Horn Tests", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/Part2-Cypress/index.html");
  });

  it("First Test", () => {
    expect(true).to.equal(true);
  });

  it("Slider changes when volume input changes", () => {
    cy.get("#volume-number").clear().type("75");
    cy.get("#volume-slider").then(($el) => {
      expect($el).to.have.value(75);
    });
  });

  it("Volume input changes when slider changes", () => {
    cy.get("#volume-slider").invoke("val", "33").trigger("input");
    cy.get("#volume-slider").then(($el) => {
      expect($el).to.have.value(33);
    });
  });

  it("Audio element changes when slider changes", () => {
    cy.get("#volume-slider").invoke("val", "33").trigger("input");
    cy.get("#horn-sound").then(($el) => {
      expect($el).to.have.prop("volume", 0.33);
    });
  });

  it("Image and sound sources change when party horn button is selected", () => {
    cy.get("#radio-party-horn").click();
    cy.get("#horn-sound")
      .invoke("attr", "src")
      .should("equal", "./assets/media/audio/party-horn.mp3");
    cy.get("#sound-image")
      .invoke("attr", "src")
      .should("equal", "./assets/media/images/party-horn.svg");
  });

  it("Volume image changes when changing volume", () => {
    // Level 0 Volume
    cy.get("#volume-number").clear().type("0");
    cy.get("#volume-image")
      .invoke("attr", "src")
      .should("equal", "./assets/media/icons/volume-level-0.svg");

    // Level 1 Volume
    cy.get("#volume-number").clear().type("33");
    cy.get("#volume-image")
      .invoke("attr", "src")
      .should("equal", "./assets/media/icons/volume-level-1.svg");

    // Level 2 Volume
    cy.get("#volume-number").clear().type("66");
    cy.get("#volume-image")
      .invoke("attr", "src")
      .should("equal", "./assets/media/icons/volume-level-2.svg");

    // Level 3 Volume
    cy.get("#volume-number").clear().type("100");
    cy.get("#volume-image")
      .invoke("attr", "src")
      .should("equal", "./assets/media/icons/volume-level-3.svg");
  });

  it("Honk button is disabled when text box is empty or non-number", () => {
    cy.get("#volume-number").clear().type("a");
    cy.get("#honk-btn").then(($el) => {
      expect($el).to.have.prop("disabled", true);
    });
    cy.get("#volume-number").clear();
    cy.get("#honk-btn").then(($el) => {
      expect($el).to.have.prop("disabled", true);
    });
  });

  it("Error is shown when a number is typed outside the given range", () => {
    cy.get("#volume-number")
      .clear()
      .type("101")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get("#volume-number")
      .invoke("prop", "validationMessage")
      .should("equal", "Value must be less than or equal to 100.");
  });
});
