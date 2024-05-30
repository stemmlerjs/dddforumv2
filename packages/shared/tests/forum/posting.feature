Feature: Posting
  As a member
  I want to make a post in the community forum
  So that I can start discussions and learn from others

  Scenario: Submitting a text post
    Given I am a new user
    When I register with valid account details
    Then I should be granted access to my account
    And I should receive an email with login instructions

  Scenario: Submitting a URL post
    Given I am a new user
    When I register with valid account details
    Then I should be granted access to my account
    And I should receive an email with login instructions