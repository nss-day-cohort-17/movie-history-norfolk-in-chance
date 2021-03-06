var target;
var userID;

firebase.initializeApp({
  apiKey: "AIzaSyACP9Q8jHRH6ALMPF7B0CLED8Ph3gUJB_A",
  authDomain: "movie-history-2c05c.firebaseapp.com",
  databaseURL: "https://movie-history-2c05c.firebaseio.com",
  storageBucket: "movie-history-2c05c.appspot.com",
  messagingSenderId: "887772130666"
});


firebase.auth().onAuthStateChanged(() => {
  if(firebase.auth().currentUser) {
    userID = firebase.auth().currentUser.uid;
    console.log(firebase.auth().currentUser);
    console.log("logged in");
    $(".register").addClass("hidden");
    $(".login").addClass("hidden");
    $(".nav-link").hide().removeClass("hidden").delay(2000).slideDown("slow");
    $(".logout").hide().removeClass("hidden").delay(2000).slideDown("slow");

  } else {
    console.log("logged out");
    $(".register").hide().removeClass("hidden").delay(700).slideDown("slow");
    $(".login").hide().removeClass("hidden").delay(700).slideDown("slow");
    $(".nav-link").addClass("hidden");
    $(".logout").addClass("hidden");
  }
});


function doAuth() {
  var email = $("#uLogin").val();
  var password = $("#uPassword").val();

  if (target === "register") {
    firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(clearlogin)
            .then(authSuccess)
            .catch(handleAuthErrors);
  } else {
    firebase.auth().signInWithEmailAndPassword(email, password)
            .then(clearlogin)
            .then(authSuccess)
            .catch(handleAuthErrors);
  }
};


function doLogout () {
  firebase.auth().signOut()
}


function clearlogin() {
  $("#loginForm").trigger("reset");
}


function handleAuthErrors(error) {
  //alert(error.message)

  var button = $('.modal-footer button');
  var title = $('.modal-title');
  var progress = $('.progress');
  var progressBar = $('.progress-bar');

  button.hide();

  progress.show();

  progressBar.animate({ width: "100%" }, 100);
  progressBar.css("background-color", "#d9534f");
  $(".modal-user").css("border-color", "#d9534f");
  $(".input-group-addon").css("background", "#d9534f");


  progress.fadeOut(1200);

  button.text("Try Again!")
        .removeClass("btn-primary")
        .addClass("btn-danger")
        .blur()
        .delay(1200)
        .fadeIn(function () {
          title.text(error.message);
          //button.attr("data-dismiss", "modal");
          progressBar.css({ "width": "0%" });

        })
  button
    .fadeIn(1200)
    .removeClass("btn-danger")
    .addClass("btn-primary")

};


$(".logout").click(doLogout);
$('.modal-footer button').click(doAuth)
                       //.then(clearlogin)
                       //.then(authSuccess)
                       //.catch(handleAuthErrors);
                       //.WHY(disNoWork?!)


function authSuccess() {
  var button = $('.modal-footer button');

  if (button.attr("data-dismiss") != "modal") {
    var inputs = $('form input');
    var title = $('.modal-title');
    var progress = $('.progress');
    var progressBar = $('.progress-bar');

    button.off("click");

    inputs.attr("disabled", "disabled");
    inputs.addClass("hidden");

    button.hide();

    progress.show();
    progressBar.css("background-color", "#5cb85c");
    progressBar.animate({ width: "100%" }, 100)
    progressBar.css("background-color", "#5cb85c");
    $(".modal-user").css("border-color", "#5cb85c");
    $(".input-group-addon").css("background", "#5cb85c");

    progress.fadeOut(1200);

    button.removeClass("btn-primary")
          .addClass("btn-success")
          .blur()
          .delay(1200)
          .fadeIn(function () {
            button.text("Enjoy!");
            title.text("Welcome!");
            button.attr("data-dismiss", "modal");

          })
          .delay(700)
          .fadeOut(function () {
            $('#myModal').modal('hide');

          });
  }

};


$('#myModal').on('hidden.bs.modal', function (e) {
  var inputs = $('form input');
  var title = $('.modal-title');
  var progressBar = $('.progress-bar');
  var button = $('.modal-footer button');

  inputs.removeAttr("disabled");
  inputs.removeClass("hidden");

  progressBar.css({ "width": "0%" });
  $(".modal-user").css("border-color", "#3276B1");
  $(".input-group-addon").css("background", "#3276B1");
  button.removeClass("btn-success")
        .addClass("btn-primary")
        .text("Submit")
        .removeAttr("data-dismiss")
        .css("display", "block")
        .click(doAuth);

});


$("#myModal").on("show.bs.modal", function (event) {
  var btnClick = $(event.relatedTarget);
  target = btnClick.data("whatever");
  if(target === "login") {
    $('.modal-title').text("Login");
  } else
    $('.modal-title').text("Register Now!");
  clearlogin();
});
