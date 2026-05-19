Feature: Orange HRM Login
    Scenario: Login using displayed credentials

    Given user launches OrangeHRM application
    When user retrieves the displayed credentials
    And user enters retrieved credentials
    And user clicks on login button
    Then user should be logged in to the application