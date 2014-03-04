/**
* This plugin allows the developer to show a wizard-like set of masks to the user.
* To make it special you can set custom-functions to let the plugin react on.
* To do this you add an data attribute named 'action' to the section-element specifing the action to fire on section change.
* The functions will be declareted and send to the init function().
* @author Christopher Meyering <info@mey-solution.de>
*/
$.fn.meyWiz = function() {
	/**
	 * Stores the main element and makes it accessible in the plugin
	 */ 
	var selectedElement = this;

	/**
	 * Settings which can be edited by the developer by setting them in the init() function
	 */
	var settings = $.extend({

		showNextButton: true,
		showPrevButton: true,
		maxSections: 0,
		currentSection: 0,
		lang: {
			'next': 'Go on',
			'done': "We're done here!",
			'prev': 'Back'
		},
		customFunctions: {}
	});

	return {
		/**
		 * Stores the settings as data-attribute
		 * (This is needed to allow external functions to access the functions set by the developer)
		 * @access	private
		 */
		_storeSelf: function(settings) {
			$(selectedElement).data('meyWizFunctions', {
				fncs: settings.customFunctions, 
				max: settings.maxSections,
				lang: settings.lang
			});
		},

		/**
		 * Re-populates the plugin with the functions set by the developer
		 * (This is needed to allow external functions to access the functions set by the developer)
		 * @access	private
		 */
		_rebuild: function() {
			var data = $(selectedElement).data('meyWizFunctions');			
			settings.customFunctions = data.fncs;
			settings.maxSections = data.max;
			settings.lang = data.lang;
		},

		/**
		 * Initializes the plugin and build the internal structure
		 * with the `customFunctions` the developer can register his functions to the plugins hooks
		 * @access 	public
		 * @param	{object}	Object with functions
		 */
		init: function(customFunctions) {
			settings.customFunctions = customFunctions;			
			$(selectedElement).children('section:not(.active)').hide();
			settings.maxSections = $(selectedElement).children('section').length - 1;
			var i = 0;
			if(settings.showNextButton === true || settings.showPrevButton === true) {
				$(selectedElement).children('section').each(function() {
					$(this).attr('data-pos', i);
					var elements = $('<div>').attr('class', 'btn-group');
					if(settings.showPrevButton === true) {
						if(i > 0) {
							var element = $('<span>').attr('class', 'btn btn-default meyWiz-prev').html(settings.lang.prev);
							element.attr('data-prevSection', (i-1));	
						}
						$(elements).append(element);
					}
					if(settings.showNextButton === true) {
						if(i < settings.maxSections) {
							var element = $('<span>').attr('class', 'btn btn-default meyWiz-next').html(settings.lang.next);
							element.attr('data-nextSection', (i+1));
						}
						else {
							var element = $('<span>').attr('class', 'btn btn-success').html(settings.lang.done);	
						}
						$(elements).append(element);
					}					
					$(this).append(elements);
					i++;
				});
			}

			this._storeSelf(settings);
			this._addEvents();
		},

		/**
		 * Adds all handlers to the meyWiz-elements to get them up and running.
		 * Fires the unload-function as well if one is provided
		 * @access	private
		 */
		_addEvents: function() {
			var parent = this;
			$('.meyWiz-next').click(function() {
				var pos = $(this).attr('data-nextSection');
				var $nextElement = $('section[data-pos=' + pos + ']');
				var $currentElement = $('section[data-pos=' + (pos - 1) + ']');
				if($.type($currentElement.attr('data-unload')) !== 'undefined') {
					var fnc = $currentElement.attr('data-unload');
					var result = settings.customFunctions[fnc]();
					if(result === false) {
						return false;
					}
				}
				parent._render($nextElement);
			});
			$('.meyWiz-prev').click(function() {
				var pos = $(this).attr('data-prevSection');
				var $prevElement = $('section[data-pos=' + pos + ']');
				var $currentElement = $('section[data-pos=' + (pos + 1) + ']');
				parent._render($prevElement);
			});
		},

		/**
		 * Displays the section on the position of pos
		 * @access	public
		 * @param	{Integer} The Position of the section you want to display
		 */
		jumpTo: function(pos) {
			this._rebuild();
			var $nextElement = $('section[data-pos=' + pos + ']');
			this._render($nextElement);
		},

		/**
		 * Renders the section and fires the load function if given
		 * @access	private
		 * @param	{Object}	The next section to display
		 */ 
		_render: function($nextElement) {
			if($.type($nextElement.attr('data-load')) !== 'undefined') {
				var fnc = $nextElement.attr('data-load');
				var result = settings.customFunctions[fnc]();
				if(result === false) {
					return false;
				}
			}
			$(selectedElement).children('section').hide().removeClass('active');
			$nextElement.show('slide').addClass('active');
		},

		/**
		 * Switches to the next section if there is one
		 * @access	public
		 */
		next: function() {
			this._rebuild();
			var currentPos = parseInt($('section.active').attr('data-pos'));			
			if((currentPos + 1) <= settings.maxSections) {
				this.jumpTo((currentPos + 1));
			}
		},

		/**
		 * Switches to the previous section if there is one
		 * @access	public
		 */
		prev: function() {
			this._rebuild();
			var currentPos = parseInt($('section.active').attr('data-pos'));			
			if((currentPos - 1) >= 0) {
				this.jumpTo((currentPos - 1));
			}
		}
	}
}