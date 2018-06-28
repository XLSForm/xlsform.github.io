xlsform.org
===========

Website for the XLSForm spec published on [xlsform.org](http://xlsform.org).

### Develop

Install [Jekyll](https://jekyllrb.com/) and run with `jekyll serve --watch` on http://localhost:4000.

### Edit

All content is in the `_content` and `_data` folder. The filenames are not relevant. It's helpful to inlude the language in the file name.

### Add a translation

1. Copy the file in `_content` that you are translating (and give it a new filename).
2. Change the `lang` at the top to the new language (e.g. `fr`) and translate the content of the file.
3. Add language columns to the 3 CSV files in the `_data` folder with `::fr` added to the translated columns. Any columns without language tags are included in all languages (ie. the columns "Enketo?", "ODK?").
4. Copy the `en` folder and rename to the language you are adding, e.g. `fr`. 
5. In the new folder, change the `lang` and `title` property at the top of each file.
6. Finally add a translated site description in [_config.yml](./config.yml)