// Domain Objects
var User = {
  init: function(props) {
    this.fname = props.fname;
    this.lname = props.lname;
    this.email = props.email;
    this.password = props.password;
    this.id = props.id;
    return this;
  },

  logInfo: function() {
    return this.id + " " + this.email + this.fname + " " + this.lname;
  },

  toJSON: function() {
    return {
      fname: this.fname,
      lname: this.lname,
      email: this.email,
      password: this.password
    }
  }
}

var Painting = {
  init: function(props) {
    this.name = props.name;
    this.image_url = props.image_url;
    this.id = props.id;
    return this;
  },

  toJSON: function() {
    return {
      name: this.name,
      image_url: this.image_url
    }
  }
}

// Current User
var currentUser = null;

$(document).ready(function() {

  // Create a new user.
  $('#add-user').on('submit', function(event) {
    event.preventDefault();

    var userParams = {
      fname: $('#new-user-fname').val(),
      lname: $('#new-user-lname').val(),
      email: $('#new-user-email').val(),
      password: $('#new-user-password').val()
    }
    var user = User.init(userParams);

    $.ajax({
      type: "POST",
      url: "http://art-share.herokuapp.com/api/v1/users/",
      data:{
        user: user.toJSON()
      },
      success: function(response) {
        var user = User.init(response.result);
        $('.all-users').prepend("<li>" + user.logInfo() + "<button class='deleteUser' data-id='" + user.id + "'>delete</button></li>");
      }
    });

    $(event.target)[0].reset();
  });

  // Fetch all users.
  $.ajax({
    type: "GET",
    url: "http://art-share.herokuapp.com/api/v1/users/",
    success: function(response) {
      var allUsers = response.result.reverse();

      for(var i = 0; i < allUsers.length; i++) {
        var user = User.init(allUsers[i]);
        $('.all-users').append("<li>" + user.logInfo() + "<button class='deleteUser' data-id='" + user.id + "'>delete</button></li>");
      }
    },
    error: function(response) {
      $('.error').text("Something went wrong " + response.responseText);
    }
  });

  // Destroy user.
  $(document).on('click', '.deleteUser', function(event) {
    var id = $(event.target).data('id');
    $.ajax({
      type: "DELETE",
      url: "http://art-share.herokuapp.com/api/v1/users/" + id,
      success: function(response) {
        // Find the user <li> in the list and hide it
        $('[data-id=' + id + ']').parent().hide();
      }
    });
  });

  // Sign in
  $(document).on('submit', '#sign-in', function(event) {
    event.preventDefault();
    var email = $('#login-email').val();
    var password = $('#login-password').val();

    $.ajax({
      type: 'POST',
      url: 'http://art-share.herokuapp.com/api/v1/sessions/new',
      data: {
        email: email,
        password: password
      }
    }).success(function(response) {
      var user = User.init(response.result);

      // Set global current user.
      currentUser = user;

      $('.current-user-info').text(currentUser.logInfo());
    });
  });

  // Get current user's pantings.
  $(document).on('click', '#get-current-paintings', function() {
    $.ajax({
      type: 'GET',
      url: 'http://art-share.herokuapp.com/api/v1/users/' + currentUser.id + '/paintings/'
    }).success(function(response) {

      var paintings = response.result;

      for (var i = 0; i < paintings.length; i++) {
        var painting = Painting.init(paintings[i]);
        $('.paintings').append("<div class='image' data-id='" + painting.id + "'><img alt='" + painting.name + "' src='" + painting.image_url + "' /></div>");
      }

    }).error(function(response) {
      console.log('error: ', response);
    });
  });

  // Add painting.
  $(document).on('submit', '#add-painting', function(event) {
    event.preventDefault();

    var paintingParams = {
      name: $('#painting-name').val(),
      image_url: $('#painting-url').val()
    };

    var painting = Painting.init(paintingParams);

    $.ajax({
      type: 'POST',
      url: 'http://art-share.herokuapp.com/api/v1/users/' + currentUser.id + '/paintings/',
      data: {
        painting: painting.toJSON()
      }
    }).success(function(response) {

    }).error(function(error) {
      console.log('Error: ', error);
    });

    $(event.target)[0].reset();
  });
});
