## What is XLSForm?

XLSForm is a tool used to simplify the creation of web forms. With XLSForm, you can author webforms in Excel, and XLSForm will convert it to an XForm that can be used with a number of online mobile platforms. This intro-level tutorial teaches you how to author your forms using Excel.

### Basic format
Each Excel workbook usually has two worksheets: **survey** and **choices**. Later on, you'll learn about other worksheets that can add additional specifications to your webform, but the survey and choices worksheets are usually mandatory.

#### The survey worksheet
This worksheet gives your webform its overall structure and contains most of the content of the form. It contains the full list of questions and information about how they should appear in the form. Each row usually represents one question; however, there are certain other features you'll read about later that you can add to the form to improve the user experience.

#### The choices worksheet
This worksheet is used to specify the answer choices for multiple choice questions. Each row represents an answer choice. Answer choices with the same list name are considered part of a related set of choices and will appear together for a question. This also allows a set of choices to be reused for multiple questions (for example, yes/no questions).

![](https://farm4.staticflickr.com/3767/13734054823_d2b3beb03d.jpg)

Both of these worksheets have a set of mandatory columns that must be present for the form to work. Additionally, each worksheet has a set of optional columns that allow further control over the behavior of each entry in the form, but are not essential to have. Every entry must have values for each of the mandatory columns, but the optional columns may be left blank.

* The **survey** worksheet has 3 mandatory columns: **type**, **name**, and **label**.
  * The **type** column specifies the type of entry you are adding.
  * The **name** column specifies the unique variable name for that entry. No two entries can have the same name.
  * The **label** column contains the actual text you see in the webform.  

![](https://farm4.staticflickr.com/3686/13734779364_63e8389c7a.jpg)

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
| image         | Take a picture.      |
| barcode       | Scan a barcode, requires the barcode scanner app to be installed.      |
| date          | Date input.     |
| datetime      | Accepts a date and a time input.      |
| audio         | Take an audio recording.      |
| video         | Take a video recording.      |
| calculate     | Perform a calculation; see the 'Calculations' section below.      |

For example, to collect the name and GPS coordinates of a store, you would write the following:

| survey        |               |       |      |
| ------------- | ------------- | ----- | ---- |
|               | type          | name  |  label |
|               | text          | store_name  | What is the name of this store?|
|               | geopoint      | store_gps |  Collect the GPS coordinates of this store.|

Check out the [Tutorial XLSForm](https://ona.io/xlsforms/forms/tutorial_xlsform) for a look at each question type in action!

#### Multiple choice questions

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


#### Specify other
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

#### Metadata
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
|               | sim_serial    | sim_serial   |         |
|               | phone_number  | phone_number   |   |        |

Notice that there are no labels associated with the metadata question types.  This is because the phone captures these variables automatically. These questions will not appear on the screen of the phone, but you will see them when viewing your submitted survey data.

### Hints
Sometimes you want to add a small hint to a question on your survey, instructing the user how to answer the question, but you don't want the hint to be part of the question itself. It’s easy to add hints to questions in XLSForms.  Simply add a **hint** column next to the **label** column and add your hint messages  next to the question label. See below for an example.

| survey        |               |       |      |    |
| ------------- | ------------- | ----- | ---- | ----- |
|               | type     | name  |  label | hint |
|               | text     | name  | What is the name of this store?| Look on the signboard if the store has a signboard.|
|| geopoint | geopoint | Collect the GPS coordinates of this store.| |

### Constraints

One way to ensure data quality is to add constraints to the data fields in your forms.  For example, when asking for a person's age, you want to avoid impossible answers, like -22 or 200.  Adding data constraints in your form is easy to do.  You simply add a new column, called **constraint**, and type in the formula specifying the limits on the answer.  In the example below, the answer for the person's age must be less than or equal to 150. Note how the **(.)** refers to the variable in the formula.

| survey        |               |       |      |      |
| ------------- | ------------- | ----- | ---- | ---- |
|               | type          | name  |  label           |  constraint  |
|               | integer       | age   | How old are you? |  . <= 150  |

In this example, the formula ```. <= 150``` is saying that the value entered **(.)** must be less than or equal to 150. If the user puts 151 or above as the answer, s/he will not be allowed to swipe to the next question or submit the form.

#### Constraint Message

If you want to include a message with your constraint, Generally, a constraint pops up a default message telling the enumerator that he/she cannot go forward, but a constraint_message column can override this message on a question-by-question basis.

### Cascading selects
In Collect 1.2 and above it is possible to create cascading selects (select type questions where the options depend on the options selected in previous questions). For example, you could display cities in a select question based on the country selected in a previous question. In order to use cascading selects you will need to create a choice_filter column in your survey sheet and add some attribute columns to filter on in your choices sheet. [There is an example XLSForm available here](https://docs.google.com/spreadsheet/ccc?key=0AjZ4hMHTat-YdFVpOWVBVWREUGdNVWZKbUl2akhfWkE&usp=sharing). There are a few caveats to bear in mind: or_other is currently not supported for cascading selects. Best practice for naming attribute column headers in the choices sheet is to begin your names with attr and only use letters (no spaces).

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

Please look at the [Delivery Outcome](https://ona.io/xlsforms/forms/Delivery_Outcome) XLSForm that shows how to create repeating group questions.


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

### Multiple Language Support
It’s easy to add multiple languages to a survey. You simply have to name your label::language1 label::language2 etc., and your surveys will be available on multiple languages. To select a different language on the phone, press the Menu key, and the “Change Language” option. For the form below, “English” and “Español” will show up as the possible options.

| survey        |               |       |      |      |      |
| ------------- | ------------- | ----- | ---- | ---- | ---- |
|               | type          | name  |  label::English  | label::Español  |  constraint  |
|               | integer       | age   | How old are you? |    ¿Cuántos años tienes? |. <= 150 |

Adding a hint in a different language in a hint, or adding specific media files for a given language is also possible; you simply use the ::language construct. See the [xlsform standard document](https://docs.google.com/spreadsheet/ccc?key=0AjZ4hMHTat-YdFZSY3BOZWtGeTdxWGQ1clZoVEZkamc&usp=sharing) to see exactly what kinds of column headers can accept a language modification.


### Media
You can also include questions in your form that display images or that play videos or audio files. In order to do this, you will need to put the media files that you want to include in your form in the /odk/forms/formname-media folder on your phone, and then reference the file name in the media column in your form. See below for an example of how to do this.

| survey        |               |       |      |      |      |
| ------------- | ------------- | ----- | ---- | ---- | ---- |
|               | type          | name  |  label  | media::image  |  media::video  |
|               | note      | media_example  | Media example |    example.jpg | example.mp4 |

### Formulas
Formulas are used in the constraint, relevant and calculate columns. Formulas are composed of functions and operators (+,*,div,etc) that are for the most part derived from the XPath specification. [The XPath operators are documented here](http://www.w3schools.com/xpath/xpath_operators.asp).

### Calculations
Your survey client can perform calculations using the values of preceding questions. In most cases this will require use of a calculate question. For example, in the survey below, we have calculated the tip and shown it to the surveyor. Our survey sheet will look like this:


| survey        |               |       |      |      |
| ------------- | ------------- | ----- | ---- | ---- |
|               | type          | name  |  label           |  calculation  |
|               | decimal       | amount  | What was the price of the meal? |   |
|               | calculate     | tip  | (Label is not required because calculates do not display any content.) |  ${amount} * 0.18 |
|               | note      | display  | 18% tip for your meal is: ${tip} |   |



### Settings Worksheet
You can include a settings worksheet in your xls file similar to the following:

| settings      |               |       |      |      |      |    |
| ------------- | ------------- | ----- | ---- | ---- | ---- | ---- |
|               | form_title    | form_id  |  public_key  | submission_url |default_language | version  |
|               | example title     | example_id  | IIBIjANBg... |    https://example-odk-aggregate.appspot.com/submission | English|  2  |

They do the following: form_title: The name of the form presented to users. form_id: The name used to identify the form submission_url: The url of a server that submitted forms are to be sent to. public_key: If form instances are to be encrypted, a public key needs to be included in the form. default_language: In localized forms, this sets which translation should be used as the default. None of these settings are required.

### More Resources
Your first stop for more resources should be [formhub university](http://formhub.org/formhub_u/), an account on formhub with many forms that you can download and inspect to learn about features. The [XLSform standard document](https://docs.google.com/spreadsheet/ccc?key=0AjZ4hMHTat-YdFZSY3BOZWtGeTdxWGQ1clZoVEZkamc&usp=sharing) can guide you through the specific input types, column headers, and so on that are legitimate syntax in XLSforms. If you are still confused, you can just email opendatakit@googlegroups.com, or search the list for previous threads which may have answered your question. If you want to dig in deeper to understand xforms and go beyond xlsforms, here are some resources to understand them:

* Form guidelines: [http://code.google.com/p/opendatakit/wiki/XFormDesignGuidelines](http://code.google.com/p/opendatakit/wiki/XFormDesignGuidelines)
* Form design tutorial: [https://bitbucket.org/javarosa/javarosa/wiki/buildxforms](https://bitbucket.org/javarosa/javarosa/wiki/buildxforms)
* Sample forms: [http://code.google.com/p/opendatakit/source/browse/?repo=forms](http://code.google.com/p/opendatakit/source/browse/?repo=forms)
* XForms as supported by JavaRosa: [https://bitbucket.org/javarosa/javarosa/wiki/xform-jr-compat](https://bitbucket.org/javarosa/javarosa/wiki/xform-jr-compat)



<h3 id="relevant">Relevant</h3>
