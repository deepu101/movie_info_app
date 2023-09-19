const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movie-container");
const inputBox = document.querySelector(".inputBox");
const movieDetails = document.querySelector("movie-details");


//Function to fetch movie details using OMDB API
const getMovieInfo = async (movie) => {
  try {
  const myApiKey = "3a116e8"; // your api key
  const url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`; // api url data

  const response = await fetch(url); // fetch method use to convert  your server data inot json and xml ...
  const data = await response.json(); // json form convert your api data ..
  //  console.log(data);
  showMoviesData(data);
  }
  catch(error){
   showErrorMesseage("Your Movie is Not Found !!!")


  }
};
    // Function to show movie data on screen  
    const showMoviesData = (data)=>{
      movieContainer.innerHTML = " ";
      movieContainer.classList.remove("noneBackground");
  // Use Destructring  assigement to extract properties form data object
     const {Title, imdbRating, Genre, Released, Runtime, Actors, plot, Poster} = data;
      
     const movieElement = document.createElement('div');
     movieElement.classList.add('movie-info');
     movieElement.innerHTML = `<h2>${Title}</h2> 
                               <p><strong>Rating: &#11088;</strong>${imdbRating}</P>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

      Genre.split(",").forEach(element => {
          const p = document.createElement('p')
          p.innerText= element;
          movieGenreElement.appendChild(p);
        
      });

      movieElement.appendChild(movieGenreElement);
      movieElement.innerHTML += ` <p><strong>Released Date: </strong>${Released}</P>
                                  <p><strong>Duration: </strong>${Runtime}</P>
                                  <p><strong>Cast: </strong>${Actors}</P>
                                  <p><strong>Plot: </strong>${plot}</P>`
 

      // creating a div for movie poster/.........
      const moviePosterElement = document.createElement ('div');
      moviePosterElement.classList.add('movie-poster');
     moviePosterElement.innerHTML = `<img src="${Poster}" />`

     movieContainer.appendChild(moviePosterElement);
     movieContainer.appendChild(movieElement);

}
//function to display error message
const showErrorMesseage =(messeage)=>{
  movieContainer.innerHTML = `<h2>${messeage}</h2>`
  movieContainer.classList.add("noneBackground");
}



//Adding event listener to search form
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const movieName = inputBox.value.trim();
  if (movieName !== "") {
    showErrorMesseage("Searching Your Movie Information .....")
    getMovieInfo(movieName);
  }else{
     showErrorMesseage("Movie ka Naam toh likh chutiya");
  }
});
