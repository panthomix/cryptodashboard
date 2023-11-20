import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { fetchCurrencyData } from "../utils";

Then(
  "I should see the graph with the last prices of the BTC and ETH currencies",
  () => {
    cy.wrap(null).then(async () => {
      const { BTC, ETH } = await fetchCurrencyData();
      cy.get('[data-testid="btc-currency"]').should("have.text", BTC.USD);
      cy.get('[data-testid="eth-currency"]').should("have.text", ETH.USD);
    });
  }
);

Then("the graph should be automatically updated in real time", () => {
  cy.wrap(null).then(async () => {
    const { BTC: firstBTC, ETH: firstETH } = await fetchCurrencyData();
    cy.wait(10000);
    cy.get('[data-testid="btc-currency"]').should(
      "not.have.text",
      firstBTC.USD
    );
    cy.get('[data-testid="btc-currency"]').should("not.be.empty");
    cy.get('[data-testid="btc-currency"]').should(
      "not.have.text",
      firstETH.USD
    );
    cy.get('[data-testid="btc-currency"]').should("not.be.empty");
  });
});
