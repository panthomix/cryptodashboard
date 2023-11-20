Feature: As a visitor I should be able to see a table in real time with the price of BTC and ETH

Scenario: Table with live prices of BTC
 Given I'm a visitor
 When I enter into the site
 Then I should see a "BTC" table with the following information
 | Time | USD | EUR |
 | <time> | <USD> | <EUR> |
 And The "BTC" table must be updated every 10 seconds

Scenario: Table with live prices of ETH
 Given I'm a visitor
 When I enter into the site
 Then I should see a "ETH" table with the following information
 | Time | USD | EUR | BTC |
 | <time> | <USD> | <EUR> | <BTC equivalent> |
 And The "ETH" table must be updated every 10 seconds