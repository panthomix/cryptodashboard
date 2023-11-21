import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { fetchCurrencyData } from "../utils";

Then(
  "I select {string} as cryptocurrency in the calculator",
  function (cryptocurrency: string) {
    cy.get('[data-testid="crypto-selector"]').select(cryptocurrency);
    cy.get('[data-testid="crypto-selector"]').blur();
    this.currentCrypto = cryptocurrency;
  }
);

Then("I enter {string} in the input", function (value: string) {
  cy.get('[data-testid="crypto-value"]').clear();
  cy.get('[data-testid="crypto-value"]').type(value);
  cy.get('[data-testid="crypto-value"]').blur();
  this.cryptoInput = parseFloat(value);
});

Then("If I change the currency to {string}", function (currency: string) {
  cy.get('[data-testid="currency-selector"]').select(currency);
  cy.get('[data-testid="currency-selector"]').blur();
  this.currentCurrency = currency;
});

Then("I should see the equivalent in {string}", function (currency: string) {
  cy.wrap(null).then(async () => {
    const data = await fetchCurrencyData();
    cy.get('[data-testid="currency-value"]').should(
      "have.value",
      data[this.currentCrypto][currency] * this.cryptoInput
    );
  });
});

Then(
  "The calculator should update the equivalent in {string}",
  function (currency: string) {
    cy.get('[data-testid="currency-value"').invoke("val").as("currency_value");
    cy.get('[data-testid="crypto-value"').invoke("val").as("crypto_value");
    cy.get(`[data-testid="${this.currentCrypto.toLowerCase()}-currency"`)
      .invoke("text")
      .as("btc_currency");

    cy.get("@currency_value").then((currency_value) => {
      cy.get("@crypto_value").then((crypto_value) => {
        cy.get("@btc_currency").then((btc_currency) => {
          expect(
            parseFloat(crypto_value as unknown as string).toFixed(2)
          ).to.eq(
            (
              (currency_value as unknown as number) /
              parseFloat(btc_currency as unknown as string)
            ).toFixed(2)
          );
        });
      });
    });
  }
);

Then("The price of {string} is updated", (cryptocurrency: string) => {
  cy.get(`[data-testid="${cryptocurrency.toLowerCase()}-currency"`)
    .invoke("text")
    .as("currency");
  cy.get("@currency").then((currency) => {
    cy.get(`[data-testid="${cryptocurrency.toLowerCase()}-currency"`).should(
      "not.have.value",
      currency
    );
  });
});
