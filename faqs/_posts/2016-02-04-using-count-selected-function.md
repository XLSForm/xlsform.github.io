---
layout: post
title: "How do I use the count-selected() function?"
permalink: /faq/using-count-selected-function
category: faq
---

The **count-selected** function is used with select_multiple questions.  It will count the number of answer choices selected in the select_multiple question and return that value as an integer.  See the example below:

| survey        |                             |                  |                                            |                                 |
| ------------- | --------------------------- | ---------------- |--------------------------------------------| --------------------------------|
|               | type                        | name             |  label                                     |  calculation                    |
|               | select_multiple cities      | cities_visited   | Select all of the cities you have visited. |                                 |
|               | calculate                   | num_cities_visited |                                          |count-selected(${cities_visited})|



A much more practical application of count-selected is to restrict a user from selecting certain answer choices together.  Take the following question as an example:

<br><br>
![](/content/screenshots/faq/faq-count-selected.png)

In this question, one of the options is **No risk symptoms observed**.  It wouldn’t make any sense for a user to select other risk symptoms and then also select No risk symptoms observed.  Using the count-selected function, you can restrict the user from selecting **No risk symptoms** observed with any other answer choice.  See the XLSForm snippet below:

| survey        |                       |                 |                     |      |
| ------------- | --------------------- | --------------- | ------------------- | ---- |
|               | type                  | name            |  label              |  constraint  |
|               | select_multiple risks | risks_observed  | Does the woman have any risk symptoms? |  (selected(., 'none') and (count-selected(.) = 1)) or not(selected(., 'none')) |
|**choices**    |                       |                 |                     |   |
|               |  list name            | name            |  label              |   |
|               |   risks               |  pallor         |  Pallor             |   | 
|               |   risks               |  swelling       |  Swelling / Edema   |   |
|               |   risks               |  bleeding       |  Bleeding           |   |
|               |   risks               |  jaundice       |  Jaundice           |   |
|               |   risks               |  convulsions    |  Fits / Convulsions |   |
|               |   risks               |  none           |  No risk symptoms observed |   |
|               |   risks               |  others         |  Others           |   |

The constraint logic is specifying that if the user selects the answer choice name **none**, then only this answer can be selected (count-selected(.) = 1), or answer choice name **none** is not selected at all.
