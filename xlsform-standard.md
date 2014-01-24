## XLSForm

XLSForm is a tool to simplify the creation of forms. Forms can be designed with Excel and XLSForm will convert it to an XForm that can be used with ODK tools. This tutorial teaches you to build your forms using Excel. Please refer to the [sample Excel file](https://docs.google.com/spreadsheet/ccc?key=0AjZ4hMHTat-YdDY4akxMVmlrQjNCRy1MNXFBbzdKSkE&usp=sharing) as you read through the tutorial.


### Basic format
Each workbook must have two worksheets: survey and choices.

* The survey worksheet contains the structure and most of the content of the form. It contains the full list of questions and information about how
  they should be presented. Most rows represent a question; the rest of the rows specify control structures such as groups.
* The choices worksheet is used to specify the options for multiple choice questions. Each row represents a multiple choice option. Choices with the
  same list name are considered part of a related set of choices. This allows a set of choices to be reused in multiple select questions (for example,
 yes/no choices).

Each of these worksheets has a set of necessary columns that must be present for the .xls file to be valid. Additionally, each worksheet has a set of optional columns that allow further control over the behavior of each entry in the form, but are not essential to the specification. Every entry must have values for each necessary column, but any of the optional columns may be left blank from entry to entry. For example, in the survey worksheet, each question must have a name specified, but one question may have a numerical constraint specified while another has an image file and a third may have niether. These columns, necessary or optional, may appear in any order. Optional columns may be left out completely. Any number of rows may be left blank. All .xls file formatting is ignored so that dividing lines, shading, and font formatting can be used to make the specification more readable.



