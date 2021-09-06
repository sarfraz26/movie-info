$(document).ready(function(){
    $('#searchForm').on('submit', function(e){
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    axios.get('https://www.omdbapi.com/?i=tt3896198&apikey=fa3edf0c&s=' + searchText)
    .then(function(response){
        let movies = response.data.Search;
        let output = '';
        $.each(movies, function(index, movie){
            output += `
                <div class="col-md-3">
                    <div class="card text-center">
                        <img src="${movie.Poster}">
                        <h5>${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                </div>
            `;
        });
        $('#movies').html(output);
    })
    .catch(function(err){
        console.log(err);
    });
}
function movieSelected(id){
    sessionStorage.setItem('movieID', id);
    window.location = 'movie.html';
    return false;
}
function getMovie(){
    let movieId = sessionStorage.getItem('movieID');
    axios.get('http://www.omdbapi.com/?apikey=fa3edf0c&i=' + movieId)
    .then(function(response){
        console.log(response);
        let movie = response.data;        
        let output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">           
                </div>
                <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                        <li class="list-group-item"><strong>Type:</strong> ${movie.Type}</li>
                        <li class="list-group-item"><strong>Rating:</strong> ${movie.imdbRating}</li>
                        <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                        <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                        <li class="list-group-item"><strong>Cast:</strong> ${movie.Actors}</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="card">
                    <h3>Plot</h3>
                    ${movie.Plot}
                    <hr>
                    <div class="row">
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View on IMDB</a>
                        <a href="index.html" class="btn btn-default">Go Back To Search</a>
                    </div>
                </div>
            </div>
        `;
        $('#movie').html(output);
    })
    .catch(function(err){
        console.log(err);
    });
}
