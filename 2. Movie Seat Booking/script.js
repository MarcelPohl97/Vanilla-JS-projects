const container = document.querySelector('.seat-container');

container.addEventListener('click', e => {
    if (
      e.target.classList.contains('seat') &&
      !e.target.classList.contains('taken')
    ) {
      e.target.classList.toggle('selection');
      update_selected_seats();
    }
  });

  const update_selected_seats = () => {
    const seats_counter = document.querySelectorAll(".selection");
    const selected_seats = document.getElementById("seat-counter");
    selected_seats.innerHTML = seats_counter.length;
  };

const movie_searcher_form = document.getElementById("movie-searcher-form")
const movie_searcher_form_animator = document.getElementById("movie-search-animate")
const movie_form_activator = document.getElementById("movie-search-input-show-hide")

movie_searcher_form_animator.addEventListener('click', () => {
  movie_searcher_form.classList.toggle("movie-animate-form");
  movie_form_activator.classList.toggle("fade");
});

const movie_btn_fetch = document.getElementById("fetch-movie")
const movie_input = document.getElementById("movie-input")

const poster = document.getElementById("poster")
const title = document.getElementById("title")
const plot = document.getElementById("plot")

movie_btn_fetch.addEventListener("click", () => {
  get_movie(movie_input.value)
});

function get_movie(movie){
  fetch(`http://www.omdbapi.com/?apikey=75046c65&t=${movie}`).then((response) => {
            return response.json();
        }).then(data => {
            poster.src = data["Poster"]
            title.innerHTML = data["Title"]
            plot.innerHTML = data["Plot"]
        }).catch((err) => {
            console.log("rejected", err);
        })  
    }
