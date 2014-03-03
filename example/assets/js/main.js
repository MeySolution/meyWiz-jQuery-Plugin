setLs = function(name, val) {
	window.localStorage.setItem(name, val);
}

getLs = function(name) {
	return window.localStorage.getItem(name);
}
$(document).ready(function() {
	$('#page').meyWiz().init({
		storeSelfStrategy: function() {
			var data = $('input[name="selfText[strategy]"]:checked').val();
			if(typeof data === 'undefined') {
				alert('Fill some data!');
				return false;
			}
			setLs('selfCheck[strategy]', data);
			return true;
		}
	});
});