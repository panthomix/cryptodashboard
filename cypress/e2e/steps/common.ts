import { APP_URL } from "@/app/store/services/constants";
import { Given, When } from "@badeball/cypress-cucumber-preprocessor";

Given("I'm a visitor", () => {});

When("I enter into the site", () => {
  cy.visit(APP_URL);
  cy.get('[data-testid="btc-currency"]').should("not.be.empty");
});
