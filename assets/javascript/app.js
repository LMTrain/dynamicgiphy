
  // Initial array of artists
  var artists = ['Tupac', 'Notorious B.I.G', 'Jay Z', 'Outkast', 'Nicki Minaj', 'R. Kelly', 'Beyonce', 'Aaliya'];

  // displayartistInfo function re-renders the HTML to display the appropriate content
  function displayartistInfo() {

    var artist = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + "&api_key=HEdbTT0vdsath3C9VzHnGKf0KeRx3w50&q=" + artist + "&limit=10";

    $(".gif").on("click", function () {
     
      var state = $(this).attr("data-state");
     
      if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
      } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
      }
    });

    // Creating an AJAX call for the specific artist button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Creating a div to hold the artist
        var results = response.data;
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var artistDiv = $("<div class='artist'>");
            
            var p = $("<p>").text("Rating: " + results[i].rating);
            
            var image = $("<img>");
            
            image.attr("src", results[i].images.fixed_width_small_still.url);               
                 
            artistDiv.append(image);
            
            $("#artists-view").prepend(artistDiv);
        }      
    });
  }
  // Function for displaying artist data
  function renderButtons() {

    
    $("#buttons-view").empty();

    // Looping through the array of artists
    for (var i = 0; i < artists.length; i++) {

      
      var a = $("<button>");
      
      a.addClass("artist-btn");
      
      a.attr("data-name", artists[i]);
      
      a.text(artists[i]);
     
      $("#buttons-view").append(a);
    }
  }

  
  $("#add-artist").on("click", function(event) {
    event.preventDefault();
    var artist = $("#artist-input").val().trim();
    artists.push(artist);
   
    renderButtons();
  });
  
  $(document).on("click", ".artist-btn", displayartistInfo);
 
  renderButtons();
