function addMoviestoDom(movies) {
  movies.forEach((movie) => {
    const newLi = document.createElement("li");
    const newA = document.createElement("a");
    const newImg = document.createElement("img");
    newImg.src = movie.Poster;
    newA.href = `https://www.imdb.com/title/${movie.imdbID}`;
    newA.setAttribute("target", "_blank");
    moviedatabase.appendChild(newLi);
    newLi.appendChild(newA);
    newA.appendChild(newImg);
  });
}

addMoviestoDom(movies);

function removePreviousMovies() {
  document.getElementById("nothingfound").innerHTML = "";
  const movieList = document.getElementById("moviedatabase");
  let removeMovies = movieList.lastElementChild;
  while (removeMovies) {
    movieList.removeChild(removeMovies);
    removeMovies = movieList.lastElementChild;
  }
}

const newestMovies = document
  .getElementsByName("filmfilters")
  .forEach((filter) => {
    filter.addEventListener("change", function handleOnChangeEvent(event) {
      document.getElementById("textfield").value = "";
      removePreviousMovies();

      if (event.target.value === "allefilms") {
        addMoviestoDom(movies);
      } else if (event.target.value === "newestmovies") {
        const filterLatestMovies = movies.filter(
          (movies) => movies.Year >= 2014
        );
        addMoviestoDom(filterLatestMovies);
      } else {
        const title =
          event.target.value[0].toUpperCase() + event.target.value.slice(1);
        const filteredMovies = movies.filter((movies) =>
          movies.Title.includes(title)
        );
        addMoviestoDom(filteredMovies);
      }
    });
  });

function getValue() {
  if (event.keyCode == 13) {
    removePreviousMovies();
    const title =
      event.target.value[0].toUpperCase() + event.target.value.slice(1);
    const filteredMovies = movies.filter((movies) =>
      movies.Title.includes(title)
    );
    if (filteredMovies.length === 0) {
      document.getElementById("nothingfound").innerHTML = "Helaas!! niets gevonden";
    } else {
      addMoviestoDom(filteredMovies);
    }
  }
}