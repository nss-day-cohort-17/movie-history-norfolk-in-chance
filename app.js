
var currentMovie;
var currentView;
var flag;

// ---------- NAV EVENTLISTENERS --------------

$(".logout").click(homeView);

$("#home").click(homeView);


$("#new-movies").click(function () {
  $(".myList-view").addClass("hide");
  $(".recentlyWatched-view").addClass("hide");
  $(".home-view").addClass("hide");
  $(".search-view").removeClass("hide");
  $(".heading h1").html("Search Movies")
});


$("#myList").click(function () {
    //ajaxCall(`https://movie-history-2c05c.firebaseio.com/${userID}/myList-view.json`, "json", "GET", yourMovies);
  $.getJSON(`https://movie-history-2c05c.firebaseio.com/${userID}/myList-view.json`).then(yourMovies);
  $(".myList-view").removeClass("hide");
  $(".search-view").addClass("hide");
  $(".home-view").addClass("hide");
  $(".recentlyWatched-view").addClass("hide");
  $(".heading h1").html("My List")
  flag = true;
});

$('#recentlyWatched').click(function(){
  //ajaxCall(`https://movie-history-2c05c.firebaseio.com/${userID}/recentlyWatched-view.json`, "json", "GET", yourMovies);
  $.getJSON(`https://movie-history-2c05c.firebaseio.com/${userID}/recentlyWatched-view.json`).then(yourMovies);
  $(".myList-view").addClass("hide");
  $(".search-view").addClass("hide");
  $(".home-view").addClass("hide");
  $(".recentlyWatched-view").removeClass("hide");
  $(".heading h1").html("Recently Watched")
  flag = false;
});



// ---------- HELPER FUNCTIONS --------------


function homeView () {
  $(".home").removeClass("hide");
  $(".myList-view").addClass("hide");
  $(".recentlyWatched-view").addClass("hide");
  $(".search-view").addClass("hide");
  $(".heading h1").html("Movie History")
}

function addListenersToSearchView() {

  $("#addToMyList").click(function () {
    console.log("it worked");
    //ajaxCall(`https://movie-history-2c05c.firebaseio.com/${userID}/myList-view.json`, "json", "POST", nothing, JSON.stringify(currentMovie, ["Title", "Year", "Actors", "Plot", "Poster"]));
    $.post(`https://movie-history-2c05c.firebaseio.com/${userID}/myList-view.json`, JSON.stringify(currentMovie, ["Title", "Year", "Actors", "Plot", "Poster"]));
    //$(".search-result-view #addToMyList").addClass(" btn-success")
    $("body").append(`<div class="alert alert-success notifications" role="alert">
  <strong>You successfully added ${currentMovie.Title} to Your List</strong>
</div>`);
    $(".notifications").fadeOut(2500)
  });

    $("#addToRecentlyWatched").click(function (e) {
      console.log("it worked recently watched");
      //ajaxCall(`https://movie-history-2c05c.firebaseio.com/${userID}/recentlyWatched-view.json`, "json", "POST", nothing, JSON.stringify(currentMovie, ["Title", "Year", "Actors", "Plot", "Poster"]));
      $.post(`https://movie-history-2c05c.firebaseio.com/${userID}/recentlyWatched-view.json`, JSON.stringify(currentMovie, ["Title", "Year", "Actors", "Plot", "Poster"]));
      $("body").append(`<div class="alert alert-success notifications" role="alert">
        <strong>You successfully added ${currentMovie.Title} to Your Recently Watched List</strong>
        </div>`);
        $(".notifications").fadeOut(2500)
    });
};

function addListenersToListViews() {

  //$("#readPlot").click(function () {
  //  console.log("it worked plot");
  //  //ajaxCall("https://movie-history-2c05c.firebaseio.com/myList-view.json", "json", "POST", nothing, JSON.stringify(currentMovie, ["Title", "Year", "Actors", "Plot", "Poster"]));
  //});

  $("#removeMovie").click(function () {
    console.log("it worked remove");
    //ajaxCall("https://movie-history-2c05c.firebaseio.com/recentlyWatched-view.json", "json", "POST", nothing, JSON.stringify(currentMovie, ["Title", "Year", "Actors", "Plot", "Poster"]));
  });
};


function getMovieData(data) {
  currentMovie = data;
  $("#userInput").val("");
  $(".search-result-view").html(`
                                <img src="${data.Poster}" alt="movie cover image">
                                <h2>${data.Title}</h2>
                                <h3>${data.Year}</h3>
                                <h4>${data.Actors}</h4>
                                <h5>IMDB Rating: ${data.imdbRating}</h5>
                                <p>${data.Plot}</p>
                                <button class="btn-list btn-add" id="addToMyList">+ My List</button>
                                <button class="btn-list btn-add" id="addToRecentlyWatched">+ Recently Watched</button>
                              `);
  addListenersToSearchView();
}


function yourMovies(data) {
  if (flag) {
    currentView = "myList-view";
  } else {
    currentView = "recentlyWatched-view";
  }
    //console.log(data);
    $(`.${currentView}`).empty();
    Object.keys(data).forEach(function (id, i) {
        //console.log(data[id]);

        $(`.${currentView}`).append(`<div class="card col-md-4 col-lg-3">
                                    <img class="img-responsive card-img-top center-block" src="${data[id].Poster}" alt="${data[id].Title}">
                                    <div class="card-block">
                                    <h3 class="card-title">${data[id].Title}</h4>
                <button type="button" class="btn-list btn-primary" data-toggle="modal" data-target=".bs-example-modal-lg${i}">More Info</button>

                <div class="modal fade bs-example-modal-lg${i}" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
                    <div class="modal-dialog modal-lg" id="${i}" role="document">
                        <div class="modal-content">
                            <h4 class="text-center">${data[id].Title}</h4>
                            <img src="${data[id].Poster}" class="img-responsive center-block" alt="">
                            <p class="text-center">${data[id].Year}</p>
                             <p class="text-center">${data[id].Actors}</p>
                           <p>${data[id].Plot}</p>
                        </div>
                     </div>
                </div>
                <button type="button" class="btn-list btn-danger removeMovie">Remove</button>
            </div>
        </div>
        `);


    });

    addListenersToListViews()
    removeCard(data)
}


// ---------- CARD EVENTLISTENERS --------------


$("#searchBtn").click(function() {
  //ajaxCall(`http://www.omdbapi.com/?t=${$("#userInput").val()}&y=&plot=full&r=json`, "GET")
  $.getJSON(`http://www.omdbapi.com/?t=${$("#userInput").val()}&y=&plot=full&r=json`)
    .then(getMovieData)
    .then(() => {
      $(".search-result-view").removeClass("hide");
    })
});

function removeCard(data){
    var keyToDelete;

    $('.removeMovie').click(function(e) {
        var divToRemove = e.target.closest(".card")
        var titleTarget = $(divToRemove).find('.card-title')[0].innerHTML
        console.log(titleTarget, divToRemove);
        divToRemove.remove();
        keyToDelete = _.findKey(data, ['Title', titleTarget]);
        console.log(keyToDelete);

        $.ajax({
        url        : `https://movie-history-2c05c.firebaseio.com/${userID}/${currentView}/${keyToDelete}/.json`,
        datatype   : "json",
        type       : "DELETE",
      });
        //ajaxCall(`https://movie-history-2c05c.firebaseio.com/${userID}/${currentView}/${keyToDelete}/.json`, "json", "DELETE", nothing)
    })
};

$('#myModal').modal('hide');
$('body').removeClass('modal-open');
$('.modal-backdrop').remove();