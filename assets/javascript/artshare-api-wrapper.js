var returnUsers = function(callback) {
	var onSuccess = callback || function(response) { console.log(response) };

	$.ajax({
		type: 'GET',
		url: 'http://art-share.herokuapp.com/api/v1/users/'
	}).success(function(response) {
		onSuccess(response);
	}).error(function(error) {
		console.log('error msg: ', error);
	});
};

var createUser = function(fname, lname, password, email, callback) {
	var onSuccess = callback || function(response) { console.log(response) };

	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: 'http://art-share.herokuapp.com/api/v1/users/',
		data: {
			user: {
				fname: fname,
				lname: lname,
				password: password,
				email: email
			}
		}
	}).success(function(response) {
		onSuccess(response);
	});
};

var loginUser = function(email, password, callback) {
	var onSuccess = callback || function(response) { console.log(response) };

	$.ajax({
		type: 'POST',
		url: 'http://art-share.herokuapp.com/api/v1/sessions/new',
		data: {
			email: email,
			password: password
		}
	}).success(function(response) {
		onSuccess(response);
	});
};

var getCurrentUser = function(callback) {
	var onSuccess = callback || function(response) { console.log(response) };

	$.ajax({
		type: 'GET',
		dataType: 'json',
		url: 'http://art-share.herokuapp.com/api/v1/sessions/'
	}).success(function(response){
		onSuccess(response);
	});
};

var addPainting = function(userId, url, imageName, callback) {
	var onSuccess = callback || function(response) { console.log(response) };

	$.ajax({
		type: 'POST',
		url: 'http://art-share.herokuapp.com/api/v1/users/' + userId + '/paintings/',
		data: {
			painting: {
				image_url: url,
				name: imageName
			}
		}
	}).success(function(response) {
		onSuccess(response);
	}).error(function(error) {
		console.log('Error: ', error);
	});
};

var listAllPaintings = function(userId, callback) {
	var onSuccess = callback || function(response) { console.log(response) };

	$.ajax({
		type: 'GET',
		url: 'http://art-share.herokuapp.com/api/v1/users/' + userId + '/paintings/'
	}).success(function(response) {
		onSuccess(response);
	}).error(function(response) {
		console.log('error: ', response);
	});
};

var deletePainting = function(userId, paintingId, callback) {
	var onSuccess = callback || function(response) { console.log(response) };

	$.ajax({
		type: 'DELETE',
		url: 'http://art-share.herokuapp.com/api/v1/users/' + userId + '/paintings/' + paintingId
	}).success(function(response) {
		onSuccess(response);
	});
};

var deleteUser = function(userId, callback) {
	var onSuccess = callback || function(response) { console.log(response) };

	$.ajax({
		type: 'DELETE',
		url: 'http://art-share.herokuapp.com/api/v1/users/' + userId
	}).success(function(response) {
		callback(response);
	});
};
