xlsform.org
===========

Website for the XLSForm spec published on [xlsform.org](http://xlsform.org).

### Develop


```bash
# Get a copy of the repository.
mkdir -P ~/repos/xlsform-docs
cd ~/repos/xlsform-docs
git clone https://github.com/XLSForm/xlsform.github.io.git repo

# Create and activate a virtual environment for the install.
python -m venv venv
source venv/bin/activate

# Install pyodk and its production dependencies.
cd ~/repos/xlsform-docs/repo
pip install -r requirements.txt

# Build and locally serve the docs to preview while editing.
mkdocs serve

# Leave the virtualenv.
deactivate
```

*Deployment*

A GitHub actions workflow to publish the docs site is run when a pull request is merged.


### Edit

All content is in the `docs` folder.

- assets: extra files such as example XLSForms.
- theme: custom theme template and theme assets.
- index.md: the main docs page
  - the only page to add or modify.
  - the theme javascript enables custom Markdown table syntax which mimics spreadsheet document tabs. To use this, add a row where each cell contains `===`, then another row where the first column is the "active" sheet name ("survey", "choices", or "settings").  
- reference.md: links / previews of the reference template XLSForm in Google Sheets.


*Localisation*

This documentation is not localised - please open an issue if that is something you or your team would find useful (and can help maintain!).
