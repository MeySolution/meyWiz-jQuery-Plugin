/*! meyWiz 2014-03-04 */
$.fn.meyWiz=function(){var a=this,b=$.extend({showNextButton:!0,showPrevButton:!0,maxSections:0,currentSection:0,lang:{next:"Go on",done:"We're done here!",prev:"Back"},customFunctions:{}});return{_storeSelf:function(b){$(a).data("meyWizFunctions",{fncs:b.customFunctions,max:b.maxSections,lang:b.lang})},_rebuild:function(){var c=$(a).data("meyWizFunctions");b.customFunctions=c.fncs,b.maxSections=c.max,b.lang=c.lang},init:function(c){b.customFunctions=c,$(a).children("section:not(.active)").hide(),b.maxSections=$(a).children("section").length-1;var d=0;(b.showNextButton===!0||b.showPrevButton===!0)&&$(a).children("section").each(function(){$(this).attr("data-pos",d);var a=$("<div>").attr("class","btn-group");if(b.showPrevButton===!0){if(d>0){var c=$("<span>").attr("class","btn btn-default meyWiz-prev").html(b.lang.prev);c.attr("data-prevSection",d-1)}$(a).append(c)}if(b.showNextButton===!0){if(d<b.maxSections){var c=$("<span>").attr("class","btn btn-default meyWiz-next").html(b.lang.next);c.attr("data-nextSection",d+1)}else var c=$("<span>").attr("class","btn btn-success").html(b.lang.done);$(a).append(c)}$(this).append(a),d++}),this._storeSelf(b),this._addEvents()},_addEvents:function(){var a=this;$(".meyWiz-next").click(function(){var c=$(this).attr("data-nextSection"),d=$("section[data-pos="+c+"]"),e=$("section[data-pos="+(c-1)+"]");if("undefined"!==$.type(e.attr("data-unload"))){var f=e.attr("data-unload"),g=b.customFunctions[f]();if(g===!1)return!1}a._render(d)}),$(".meyWiz-prev").click(function(){{var b=$(this).attr("data-prevSection"),c=$("section[data-pos="+b+"]");$("section[data-pos="+(b+1)+"]")}a._render(c)})},jumpTo:function(a){this._rebuild();var b=$("section[data-pos="+a+"]");this._render(b)},_render:function(c){if("undefined"!==$.type(c.attr("data-load"))){var d=c.attr("data-load"),e=b.customFunctions[d]();if(e===!1)return!1}$(a).children("section").hide().removeClass("active"),c.show().addClass("active")},next:function(){this._rebuild();var a=parseInt($("section.active").attr("data-pos"));a+1<=b.maxSections&&this.jumpTo(a+1)},prev:function(){this._rebuild();var a=parseInt($("section.active").attr("data-pos"));a-1>=0&&this.jumpTo(a-1)}}};