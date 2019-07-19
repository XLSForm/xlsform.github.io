xlsform.org
===========

Website for the XLSForm spec published on [xlsform.org](http://xlsform.org).

### Develop

Install [Jekyll](https://jekyllrb.com/) and run with `jekyll serve` on http://localhost:4000.

### Edit

All content is in the `_sections` and `_data` folders. 

### Add a translation

1. Copy the file in `_sections` that you are translating (and give it a new filename - there are no filename rules, but it's helpful to include the language name, e.g. `home-french.md`).
2. Change the 2-character `lang` value at the top to the new file (e.g. `fr`) and translate the content of the file.
3. Add language columns to the 3 CSV files in the `_data` folder with `::fr` added to the translated columns. Any columns without language tags are included in all languages (ie. the columns "Enketo?", "ODK?"). It is best to not translate those columns.
4. Copy the `en` folder and rename it to the language you are adding, e.g. `fr`. 
5. In the new folder, change the `lang` and `title` values at the top of each file.
6. Finally add a translated site description in [_config.yml](./_config.yml)