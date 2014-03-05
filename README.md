# Wizard-like Mask changer with custom functions

This plugin works as a simple mechanic for bigger single-sign-forms.

All you have to do is to define some section-elements and fire the plugin.

The special ability of this plugin is the possibility of custom functions!
This means, that you can add an data attribute named 'action' to the section, which will be fired on section unload.
Such a function can be usefull for validating or saving any kind of data.

**Please use the files in /lib.**
There you can find a documentated version and a minified-one.

## Methodes
### `jumpTo(<int>)`
Directly sets the section on the given position to the user, hiding all other sections.

### `prev()`
Returns the last section

### `next()`
Shows the next section


## How to call custom functions
The plugin offers the following hookpoints:
- `load` (will be fired **before** a section is rendered)
- `unload` (will be fired **before** leaving the section)
  

## Coming soon
- ~~Grunt & UglifyJS integration~~ **done**
- ~~load/unload hooks~~ **done**
- ~~JS Unittests (using QUnit)~~ **done**
- HTML5 History implemention
- possibility of adding more then one function to a section
- Localization
- much more