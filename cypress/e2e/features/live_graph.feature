Feature: As a visitor I should be able to see a graph with the last prices of
the BTC and ETH currencies

Scenario: Live graph
 Given I'm a visitor
 When I enter into the site
 Then I should see the graph with the last prices of the BTC and ETH currencies
 And the graph should be automatically updated in real time