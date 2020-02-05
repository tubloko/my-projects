const getPopularFilms = async (page) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=cd046006b327b84370dbdbf9ae25abfc&language=en-US&page=${page}`);
    const data = await response.json();

    return data.results;
};

const getSearchMovie = async (str) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=cd046006b327b84370dbdbf9ae25abfc&language=en-US&query=${str}&page=1&include_adult=false`);
    const data = await response.json();

    return data.results;
};
const getMovieDetails = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=cd046006b327b84370dbdbf9ae25abfc&language=en-US`);
    return await response.json();
};
const getSimilarMovies = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=cd046006b327b84370dbdbf9ae25abfc&language=en-US&page=1`);
    return await response.json();
};
const getGenresOfMovies = async (id) => {
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=cd046006b327b84370dbdbf9ae25abfc&language=en-US');
    const data = await response.json();

    return data;
}
const getFrame = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=cd046006b327b84370dbdbf9ae25abfc&language=en-US`);
    const data = await response.json();
    console.log(data);
    return data;
}
export {
    getPopularFilms,
    getSearchMovie,
    getSimilarMovies,
    getMovieDetails,
    getGenresOfMovies,
    getFrame
};



//https://api.themoviedb.org/3/movie/MOVIE_ID/similar?api_key=cd046006b327b84370dbdbf9ae25abfc&language=en-US&page=1