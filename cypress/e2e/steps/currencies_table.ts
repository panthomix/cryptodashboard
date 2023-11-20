import { Then } from "@badeball/cypress-cucumber-preprocessor";

Then(
  "I should see a {string} table with the following information",
  (id, table) => {
    table.hashes().forEach((element) => {
      Object.keys(element).forEach((title) => {
        cy.get(`[data-testid="${id}-table"]`).should("contain", title);
      });
    });
    cy.get(`[data-testid="${id}-table"]`)
      .find("tr")
      .then((row) => {
        assert.equal(row.length, 1);
      });
  }
);

Then("The {string} table must be updated every 10 seconds", (id, table) => {
  cy.get(`[data-testid="${id}-table"]`)
    .find("tr")
    .then((row) => {
      assert.equal(row.length, 1);
    });
  cy.wait(10000);
  cy.get(`[data-testid="${id}-table"]`)
    .find("tr")
    .then((row) => {
      assert.equal(row.length, 2);
    });
});
