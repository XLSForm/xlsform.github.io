---
layout: post
title: "How does an indexed repeat work?"
permalink: /faq/indexed-repeats
category: faq
---

An indexed repeat allows a user to reference information from a previous repeat group and use it in a subsequent repeat group. For example, if you’re collecting information on members of a household, you might start with one repeat group that collects the household members’ names and basic demographic information while later on in the form, you might want to use a new repeat group that collects additional information such as income for each household member.

In the example below, the **hh_member_names_repeat** repeat group is used to record the name of each household member.  Note the use of the [repeat_count](http://xlsform.org/#repeats) function that restricts the number of repeats to the number of household members entered in the first question.  The **position(..)** function assigns a sequential value (i.e., 1, 2, 3, ...) for each household member.

| survey        |               |                |                                  |             |                  |
| ------------- | ------------- | ------------   | -------------------------------- |------- ---- |----------------- |
|               | type          | name           |  label                           | calculation |repeat_count |
|               | integer       | num_hh_members | How many people live in this household?     |      |
|               | begin repeat  | hh_member_names_repeat|  Household member names   |             |${num_hh_members} |
|               | calculate     | name_number           |                           |  position(..) |                  |
|               | text          | hh_member_name        |  Name of household member #${name_number}?|             |    |  
|               | end repeat    |                |                                  |             |               |    |

In a subsequent repeat group, you can ask for additional information about the household members, such as age and sex, using their names that were entered in the first repeat group. Use the expression **indexed-repeat(${name_hh_member}, ${hh_member_names_repeat}, position(..))** to return the names of the household members in the order they were added in the first repeat group. See the example below:


| survey        |              |                       |                              |                                 |
| ------------- | ------------ | --------------------- |------------------------------| --------------------------------|
|               | type         | name                  |  label                       |  calculation                    |
|               | begin repeat | hh_member_info_repeat | Household member age and sex |                    |
|               | calculate    | name_from_earlier |                          | indexed-repeat(${hh_member_name}, ${hh_member_names_repeat}, position(..))|
|               | integer      | hh_member_age     |  Age of ${name_from_earlier} |  |
|               | select_one sex | hh_member_sex   |  Sex of ${name_from_earlier} | |
|               | end repeat                  |  |                                  | ||

The [Baseline Household Survey](https://docs.google.com/spreadsheets/d/1313vcNIxM1mXfjgC4noYmg-vMSIrS1Bu0wO7arYevOw/edit?usp=sharing) is an XLSForm with an example indexed repeat function.




