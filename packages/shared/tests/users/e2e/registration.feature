Feature: Registration
  As a user
  I want to register an account
  So that I can join the community discussions

  Scenario: Successful registration
    Given I am a new user
    When I register with valid account details
    Then I should be granted access to my account
    And I should receive an email with login instructions

  Scenario: Invalid account details
    Given I am a new user
    When I register with invalid account details
    Then I should see an error message
    And I should not be granted access to my account

  Scenario: Account already exists
    Given I am a new user
    And I have an existing account
    When I register with valid account details
    Then I should see an error message
    And I should not be granted access to my account
