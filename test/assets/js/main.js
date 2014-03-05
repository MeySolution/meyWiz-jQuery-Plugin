var onLoadTest = 0;
var onUnloadTest = 1;
$(document).ready(function() {
	$('#page').meyWiz().init({
		onLoad: function() {
			onLoadTest = 1;
			return true;
		},
		onUnload: function() {
			onUnloadTest = 0;
			return true;
		}
	});
});