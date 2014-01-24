## XLSForm

XLSForm is a tool used to simplify the creation of webforms. With XLSForm, you can author webforms in Excel, and XLSForm will convert it to an XForm that can be used with a number of online mobile platforms. This intro-level tutorial teaches you how to author your forms using Excel. Please refer to this [sample Excel file](https://docs.google.com/spreadsheet/ccc?key=0AjZ4hMHTat-YdDY4akxMVmlrQjNCRy1MNXFBbzdKSkE&usp=sharing) as you read through the tutorial.


### Basic format
Each Excel workbook must have two worksheets: 'survey' and 'choices'. Later on, you'll learn about other worksheets that can add additional specifications to your webform, but the only mandatory worksheets are 'survey' and 'choices'. 

* The 'survey' worksheet gives your webform its overall structure and contains most of the content of the form. It contains the full list of questions and information about how they should appear in the form. Each row usually represents one question; however, there are certain other features you'll read about later that you can add to the form to improve the user experience.
* The 'choices' worksheet is used to specify the answer choices for multiple choice questions. Each row represents an answer choice. Answer choices with the same list name are considered part of a related set of choices and will appear together for a question. This also allows a set of choices to be reused for multiple questions (for example, yes/no questions).

Both of these worksheets have a set of mandatory columns that must be present for the form to work. Additionally, each worksheet has a set of optional columns that allow further control over the behavior of each entry in the form, but are not essential to have. Every entry must have values for each of the mandatory columns, but the optional columns may be left blank. 

* The 'survey' worksheet has 3 mandatory columns: 'type', 'name', and 'label'. 
  * The 'type' column specifies the type of entry you are adding.
  * The 'name' column specifies the unique variable name for that entry. No two entries can have the same name. 
  * The 'label' column contains the actual text you see in the webform.  
* The 'choices' worksheet has 3 mandatory columns as well: 'list name', 'name', and 'label'.
  * The 'list name' column lets you group together a set of related answer choices, i.e., answer choices that should appear together under a question.
  * The 'name' column specifies the unique variable name for that answer choice.
  * The 'label' column shows the answer choice exactly as you want it to appear on the webform.

The columns you add to your Excel workbook, whether they are mandatory or optional, may appear in any order. Optional columns may be left out completely. Any number of rows may be left blank. All .xls file formatting is ignored so that dividing lines, shading, and other font formatting can be used to make the form more readable.

One thing to keep in mind when authoring webforms in Excel is that the syntax you use must be precise. For example, if you write 'Choices' or 'choice' instead of 'choices', the form won't work. 


### Question types
XLSForm supports a number of simple question types. These are just some of the options you can enter in the 'type' column in the first worksheet:

| Question type | Answer input    | 
| ------------- | ------------- | 
| integer       | Integer (i.e., whole number) input. | 
| decimal       | Decimal input.      |
| text          | Free text response.
| select_one [options] | Multiple choice question; only one answer can be selected.      |
| select_multiple [options] | Multiple choice question; multiple answers can be selected.     |
| note          | Display a note on the screen, takes no input.      |
| geopoint      | Collect GPS coordinates.      | 
| image         | Take a picture.      | 
| barcode       | Scan a barcode, requires the barcode scanner app to be installed.      | 
| date          | Date input.     | 
| datetime      | Accepts a date and a time input.      | 
| audio         | Take an audio recording.      | 
| video         | Take a video recording.      | 
| calculate     | Perform a calculation; see the [Calculations] (*calculations) section below.      | 

To collect the name and gps coordinates of a store use the following Excel file:

| survey        |               |       |      |
| ------------- | ------------- | ----- | ---- |
|               | type          | name  |  label |
|               | text          | name  | What is the name of this store?|
|               | geopoint      | geopoint |  Collect the GPS coordinates of this store.|


To collect the name and gps coordinates of a store use the following Excel file:


### Multiple Choice Questions

ODK Collect has support for both ‘select one’ and ‘select all that apply’ questions. To write a multiple choice question requires adding a second worksheet called ‘choices’ to our Excel workbook. Here is an example of a ‘select one’ question:

| survey        |               |       |      |
| ------------- | ------------- | ----- | ---- |
|               | type          | name  |  label |
|               | select_one yes_no     | likes_pizza  | Do you like pizza?  |
|**choices**    |               |       |              |
|               |  list name    | name  |  label       |
|               |   yes_no      |  yes     |  Yes      |
|               |   yes_no      |  no      |  No       |


1. There are three columns on the ‘choices’ sheet: ‘list name’ contains the name of multiple choice list this choice belongs to. ‘name’ holds the value that will be submitted to the database if this choice is selected. ‘label’ is what will appear on the phone for this choice.
1. To add a select one question to your survey you must add a question with type ‘select_one list-name’ where ‘list-name’ must match a list from the ‘choices’ worksheet.

We can also add multiple choices questions that allow multiple answers to be selected, like so:

| survey        |               |       |      |
| ------------- | ------------- | ----- | ---- |
|               | type          | name  |  label |
|               | select_multiple pizza_toppings    | favorite_topping  | Favorite toppings  |
|**choices**    |                      |                |                 |
|               |  list name           | name           |  label          |
|               |   pizza_toppings     |  cheese        |  Cheese         |
|               |   pizza_toppings     |  pepperoni     |  Pepperoni      |
|               |   pizza_toppings     |  sausage       |  Sausage        |

Notes / Caveats:

* Make sure you don’t forget the first row and the headings “list name”, “name” and “label.”
* Make sure that your column headers in the “choices” sheet match those in the “survey” sheet (i.e. there
  will be errors if you columns are “label:English” on the survey and “label” on the choices worksheet)

### Specify Other
For multiple choice options, one might want to add an “Other” option, which if picked has to be specified further by the user in a free text input field. This is possible through xlsform by having an option list that includes “Other” as an option, and a second question that is relevant only if “Other” was selected the first time around. But because this has to be done a lot in the early phases of surveying, xlsform has a shortcut to make this easy.

| survey        |               |       |      |
| ------------- | ------------- | ----- | ---- |
|               | type          | name  |  label |
|               | select_multiple pizza_toppings or_other    | favorite_topping  | Favorite toppings  |
|**choices**    |                      |                |                 |
|               |  list name           | name           |  label          |
|               |   pizza_toppings     |  cheese        |  Cheese         |
|               |   pizza_toppings     |  pepperoni     |  Pepperoni      |
|               |   pizza_toppings     |  sausage       |  Sausage        |

This form with automatically ask the user if her/his favorite toppings are cheese, pepperoni, sausage or other, and if the user selects other, what their favorite topping is. Try it out! Notes / Caveats:

* If you have data like this, when you export data, in the pizza_toppings column, you will see a value ‘other’. A second column will have the answer for the questions which the user selected ‘other.’ This makes doing data analysis more cumbersome, so we don’t recommend the or_other construct for large-scale data collection efforts. The option is perfectly appropriate for pilots, however.

### Cascading Selects
In Collect 1.2 and above it is possible to create cascading selects (select type questions where the options depend on the options selected in previous questions). For example, you could display cities in a select question based on the country selected in a previous question. In order to use cascading selects you will need to create a choice_filter column in your survey sheet and add some attribute columns to filter on in your choices sheet. [There is an example XLSForm available here](https://docs.google.com/spreadsheet/ccc?key=0AjZ4hMHTat-YdFVpOWVBVWREUGdNVWZKbUl2akhfWkE&usp=sharing). There are a few caveats to bear in mind: or_other is currently not supported for cascading selects. Best practice for naming attribute column headers in the choices sheet is to begin your names with attr and only use letters (no spaces).

### Metadata
ODK Collect makes a number of metadata fields available for collection:

| start         | Start date and time of the survey. | 
| ------------- | ------------- | 
| end           | End date and time of the survey.      | 
| today         | Day of the survey.     | 
| deviceid      | IMEI (International Mobile Equipment Identity)     |
| subscriberid  | IMSI (International Mobile Subscriber Identity)     | 
| sim_serial    | SIM serial number.     | 
| phone_number  | Phone number (if available).      | 

If I wanted my survey to collect all of this metadata I would put the following at the top of the survey:

| survey        |               |       |      |
| ------------- | ------------- | ----- | ---- |
|               | type          | name  |  label |
|               | start         | start |        |
|               | end           | end   |        |
|               | today         | today   |        |
|               | deviceid      | deviceid   |         |
|               | subscriberid  | subscriberid   |         |
|               | sim_serial    | simserial   |         |
|               | phone_number  | phonenumber   |         |

Notice there are no labels associated with the metadata, that’s because the phone captures these variables automatically. These questions will not appear on the screen of the phone, but will be included in the xml file ODK Collect writes to store and transmit the survey data. To see this fields in action, fill out a survey on your phone, connect your phone to your computer and use the sd card as a USB flash drive, navigate to /sdcard/odk/instances and checkout the xml files in the folders there. This will give you an idea of what the data looks like.

### Hints
It’s easy to add hints to questions.  Simply type in text under the hint column for a question.

| survey        |               |       |      |      |
| ------------- | ------------- | ----- | ---- | ---- |
|               | type          | name  |  label | hint |
|               | text          | name  | What is the name of this store?| Look on the signboard if the store has a signboard.
|               | geopoint      | geopoint |  Collect the GPS coordinates of this store.|

### Grouping Questions
To create a group of questions try the following:


| survey        |               |       |      |
| ------------- | ------------- | ----- | ---- |
|               | type          | name  |  label |
|               | begin group         | respondent |  Respondent |
|               | text          | name  | Enter the respondent’s name |
|               | text     | position |  Enter the respondent’s position within the school.|
|               | end group    |     |       |

This is a good way to group related questions. To create a repeating group of questions use the following construct:

| survey        |               |       |      |
| ------------- | ------------- | ----- | ---- |
|               | type          | name  |  label |
|               | begin repeat         | member |  Household Member |
|               | text          | name  | Name of household member. |
|               | integer     | age |  Age of household member. |
|               | end repeat    |     |       |

This is a list of household members, with the name and age of each household member. The phone will ask the name and age of the first household member, and then ask if the enumerator wants to add another ‘Household Member’ group. If the enumerator responds with a ‘yes’ then the name and age of the second household member will be asked, and so on. All data within repeats will be exported in a different worksheet inside excel files.


### Nesting Groups of Questions
Groups of questions can be nested:

| survey        |               |       |      |
| ------------- | ------------- | ----- | ---- |
|               | type          | name  |  label |
|               | begin group         | hospital |  Hospital |
|               | text          | name  | What is the name of this hospital? |
|               | begin group         | hiv_medication |  HIV Medication |
|               | select_one yes_no     | have_hiv_medication |  Does this hospital have HIV medication? |
|               | end group    |     |       |
|               | end group    |     |       |

### Grouping Questions on a Single Screen
By setting a group's appearance column to field-list you can display multiple questions on a single screen of your survey.

| survey        |               |       |      |        |
| ------------- | ------------- | ----- | ---- | ------- |
|               | type          | name       |  label      | appearance    |
|               | begin group   | respondent |  Respondent | field-list |
|               | text          | name       | Enter the respondent’s name |
|               | text          | position   |  Enter the respondent’s position within the school.|
|               | end group     |            | 


### Skipping Questions
One great feature of ODK Collect is the ability to skip a question based on the response to a previous question. Below is an example of how to do this using XLSform:


| survey        |               |       |      |       |
| ------------- | ------------- | ----- | ---- |   ---- |
|               | type                  | name         |  label              |  relevant |
|               | select_one yes_no     | likes_pizza  | Do you like pizza?  |           |
|               | select_multiple pizza_toppings or_other| favorite_topping  | Favorite toppings|selected(${likes_pizza}, ‘yes’)|

(choices worksheet omitted; see above). This will ask the respondent, “Do you like pizza?” and ask which topping the respondent likes if he/she like pizza (and skips the question otherwise). The entry in the ‘relevant’ column is a true or false XPath expression. When the expression evaluates to true the question will be asked, otherwise it will be skipped. XLSforms have some convenient syntax so you don’t have to put the XPath in for the question likes_pizza, instead you can put ${likes_pizza} and the XLSform converter will replace ${likes_pizza} with the absolute XPath to the question named likes_pizza. Here are a couple additional examples of relevance formulas: *${number_x}=${number_y} selected(${select_question}, 'option')* For more on proper XPath expressions, see this page: [https://bitbucket.org/javarosa/javarosa/wiki/buildxforms](https://bitbucket.org/javarosa/javarosa/wiki/buildxforms)

If you want to skip a group of questions put the relevant attribute on a group like follows:

|               |       |      |     |
| ------------- | ----- | ---- |---- |
| type               | name          |  label    |   relevant    |
| integer            | age       | How old are you? |
| begin group        | child     | Child |  ${age} <= 5    |
| integer            | muac      | Record this child’s mid-upper arm circumference. |  | 
|  select_one yes_no | mrdt      | Is the child’s rapid diagnostic test positive?  |  | 
|  end group |      |   |  | 

### Constraining Responses

<h3 id="calculations">Calculations</h3>














