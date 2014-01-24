## XLSForm

XLSForm is a tool to simplify the creation of forms. Forms can be designed with Excel and XLSForm will convert it to an XForm that can be used with ODK tools. This tutorial teaches you to build your forms using Excel. Please refer to the sample Excel file as you read through the tutorial.

### Basic format
Each workbook must have two worksheets: survey and choices.

The survey worksheet contains the structure and most of the content of the form. It contains the full list of questions and information about how they should be presented. Most rows represent a question; the rest of the rows specify control structures such as groups.
The choices worksheet is used to specify the options for multiple choice questions. Each row represents a multiple choice option. Choices with the same list name are considered part of a related set of choices. This allows a set of choices to be reused in multiple select questions (for example, yes/no choices).
