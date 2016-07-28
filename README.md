# Muniware styles

## Running the demo locally.
1. After downloading or cloning this repo, run `npm install`. This will install the development environment dependencies and automatically run `bower install` after completion—installing the front-end dependencies.
2. Run `gulp styles`, `gulp scripts`, `gulp plugins`, and `gulp images` to compile the static assets.
3. Run `gulp serve` to open the demo in a browser.

While `gulp serve` is running, any edits to the HTML files or Sass styles will automatically be updated in the browser.

## Updating the styles.
When making changes, check the Bootstrap documentation to see if the desired component is already implemented. If changes to existing components are needed, check Bootstrap for variables that can be adjusted before writing overriding styles. When overriding Bootstrap styles, try to follow the same selector path.

By following these guidelines, you should be able to adapt Bootstrap's default styles while keeping the stylesheet from becoming too bloated or running into specificity or inheritance issues.

The custom CSS can be found in the `raw/sass/` directory, and generally follows [the 7-1 architecture](https://sass-guidelin.es/#architecture) for organisation. Styles that override third-party packages (_eg_ Bootstrap, Selectize, etc.) are added in the `/vendor` sub-directory.
