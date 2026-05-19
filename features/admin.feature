Feature: User Management

Background: 
Given user is logged into OrangeHRM application
@test1
Scenario Outline: Add new user and verify user is added in the list
  When user navigates to Admin tab
  And user clicks on Add button
  And user fills in the user details with role "Admin", employee name "Kumar", status "Enabled", username "testuser", password "Admin@123" and confirm password "Admin@123"
  And user clicks on Save button
  Then user should be added successfully in the list