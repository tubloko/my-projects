import React, {Component} from "react";

import {getGenresOfMovies, getPopularFilms, getSearchMovie} from "../movie-services";
import ShowList from "../show-list";

import './popular-movie.css';

export default class PopularMovies extends Component {

    state = {
        movies: [],
        favoritesMovies: [],
        genresId: null,
        flagId: false,
        keyWord: '',
        currentPage: 1
    }

    componentDidMount() {
        window.addEventListener('scroll',  () => {
            let scrollHeight = Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight
            );
            if (window.scrollY + 1 >= scrollHeight - window.innerHeight) {
                getPopularFilms(this.state.currentPage + 1)
                    .then((body) => {
                        const newCurrent = [...this.state.movies, ...body];
                        this.setState({
                            movies: newCurrent,
                            currentPage: this.state.currentPage + 1
                        });
                    });
                console.log(this.state.movies);
            }
        });

        getPopularFilms(this.state.currentPage)
            .then((movie) => {
                this.setState({
                    movies: movie,
                });
            });
        getGenresOfMovies().then(body => {
            this.setState({
                genresOfMovies: body.genres
            })
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.keyWord !== '') {
            getSearchMovie(this.state.keyWord)
                .then((movie) => {
                    this.setState({
                        movies: movie
                    });
                });
        }
    }

    searchMovies = (event) => {
        this.setState({
            keyWord: event.target.value
        })
    }

    filterMovies = (e) => {
        const id = e.target.value;
        if (id === this.state.genresId) {
            document.getElementById(id).className = "";
            this.setState({
                genresId: null,
                flagId: false
            })
        } else {
            if (this.state.genresId) document.getElementById(this.state.genresId).className = "";
            document.getElementById(id).className = "current";
            this.setState({
                genresId: id,
                flagId: true
            })
        }
    }

    render() {

        let currentGenre;
        if (this.state.flagId) {
            currentGenre = this.state.movies.filter(item => {
                return item.genre_ids.includes(this.state.genresId);
            });
        }

        let genresOfMovie;
        if (this.state.genresOfMovies) {
            genresOfMovie = this.state.genresOfMovies.map(({id, name}) => {
                return <li id={id} value={id} key={id}>{name}</li>
            })
        }

        return (
            <div>
                <div className='container text-center'>
                    <h2 className='popular_movie_h2'>Popular movie</h2>
                    <div className='row text-center'>
                        <div className="input-group input-group-lg">
                            <input type="text"
                                   className="form-control search-input"
                                   onChange={this.searchMovies}
                                   placeholder="search movies"/>
                        </div>
                        <div className='row'>
                            <ul onClick={this.filterMovies} className='filterList'>
                                {genresOfMovie}
                            </ul>
                        </div>
                    </div>
                    <div className='row text-center popular_movie'>
                        <ShowList propMovie={currentGenre ? currentGenre : this.state.movies}/>
                    </div>
                </div>
            </div>
        );
    }
}
