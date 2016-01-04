$(document).ready(function() {




  $('.addUser').on('click', function() {
    $.ajax({
      type: "POST",
      url: "http://art-share.herokuapp.com/api/v1/users/",
      data:{
        user: {
          fname: "Gob5",
          lname: "Bluth5",
          password: "testpass",
          email: "gob5@example.com"
        }
      },
      success: function(response) {
        // console.log(response);
        var user = response.result;
        $('.allUsers').append("<li>" + user.id + " " + user.email + ": " + user.fname + " " + user.lname + "<button class='deleteUser' data-id='" + user.id + "'>delete</button></li>");
      }
    });
  });

  $.ajax({
    type: "GET",
    url: "http://art-share.herokuapp.com/api/v1/users/",
    success: function(response) {
      // console.log(response);
      var allUsers = response.result;

      for(var i = 0; i < allUsers.length; i++) {
        var user = allUsers[i];
        $('.allUsers').append("<li>" + user.id + " " + user.email + ": " + user.fname + " " + user.lname + "<button class='deleteUser' data-id='" + user.id + "'>delete</button></li>");
      }
    },
    error: function(response) {
      $('.error').text("Something went wrong " + response.responseText);
    }
  });

  $(document).on('click', '.deleteUser', function(event) {
    var id = $(event.target).data('id');
    $.ajax({
      type: "DELETE",
      url: "http://art-share.herokuapp.com/api/v1/users/" + id,
      success: function(response) {
        // Find the user <li> in the list and hide it
        $('[data-id=' + id + ']').parent().hide();

        // Or, rerender the whole list

        //$('.allUsers').html('');
        //
        // $.ajax({
        //   type: "GET",
        //   url: "http://art-share.herokuapp.com/api/v1/users/",
        //   success: function(response) {
        //     // console.log(response);
        //     var allUsers = response.result;
        //
        //     for(var i = 0; i < allUsers.length; i++) {
        //       var user = allUsers[i];
        //       $('.allUsers').append("<li>" + user.id + " " + user.email + ": " + user.fname + " " + user.lname + "<button class='deleteUser' data-id='" + user.id + "'>delete</button></li>");
        //     }
        //   },
        //   error: function(response) {
        //     $('.error').text("Something went wrong " + response.responseText);
        //   }
        // });
      }
    });
  });

  //
  // returnUsers(function(response) {
  //   console.log(response);
  //   console.log(response.result[0].email);
  //   var allUsers = response.result;
  //
  //   for(var i = 0; i < allUsers.length; i++) {
  //     var user = allUsers[i];
  //     $('.allUsers').append("<li>" + user.email + ": " + user.fname + " " + user.lname + "</li>");
  //   }
  // });






});



// $.ajax({
//   type: "GET",
//   url: "http://nycda.com/",
//   success: function(response) {
//     console.log(response);
//   }
// });
//
//
//
// var person = {
//   firstName: 'lucille',
//   lastName: 'bluth',
//   combinedName: 'bluth Lucille',
//   someBehavior: function() {
//     var sum = 1 + 1;
//     console.log(sum + ' woo!');
//   },
//   coolNumber: 999,
//   aListOfThings: [1, 2, 3, 4],
//   nestedObject: {
//     pizza: 'great',
//     toppings: {
//       roni: 'lots, please'
//     }
//   },
//   "height": 12,
// };
//
// // console.log(person);
//
// var json = JSON.stringify(person);
// // console.log(json);
//
// var newObject = JSON.parse(json);
// // console.log(newObject);
