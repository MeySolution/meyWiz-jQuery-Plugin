# Wizard-like Mask changer with custom functions

This plugin works as a simple mechanic for bigger single-sign-forms.

All you have to do is to define some section-elements and fire the plugin.

The special ability of this plugin is the possibility of custom functions!
This means, that you can add an data attribute named 'action' to the section, which will be fired on section unload.
Such a function can be usefull for validating or saving any kind of data.

## Methodes
### `jumpTo(<int>)`
Directly sets the section on the given position to the user, hiding all other sections.

### `prev()`
Returns the last section

### `next()`
Shows the next section


## How to call custom functions
1. Set them in the section `<section data-action="logSmth">`
2. Pass a named function to the plugins init like `$('#page').ssp().init({
		storeSelfStrategy: function() {
			var data = $('input[name="selfText[strategy]"]:checked').val();
			if(typeof data === 'undefined') {
				return false;
			}
			setLs('selfCheck[strategy]', data);
			return true;
		}
	});`
3. just wait for the event beeing fired


## Coming soon
- HTML5 History implemention
- possibility of adding more then one function to a section
- Localization
- much more