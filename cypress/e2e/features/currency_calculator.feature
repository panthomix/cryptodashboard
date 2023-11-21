Feature: As a visitor I should be able to use the currency calculator

Scenario: BTC to USD/EUR
 Given I'm a visitor
 When I enter into the site
 And I select "BTC" as cryptocurrency in the calculator
 And I enter "200" in the input
 Then I should see the equivalent in "USD"
 And If I change the currency to "EUR"
 Then The calculator should update the equivalent in "EUR"

 Scenario: ETH to USD/EUR
 Given I'm a visitor
 When I enter into the site
 And I select "ETH" as cryptocurrency in the calculator
 And I enter "200" in the input
 Then I should see the equivalent in "USD"
 And If I change the currency to "EUR"
 Then The calculator should update the equivalent in "EUR"

Scenario: Auto-update accordingly with the last price
 Given I'm a visitor
 When I enter into the site
 And I select "BTC" as cryptocurrency in the calculator
 And I enter "200" in the input
 Then I should see the equivalent in "USD"
 Then The price of "BTC" is updated
 Then The calculator should update the equivalent in "USD"