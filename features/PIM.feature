Feature: Employee Management

  Background:
    Given user is logged into OrangeHRM application

  Scenario: Add and update employee details
    When user navigates to PIM tab
    And user adds a new employee
    And user updates employee personal details
    Then employee details should be updated successfully