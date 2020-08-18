"use strict";
$(document).foundation();

//OMDb API Key: 58d2e622
// Superhero API Key
const api_key = "10223990622099685";

//On form submit start preloader and pull data for superhero api
function inputListener() {
    $("form").on("submit", function(e) {
        e.preventDefault();
        $('.preloader').html(`<i class="fas fa-circle-notch fa-spin"></i>`)
        $("#movie-results").empty();
        let search = $("#search").val().toLowerCase();
        pullData(search);
    });
}
//Fetch the superhero API data
function pullData(search) {
    fetch(`https://superheroapi.com/api.php/${api_key}/search/${search}`)
        .then((e) => e.json())
        .then((e) => displayResults(e))
        .catch((e) => console.log("Error: " + e));
}
// unhide movie suggestion button and display results based on filter parameters
function displayResults(e) {
    $("#movieBtn").removeClass("hidden")
    let searchResults = $(".results")
    searchResults.empty()
    const gender = $("#gender").val()
    const alignment = $('#salignment').val()

    if (e.response === 'error') {
        $("#movieBtn").addClass("hidden")
        //create error message
        const errHtml = `<div class="callout alert">
  <h5>No Character Was Found</h5>
  <p>If you need to use a legend to look up a specific character you can by referring to the link below.</p>
  <a href="https://akabab.github.io/superhero-api/api/glossary.html" target="_blank">Here is the List of All the Characters</a>
</div>`
    //add error message to search results
        searchResults.append(errHtml)


    }

    for (let i = 0; i < e.results.length; i++) {


        if (gender && gender !== e.results[i].appearance["gender"]) {
            continue;
        }

        if (alignment && alignment !== e.results[i].biography.alignment) {
            continue;
        } else if (undefined) {
            alert("No characters found!")
            $("#movieBtn").empty()
        }
        //render all HTML into .results div
        let html = `
      <div class="grid-x grid-padding-x">
        <div class="large-12 medium-12 cell">
  
          <div class="grid-x grid-padding-x">
            <div class="large-12 cell">
              <div class="primary callout">
                <ul>
                  <li>
                    <img class="character-img" src="${e.results[i].image.url}" alt="${e.results[i].name}">
                  </li>
                  <li>
                    <h2 class="character-name">${e.results[i].name}</h2>
                  </li>
                  <li>
                  <p id="character-alignment">Alignment: <strong>${e.results[i].biography.alignment}</strong></p>
                  </li>
                  <li>
                  <p>Gender: <strong>${e.results[i].appearance["gender"]}</strong></p>
                    <p>First Appearance: <strong>${e.results[i].biography["first-appearance"]}</strong></p>
                    <p>Group Affliation: <strong>${e.results[i].connections["group-affiliation"]}</strong></p>
                  </li>
                  <li>
                  <div class="custom-progress-container">
                  <h5><strong>Power Stats</strong></h5>
                  <div class="progress" role="progressbar" tabindex="0" aria-valuenow="25" aria-valuemin="0" aria-valuetext="25 percent" aria-valuemax="100">
                  <span class="progress-meter" style="width: ${e.results[i].powerstats['combat']}%">
                    <span class="progress-meter-text">Combat: ${e.results[i].powerstats['combat']}%</span>
                  </span>
                </div>
                <div class="progress" role="progressbar" tabindex="0" aria-valuenow="25" aria-valuemin="0" aria-valuetext="25 percent" aria-valuemax="100">
                  <span class="progress-meter" style="width: ${e.results[i].powerstats['durability']}%">
                    <span class="progress-meter-text">Durability: ${e.results[i].powerstats['durability']}%</span>
                  </span>
                </div>
                <div class="progress" role="progressbar" tabindex="0" aria-valuenow="25" aria-valuemin="0" aria-valuetext="25 percent" aria-valuemax="100">
                  <span class="progress-meter" style="width: ${e.results[i].powerstats['intelligence']}%">
                    <span class="progress-meter-text">Intelligence: ${e.results[i].powerstats['intelligence']}%</span>
                  </span>
                </div>
                <div class="progress" role="progressbar" tabindex="0" aria-valuenow="25" aria-valuemin="0" aria-valuetext="25 percent" aria-valuemax="100">
                  <span class="progress-meter" style="width: ${e.results[i].powerstats['power']}%">
                    <span class="progress-meter-text">Power: ${e.results[i].powerstats['power']}%</span>
                  </span>
                </div>
                <div class="progress" role="progressbar" tabindex="0" aria-valuenow="25" aria-valuemin="0" aria-valuetext="25 percent" aria-valuemax="100">
                  <span class="progress-meter" style="width: ${e.results[i].powerstats['speed']}%">
                    <span class="progress-meter-text">Speed: ${e.results[i].powerstats['speed']}%</span>
                  </span>
                </div>
                <div class="progress" role="progressbar" tabindex="0" aria-valuenow="25" aria-valuemin="0" aria-valuetext="25 percent" aria-valuemax="100">
                  <span class="progress-meter" style="width: ${e.results[i].powerstats['strength']}%">
                    <span class="progress-meter-text">Strength: ${e.results[i].powerstats['strength']}%</span>
                  </span>
                </div>
</div>
  </div>
</div>
                  </li>
               </ul>
            </div>
          </div>
  </div>
      `
        //remove the preloader
        $('.preloader').empty();
        //Append searchResults
        searchResults.append(`${html}`);
    }
}

//click #movieBtn button function event 
function inputListenerMovie() {
    $("#movieBtn").click(function(e) {
        let mSearch = $("#search").val().toLowerCase();
        //pull movie data from omdbapi.com
        pullMovieData(mSearch);
    });
}

function pullMovieData(mSearch) {
    //https://omdbapi.com/?t=title&apikey=58d2e622
    fetch(`https://www.omdbapi.com/?t=${mSearch}&apikey=58d2e622`)
        .then((m) => m.json())
        .then((m) => displayMovieResults(m))
        .catch((m) => console.log(m));
}

function displayMovieResults(m) {
    $("#movieBtn").addClass("hidden")
    $("#movie-results").empty();
    //Suggested movie title and movie poster
    $("#movie-results").append(`
<div class="grid-x grid-padding-x">
  <div class="large-12 medium-8 cell">
    <div class="grid-x grid-padding-x">
        <div class="large-12 cell">
            <div class="secondary callout">
              <h3 class="movie-title"><a href="https://www.imdb.com/title/${m.imdbID}/" target="_blank"><strong>${m.Title}</strong></a></h3>
                  <p><strong>Plot Summary:</strong> ${m.Plot}</p>
                  <p><strong>Starring Actors:</strong> ${m.Actors}</p>
                  <p><strong>Release Date:</strong> ${m.Released}</p>
                  <p><strong>imDB rating:</strong> ${m.imdbRating}</p>
                    <br>
                      <a href="https://www.imdb.com/title/${m.imdbID}/" target="_blank">
                          <img class="movie-poster" src="${m.Poster}" alt="${m.Title}"></a>
              </div>
            </div>
          </div>
      </div>
</div>`)


}

$(function() {
    inputListener();
    inputListenerMovie();

});