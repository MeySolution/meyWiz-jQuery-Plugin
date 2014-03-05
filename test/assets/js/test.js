test( "check if plugin is set up properly", function() {
	equal($('.meyWiz-next').is(':visible'), true);
});

test("check if second tab can be loaded", function() {
	$('.meyWiz-next:visible').trigger('click');
	var h1Text = $('h1:visible').text();
	equal(h1Text, 'tab2');
});

test("check if the unload function triggers correct", function() {
	$('.meyWiz-next:visible').trigger('click');
	equal(onUnloadTest, 0);
});

test("check if the load function triggers correct", function() {	
	equal(onLoadTest, 1);
});

test("check if the jumpTo Function works", function() {
	$('#page').meyWiz().jumpTo(1);
	var h1Text = $('h1:visible').text();
	equal(h1Text, 'tab2');
});

test("check if the back button works", function() {
	$('.meyWiz-prev:visible').trigger('click');
	var h1Text = $('h1:visible').text();
	equal(h1Text, 'tab1');
});