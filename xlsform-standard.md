## What is XLSForm?

XLSForm is a tool used to simplify the creation of web forms. With XLSForm, you can author webforms in Excel, and XLSForm will convert it to an XForm that can be used with a number of online mobile platforms. This intro-level tutorial teaches you how to author your forms using Excel.

### Basic format
Each Excel workbook usually has two worksheets: **survey** and **choices**. Later on, you'll learn about other worksheets that can add additional specifications to your webform, but the survey and choices worksheets are usually mandatory.

##### The survey worksheet
This worksheet gives your webform its overall structure and contains most of the content of the form. It contains the full list of questions and information about how they should appear in the form. Each row usually represents one question; however, there are certain other features you'll read about later that you can add to the form to improve the user experience.

##### The choices worksheet
This worksheet is used to specify the answer choices for multiple choice questions. Each row represents an answer choice. Answer choices with the same list name are considered part of a related set of choices and will appear together for a question. This also allows a set of choices to be reused for multiple questions (for example, yes/no questions).

![](https://farm4.staticflickr.com/3767/13734054823_d2b3beb03d.jpg)

Both of these worksheets have a set of mandatory columns that must be present for the form to work. Additionally, each worksheet has a set of optional columns that allow further control over the behavior of each entry in the form, but are not essential to have. Every entry must have values for each of the mandatory columns, but the optional columns may be left blank.

* The **survey** worksheet has 3 mandatory columns: **type**, **name**, and **label**.
  * The **type** column specifies the type of entry you are adding.
  * The **name** column specifies the unique variable name for that entry. No two entries can have the same name.
  * The **label** column contains the actual text you see in the webform.  

![](https://farm4.staticflickr.com/3750/13912042263_eab8f6c1b2.jpg)

* The **choices** worksheet has 3 mandatory columns as well: **list name**, **name**, and **label**.
  * The **list name** column lets you group together a set of related answer choices, i.e., answer choices that should appear together under a question.
  * The **name** column specifies the unique variable name for that answer choice.
  * The **label** column shows the answer choice exactly as you want it to appear on the webform.

![](https://farm8.staticflickr.com/7446/13734959034_45125ea1d3.jpg)

The columns you add to your Excel workbook, whether they are mandatory or optional, may appear in any order. Optional columns may be left out completely. Any number of rows may be left blank. All .xls file formatting is ignored so that dividing lines, shading, and other font formatting can be used to make the form more readable.

One thing to keep in mind when authoring webforms in Excel is that the syntax you use must be precise. For example, if you write **Choices** or **choice** instead of **choices**, the form won't work.


### Question types
XLSForm supports a number of simple question types. These are just some of the options you can enter in the **type** column in the first worksheet:

| Question type | Answer input    |
| ------------- | ------------- |
| integer       | Integer (i.e., whole number) input. |
| decimal       | Decimal input.      |
| text          | Free text response.
| select_one [options] | Multiple choice question; only one answer can be selected.      |
| select_multiple [options] | Multiple choice question; multiple answers can be selected.     |
| note          | Display a note on the screen, takes no input.      |
| geopoint      | Collect GPS coordinates.      |
| date          | Date input.     |
| dateTime      | Accepts a date and a time input.      |
| time          | Time input.     |
| image         | Take a picture.      |
| audio         | Take an audio recording.      |
| video         | Take a video recording.      |
| barcode       | Scan a barcode, requires the barcode scanner app to be installed.      |
| calculate     | Perform a calculation; see the 'Calculations' section below.      |

For example, to collect the name and GPS coordinates of a store, you would write the following:

| survey        |               |       |      |
| ------------- | ------------- | ----- | ---- |
|               | type          | name  |  label |
|               | text          | store_name  | What is the name of this store?|
|               | geopoint      | store_gps |  Collect the GPS coordinates of this store.|

Check out the [Tutorial XLSForm](https://ona.io/xlsforms/forms/tutorial_xlsform) for a look at each question type in action!

##### Multiple choice questions

XLSForm supports both **select_one** (select only one answer) and **select_multiple** (select multiple answers) questions. Writing a multiple choice question requires adding a **choices** worksheet to your Excel workbook. Here is an example of a **select_one** question:

| survey        |               |       |      |
| ------------- | ------------- | ----- | ---- |
|               | type          | name  |  label |
|               | select_one yes_no     | likes_pizza  | Do you like pizza?  |
|**choices**    |               |       |              |
|               |  list name    | name  |  label       |
|               |   yes_no      |  yes     |  Yes      |
|               |   yes_no      |  no      |  No       |


Note that the **yes_no** in the **survey** worksheet must match the **yes_no** in the **list name** column in the **choices** worksheet. This ensures that the form displays the correct list of answer choices for a particular question.  

We can also add multiple choice questions that allow multiple answers to be selected, like so:

| survey        |               |       |      |
| ------------- | ------------- | ----- | ---- |
|               | type          | name  |  label |
|               | select_multiple pizza_toppings    | favorite_toppings  | What are your favorite pizza toppings?  |
|**choices**    |                      |                |                 |
|               |  list name           | name           |  label          |
|               |   pizza_toppings     |  cheese        |  Cheese         |
|               |   pizza_toppings     |  pepperoni     |  Pepperoni      |
|               |   pizza_toppings     |  sausage       |  Sausage        |


##### Specify other
For multiple choice questions, surveys often include an option of marking **other** when their answer choice is not listed. Then they are usually asked to specify the other option. This is possible through XLSForm by including **or_other** after the answer choice list name in the survey worksheet. The choices worksheet stays the same. See below.

| survey        |               |       |      |
| ------------- | ------------- | ----- | ---- |
|               | type          | name  |  label |
|               | select_multiple pizza_toppings or_other | favorite_topping  | What are your favorite pizza toppings?  |
|**choices**    |                      |                |                 |
|               |  list name           | name           |  label          |
|               |   pizza_toppings     |  cheese        |  Cheese         |
|               |   pizza_toppings     |  pepperoni     |  Pepperoni      |
|               |   pizza_toppings     |  sausage       |  Sausage        |

Click on the link to look at the complete [pizza_questionnaire](https://ona.io/xlsforms/forms/pizza_questionnaire).

**Caveat**  
When you export data using this **or_other** option, in the **pizza_toppings** column, you will see a value **other**. A separate column will have the answer for the questions in which the user selected **other**. This makes data analysis more cumbersome, so we do not recommend the **or_other** construct for large scale data collection efforts. See the **Skip Logic** section below for an alternative method more appropriate for large scale projects.

##### Metadata
XLSForm has a number of data type options available for meta data collection:

| Metadata type | Meaning       |
| ------------- | ------------- |
| start         | Start date and time of the survey. |
| end           | End date and time of the survey.  |
| today         | Day of the survey.     |
| deviceid      | IMEI (International Mobile Equipment Identity)     |
| subscriberid  | IMSI (International Mobile Subscriber Identity)     |
| sim_serial    | SIM serial number.     |
| phone_number  | Phone number (if available).      |

If I wanted my survey to collect all of this metadata, I would put the following at the beginning of the survey:

| survey        |               |       |      |
| ------------- | ------------- | ----- | ---- |
|               | type          | name  |  label |
|               | start         | start |        |
|               | end           | end   |        |
|               | today         | today   |        |
|               | deviceid      | deviceid   |         |
|               | subscriberid  | subscriberid   |         |
|               | imei          | imei   |         |
|               | phonenumber   | phonenumber   |   |        |

Notice that there are no labels associated with the metadata question types.  This is because the phone captures these variables automatically. These questions will not appear on the screen of the phone, but you will see them when viewing your submitted survey data.
The [Tutorial XLSForm](https://ona.io/xlsforms/forms/tutorial_xlsform) XLSForm shows how metadata is used in a form.

### Hints
Sometimes you want to add a small hint to a question on your survey, instructing the user how to answer the question, but you don't want the hint to be part of the question itself. It’s easy to add hints to questions in XLSForms.  Simply add a **hint** column next to the **label** column and add your hint messages  next to the question label. See below for an example.

| survey        |               |       |      |    |
| ------------- | ------------- | ----- | ---- | ----- |
|               | type     | name  |  label | hint |
|               | text     | name  | What is the name of this store?| Look on the signboard if the store has a signboard.|
|| geopoint | geopoint | Collect the GPS coordinates of this store.| |

The [Tutorial XLSForm](https://ona.io/xlsforms/forms/tutorial_xlsform) provides more examples of questions with hints.

### Constraints

One way to ensure data quality is to add constraints to the data fields in your forms.  For example, when asking for a person's age, you want to avoid impossible answers, like -22 or 200.  Adding data constraints in your form is easy to do.  You simply add a new column, called **constraint**, and type in the formula specifying the limits on the answer.  In the example below, the answer for the person's age must be less than or equal to 150. Note how the **(.)** refers to the variable in the formula.

| survey        |               |       |      |      |
| ------------- | ------------- | ----- | ---- | ---- |
|               | type          | name  |  label           |  constraint  |
|               | integer       | age   | How old are you? |  . <= 150  |

In this example, the formula ```. <= 150``` is saying that the value entered **(.)** must be less than or equal to 150. If the user puts 151 or above as the answer, s/he will not be allowed to swipe to the next question or submit the form.

Other useful expressions to use in the **constraint** column can be found [here](http://opendatakit.org/help/form-design/binding/).

##### Constraint Message

If you want to include a message with your constraint, telling the user why the answer is not accepted, you can add a **constraint_message** column to your form.  See the example below.

| survey |          |       |      |       |  |
| -------| ---------| ----- | ---- | ------|-----|
|        | type     | name  | label| constraint| constraint_message|
|        | integer  | respondent_age | Respondent's age  | . >=18  | Respondent must be 18 or older to complete the survey. |

In this example, if the user enters an age less than 18, then the error message in the **constraint_message** column appears.

### Relevant

One great feature of XLSForm is the ability to skip a question or make an additional question appear based on the response to a previous question. Below is an example of how to do this by adding a **relevant** column for a **select_one** question, using our pizza topping example from before:


| survey        |               |       |           |       |
| ------------- | ------------- | ----- | --------- |   ----- |
|               | type                  | name         |  label              |  relevant |
|               | select_one yes_no     | likes_pizza  | Do you like pizza?  |           |
|               | select_multiple pizza_toppings or_other| favorite_topping  | Favorite toppings|${likes_pizza} = 'yes'|

In this example, the respondent is asked, “Do you like pizza?” If the answer is **yes**, then the pizza topping question appears below. Note the **${ }** around the variable **likes_pizza**.  These are required in order for the form to reference the variable.  

In the next example, below, we use relevant syntax for a **select_multiple** question, which is slightly different from the **select_one** question example above.

| survey        |               |       |           |       |
| ------------- | ------------- | ----- | --------- |   ----- |
|               | type                  | name         |  label              |  relevant |
|               | select_one yes_no     | likes_pizza  | Do you like pizza?  |           |
|               | select_multiple pizza_toppings or_other| favorite_topping  | Favorite toppings|${likes_pizza} = 'yes'|
|      | text  | favorite_cheese | What is your favorite type of cheese? | selected(${favorite_topping}, 'cheese') |
|**choices**    |                      |                |                 |  |
|               |  list name           | name           |  label          |    |
|               |   pizza_toppings     |  cheese        |  Cheese         |    |
|               |   pizza_toppings     |  pepperoni     |  Pepperoni      |    |
|               |   pizza_toppings     |  sausage       |  Sausage        |    |

Since the pizza topping question allows multiple responses, we have to use the **selected(${favorite_topping}, 'cheese')** expression, because we want the cheese question to appear every time the user selects **cheese** as one of the answers (regardless of whether additional answers are selected).

### Formulas
Formulas are used in the constraint, relevant and calculate columns. You've already seen some examples in the **Relevant** and **Constraint** sections above.  Formulas allow you to add additional functionality and data quality measures to your forms.  Formulas are composed of functions and operators (+,*,div,etc.) The full list of these can be found [here](http://www.w3schools.com/xpath/xpath_operators.asp).

### Calculation
Your survey can perform calculations using the values of preceding questions. In most cases this will require inserting a **calculate** question. For example, in the survey below, we have calculated the tip for a meal and displayed it to the user:


| survey        |               |       |      |      |
| ------------- | ------------- | ----- | ---- | ---- |
|               | type          | name  |  label           |  calculation  |
|               | decimal       | amount  | What was the price of the meal? |   |
|               | calculate     | tip  |  |  ${amount} * 0.18 |
|               | note      | display  | 18% tip for your meal is: ${tip} |   |

Note that the **${tip}** in the last line will be replaced with the actual tip amount when viewing and filling out the form.

### Required

It's simple to mark certain questions as required in your form.  Marking them as required means the user will not be able to swipe to the next question (on a mobile client) or submit the form (on a web client) without entering an answer for that question.

To make questions required, add a **required** column to your survey page. Under that column, mark questions as required by writing **yes**.  See the example below:

| survey        |               |       |      |      |           |
| ------------- | ------------- | ----- | ---- | ---- | -------------- |
|               | type          | name  |  label           |  constraint  | required |
|               | integer       | age   | How old are you? |  . <= 150  | yes |

### Grouping Questions

To create a group of questions in your form try the following:

| survey        |               |       |      |
| ------------- | ------------- | ----- | ---- |
|               | type          | name  |  label |
|               | begin group         | respondent |  Respondent |
|               | text          | name  | Enter the respondent’s name |
|               | text     | position |  Enter the respondent’s position within the school.|
|               | end group    |     |       |

This is a good way to group related questions for data export and analysis. Notice how **end group** doesn't require a name or label, because it is hidden in the form.

##### Nesting Groups Within Groups

Groups of questions can be nested within one another:

| survey        |               |       |      |
| ------------- | ------------- | ----- | ---- |
|               | type          | name  |  label |
|               | begin group         | hospital |  Hospital |
|               | text          | name  | What is the name of this hospital? |
|               | begin group         | hiv_medication |  HIV Medication |
|               | select_one yes_no     | have_hiv_medication |  Does this hospital have HIV medication? |
|               | end group    |     |       |
|               | end group    |     |       |

You always have to end the most recent group that was created first. For instance, the first **end group** you see closes the HIV medication group, and the second one closes the beginning hospital group. When working with groups and you keep getting error messages when trying to upload your form, double-check that for each **begin group** you have one **end group**.

##### Skipping

One neat feature of XLSForm is the ability to skip a group of questions by combining grouping with relevant syntax, as described above. If you want to skip a group of questions all at once, put the relevant attribute at the beginning of a group like follows:

|               |       |      |     |
| ------------- | ----- | ---- |---- |
| type               | name          |  label    |   relevant    |
| integer            | age       | How old are you? |  |
| begin group        | child     | Child |  ${age} <= 5    |
| integer            | muac      | Record this child’s mid-upper arm circumference. |  |
|  select_one yes_no | mrdt      | Is the child’s rapid diagnostic test positive?  |  |
|  end group |      |   |  |

In this example, the two child group questions (**muac** and **mrdt**) will only appear if the child's **age** from the first question is less than or equal to five.

### Repeats

Sometimes repeating a group of questions can come in handy, like when you have to record multiple instances of an event. A good example is when you are registering a woman's delivery, and you have to record the birth of twins or triplets.  You can simply repeat the child questions for each child born instead of having to submit multiple forms. To create a repeating group of questions use the following construct:

| survey        |               |       |      |
| ------------- | ------------- | ----- | ---- |
|               | type          | name  |  label |
|               | begin repeat         | member |  Household Member |
|               | text          | name  | Name of household member. |
|               | integer     | age |  Age of household member. |
|               | end repeat    |     |       |

The above example is a list of household members, containing their name and age. The form will ask the name and age of the first household member, and then ask if the user wants to add another member. If so, the form will repeat each question for the second household member and so on.

Please look at the [Delivery Outcome](https://ona.io/xlsforms/forms/Delivery_Outcome) XLSForm that shows how to create repeating group questions.

### Multiple Language Support
It’s easy to add multiple languages to a survey. You simply have to name your **label::language1**,  **label::language2**, etc., and your surveys will be available in multiple languages. See the example below. To select a different language on the phone, press the **Menu** key, and the**Change Language** option. For the form below, English and Español will show up as the possible options.

| survey        |               |       |      |      |      |
| ------------- | ------------- | ----- | ---- | ---- | ---- |
|               | type          | name  |  label::English  | label::Español  |  constraint  |
|               | integer       | age   | How old are you? |    ¿Cuántos años tienes? |. <= 150 |


**Note**

You can also add a different language column for hints and media files; you simply use the **::language** construct. See the [XLSForm standard document](https://docs.google.com/spreadsheet/ccc?key=0AjZ4hMHTat-YdFZSY3BOZWtGeTdxWGQ1clZoVEZkamc&usp=sharing) to see exactly what kinds of column headers can accept a language modification.


### Media
You can include questions in your form that display images or that play video or audio files. If using the ODK mobile client for form submission, you need to put the media files that you want to include in the **/odk/forms/formname-media** folder on your phone, and then reference the exact file name in the **media** column in your form. See below for an example of how to do this.

| survey        |               |       |      |      |      |
| ------------- | ------------- | ----- | ---- | ---- | ---- |
|               | type          | name  |  label  | media::image  |  media::video  |
|               | note      | media_example  | Media example |    example.jpg | example.mp4 |

If using Ona or any other web client for form submission, you need to upload the media files to the form page, under the **Media** heading.

![](https://farm6.staticflickr.com/5007/13841014673_17ae707014.jpg)

A list of allowed media file types is listed.

Upload the media files by tapping the ```Choose Files``` button, then click on the ```Upload``` button to add your files to the form.  A list of your files will be displayed.  To remove a file, tap the **remove** option next to the file name.

![](https://farm4.staticflickr.com/3794/13841015493_4076102e51.jpg)

Check out the [Birds](https://ona.io/xlsforms/forms/Birds) XLSForm which illustrates the use of media files.

### Cascading selects
A lot of forms usually start out by asking the location of the form submission, with each location selection narrowing the subsequent location choices (e.g., state  >> district >> village).  Instead of adding a **select_one** field for each one, you can use **cascade select** type questions. For example, you could automatically display cities in a **select_one** question based on the country selected in a previous question, without having to include any relevant logic. In order to use cascading selects, you will need to create a **choice_filter** column in your survey sheet and add the location attribute columns in your choices sheet. Check out an [example XLSForm here](https://docs.google.com/spreadsheet/ccc?key=0AjZ4hMHTat-YdFVpOWVBVWREUGdNVWZKbUl2akhfWkE&usp=sharing).

### Default

Making a default field means that a question is already pre-populated with an answer when the user first sees the question.  This can help save time if the answer is one that is commonly selected or it can serve to show the user what type of answer choice is expected.  See the two examples below.

| survey        |               |       |      |      |
| ------------- | ------------- | ----- | ---- | ---- |
|               | type          | name  |  label  | default  |
|               | date      | survey_date  |  Survey date? |    ${today} |

In the above example, the **survey_date** field is always pre-populated with today's date. Make sure you include the **today** metadata field in the form when you reference it!

| survey        |               |       |      |      |
| ------------- | ------------- | ----- | ---- | ---- |
|               | type          | name  |  label  | default  |
|               | decimal      | weight  |  Respondent's weight? (in kgs) |  51.3  |

In this example, the weight is automatically set to 51.3 kg.  You can simply change the answer by tappng in the answer field and inputting another answer.

### Appearance

The **appearance** column allows you to change the appearance of questions in your form. The following table lists the possible appearance attributes and how the question appears in the form.

|  Appearance attribute   |  Description           |  
| ----------------------- | ----------------------- |
|  multiline             |  Best if used with web clients, set appearance to **multiline** for **text** questions, makes the text box multiple lines long.         |
|  field-list            | Create a group with appearance set to **field-list** to make the entire group of questions appear on one screen (for mobile clients only).          |
|  table-list            | Similar to field-list, **table-list** makes the questions on the screen more compact in a table-like format.          |
|  minimal             | Makes the answer choices for **select_one** or **select_multiple** questions appear in a drop-down menu.          |
|  quick             | Relevant for mobile clients only, this attribute auto-advances the form to the next question after an answer is selected (no swiping required).          |  
| month-year | For **date** fields, select a month and year only for the date. |
| year       | For **date** fields, select only a year for the date. |
| horizontal | For web clients only, this makes the answer choices appear in columns of horizontal lists. |
| horizontal-compact | For web clients only, this makes the answer choices appear in a single horizontal list. |
| Likert     | Best if used with web clients, set appearance to **likert** for **select_one** questions, makes the answer choices appear in a Likert-style row. |
| compact    |  Used for web clients, makes it possible to select an image as choice in a select one questions, the images are displayed side by side with each other.    |
| quickcompact | Same as previous but this one advances to the next question automatically in ODK Collect.       |
| maps       |     |
| label      | Used with tables where the table group's appearance is set to **field-list**, this allows a table grid display with the answer choice labels on separate columns.      |
| list-nolabel | Used in the same group as the **label** appearance, this allows the answer input to show without the label.      |
| signature  | Used with **image** questions for mobile clients only, signature allows you to trace your signature into your form.      |
| draw       | Used with **image** questions for mobile clients only, draw allows you to sketch a drawing with your finger on the mobile device screen. |

A tutorial XLSForm with all of the appearance attributes in this table is available [here]().

### Settings Worksheet
Earlier we hinted that there were additional sheets besides the **survey** and **choices** sheet to include with your XLSForm. The **settings** sheet is optional, but it allows you to further customize your form and

You can include a settings worksheet in your xls file similar to the following:

| settings      |               |       |      |      |      |    |
| ------------- | ------------- | ----- | ---- | ---- | ---- | ---- |
|               | form_title    | form_id  |  public_key  | submission_url |default_language | version  |
|               | example title     | example_id  | IIBIjANBg... |    https://example-odk-aggregate.appspot.com/submission | English|  2  |

They do the following:
* **form_title**: The name of the form presented to users.
* **form_id**: The name used to identify the form submission.
* **url**: The url of a server that submitted forms are to be sent to.
* **public_key**: If form instances are to be encrypted, a public key needs to be included in the form.
* **default_language**: In localized forms, this sets which translation should be used as the default.
Note: None of these settings are required.

##### Encrypted forms

Encrypted forms provide a mechanism to keep your data private using http for communication. Submission sent to the Aggregate server is encrypted and completely inaccessible to anyone not possessing the private key.

To encrypt XLS forms, add the **id_string**, **submission_url** and the **public_key** as column headers in the settings worksheet.

They do the following:

  * **id_string** - name used to identify the form
  * **submission_url** - is your submission url
  * **public_key** - is the base64RsaPublicKey

For more information on encrypted forms and how to generate the rsa keys have a look at the tutorial [here](http://opendatakit.org/help/encrypted-forms/). Please have a look at the [tutorial_encrypted](https://ona.io/xlsforms/forms/tutorial_encrypted) xlsform example.. 


##### Multiple webpage forms

##### Grid Theme forms

### Styling notes

### SMS form data submission

### More Resources
Your first stop for more resources should be [formhub university](http://formhub.org/formhub_u/), an account on formhub with many forms that you can download and inspect to learn about features. The [XLSform standard document](https://docs.google.com/spreadsheet/ccc?key=0AjZ4hMHTat-YdFZSY3BOZWtGeTdxWGQ1clZoVEZkamc&usp=sharing) can guide you through the specific input types, column headers, and so on that are legitimate syntax in XLSforms. If you are still confused, you can just email opendatakit@googlegroups.com, or search the list for previous threads which may have answered your question. If you want to dig in deeper to understand xforms and go beyond xlsforms, here are some resources to understand them:

* Form guidelines: [http://code.google.com/p/opendatakit/wiki/XFormDesignGuidelines](http://code.google.com/p/opendatakit/wiki/XFormDesignGuidelines)
* Form design tutorial: [https://bitbucket.org/javarosa/javarosa/wiki/buildxforms](https://bitbucket.org/javarosa/javarosa/wiki/buildxforms)
* Sample forms: [http://code.google.com/p/opendatakit/source/browse/?repo=forms](http://code.google.com/p/opendatakit/source/browse/?repo=forms)
* XForms as supported by JavaRosa: [https://bitbucket.org/javarosa/javarosa/wiki/xform-jr-compat](https://bitbucket.org/javarosa/javarosa/wiki/xform-jr-compat)
