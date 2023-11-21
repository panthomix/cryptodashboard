import { APP_URL } from "@/app/store/services/constants";
import { Given, When } from "@badeball/cypress-cucumber-preprocessor";

beforeEach(function () {
  const world = {
    currentCrypto: "",
    currentCurrency: "",
    btcCurrency: 0,
    ethCurrency: 0,
    currencyInput: 0,
    cryptoInput: 0,

    saveCurrencies() {
      cy.get(`[data-testid="btc-currency"`).invoke("text").as("btcCurrency");
      cy.get("@btcCurrency").then((btcCurrency) => {
        this.btcCurrency = parseFloat(`${btcCurrency}`);
      });
      cy.get(`[data-testid="eth-currency"`).invoke("text").as("ethCurrency");
      cy.get("@ethCurrency").then((ethCurrency) => {
        this.ethCurrency = parseFloat(`${ethCurrency}`);
      });
    },
  };

  Object.assign(this, world);
});

Given("I'm a visitor", () => {});

When("I enter into the site", () => {
  cy.visit(APP_URL);
  return cy
    .get('[data-testid="loading-div"]', { timeout: 30000 })
    .should("not.exist");
});
