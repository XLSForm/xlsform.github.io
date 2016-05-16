---
layout: post
title: "How do I use choice filter for cascade selects?"
permalink: /faq/choice-filter-for-cascades-selects
category: faq
---

In order to create [cascade selects](http://xlsform.org/#cascade)in your form, add the **choice_filter** column in the **survey** worksheet, which will filter the lists of the multiple choice questions.  The choice filter you specify in the **choice_filter** column defines which prior field will be used to filter the list of options. For instance, with a location hierarchy, the choice filter will be written as follows:

| survey        |                     |               |                                            |                                 |
| ------------- | ------------------- | --------------|--------------------------------------------| --------------------------------|
|               | type                | name          |  label                                     |  choice_filter                  |
|               | select_one province | hh_province   | Province in which the household is located |                                 |
|               | select_one district | hh_district   | District in the province where the household is located |cf=${province}|
|               | select_one village  | hh_village    | Village of the household in the district   |cf=${hh_district}|


**cf=${province}** filters the list of districts to the province that was selected and **cf=${district}** filters the list of locations to the district that was selected.

In the **choices** worksheet, add the province, district, and location answer choices as you normally would and add a new column called **cf**; this column allows you to specify the location filters.

![](/content/screenshots/faq/cascades-with-choice-filter-1.png)

Check out the entire XLSForm example [here](https://docs.google.com/spreadsheets/d/1_Pu8jH25jfNBnmK5-524nyEemzGbRuwb-6CPuJqM7mQ/edit?usp=sharing).

