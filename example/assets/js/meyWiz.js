/**
* This plugin allows the developer to show a wizard-like set of masks to the user.
* To make it special you can set custom-functions to let the plugin react on.
* To do this you add an data attribute named 'action' to the section-element specifing the action to fire on section change.
* The functions will be declareted and send to the init function().
* @author Christopher Meyering <info@mey-solution.de>
*/
$.fn.meyWiz = function() {
	var selectedElement = this;
	var settings = $.extend({
		maxSections: 0,
		currentSection: 0,
		lang: {
			'next': 'Weiter',
			'done': 'Abschließen'
		},
		customFunctions: {}
	});

	return {
		_storeSelf: function(settings) {
			$(selectedElement).data('sspFunctions', {fncs: settings.customFunctions, max: settings.maxSections});
		},

		_rebuild: function() {
			var data = $(selectedElement).data('sspFunctions');			
			settings.customFunctions = data.fncs;
			settings.maxSections = data.max;
		},

		init: function(customFunctions) {
			settings.customFunctions = customFunctions;			
			$(selectedElement).children('section:not(.active)').hide();
			settings.maxSections = $(selectedElement).children('section').length - 1;
			var i = 0;
			$(selectedElement).children('section').each(function() {
				$(this).attr('data-pos', i);
				var elements = $('<div>').attr('class', 'btn-group');
				if(i < settings.maxSections) {
					var element = $('<span>').attr('class', 'btn btn-default ssp-next').html(settings.lang.next);
					element.attr('data-nextSection', (i+1));
				}
				else {
					var element = $('<span>').attr('class', 'btn btn-success').html(settings.lang.done);	
				}
				$(elements).append(element);
				$(this).append(elements);
				i++;
			});

			this._storeSelf(settings);
			this._addEvents();
		},

		_addEvents: function() {
			var parent = this;
			$('.ssp-next').click(function() {
				var pos = $(this).attr('data-nextSection');
				var $nextElement = $('section[data-pos=' + pos + ']');
				var $currentElement = $('section[data-pos=' + (pos - 1) + ']');
				if($.type($currentElement.attr('data-action')) !== 'undefined') {
					var fnc = $currentElement.attr('data-action');
					var result = settings.customFunctions[fnc]();
					if(result === false) {
						return false;
					}
				}
				parent._render($nextElement);
			});
		},

		jumpTo: function(pos) {
			this._rebuild();
			var $nextElement = $('section[data-pos=' + pos + ']');
			this._render($nextElement);
		},

		_render: function($nextElement) {
			$(selectedElement).children('section').hide().removeClass('active');
			$nextElement.show('slide').addClass('active');
		},

		next: function() {
			this._rebuild();
			var currentPos = parseInt($('section.active').attr('data-pos'));			
			if((currentPos + 1) <= settings.maxSections) {
				this.jumpTo((currentPos + 1));
			}
		},

		prev: function() {
			this._rebuild();
			var currentPos = parseInt($('section.active').attr('data-pos'));			
			if((currentPos - 1) >= 0) {
				this.jumpTo((currentPos - 1));
			}
		}
	}
}