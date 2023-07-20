const apiKey = 'a998ffedb0e4da752e40c0d3ad4e01fa';
const apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`;
const imgPath= 'https://image.tmdb.org/t/p/w1280';
const searchApi=`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query"`;

const popular = document.getElementById('');
const topRated = document.getElementById('');
const upcoming = document.getElementById('');
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const next = document.getElementById('nextPage');
const previous = document.getElementById('previousPage');

// create counter page
let page = 1;
// Get initial movies
getMovies(apiUrl);

async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}

function showMovies(movies){
    main.innerHTML='';
    movies.forEach((movie) =>{
        const {title, poster_path, vote_average, overview} = movie;
        
        const movieEl = document.createElement('div');
        
        movieEl.classList.add('movie');
        
        movieEl.innerHTML= `
        <img src="${imgPath + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3 class="movie-title">${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            <p>${overview}</p>
        </div>
        `;
        main.appendChild(movieEl);
    });
}

function getClassByRate(vote){
    if(vote > 8){
        return 'green';
    } else if(vote > 4) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm && searchTerm !== ''){
        getMovies(searchApi + searchTerm);
        search.value = '';
    }else{
        window.location.reload();
    }
});

function changePage(pageNumber){
    if(page>pageNumber){
        page=pageNumber;

    }
}