import React, { Component } from 'react';
import { Link } from "react-router-dom";

import ShowList from "../show-list";
import Spinner from "../spinner";
import { getMovieDetails, getSimilarMovies } from "../movie-services";

import './get-movie-detail.css';
import Iframe from "../iframe";

export default class ShowMovieDetail extends Component {

    state = {
        movieDetail: [],
        similarMovies: [],
        favoritesMovies: [],
        load: false,
        loadingSimilar: false,
    }

    componentDidMount() {
        const id = parseInt(this.props.id.slice(3));
        getMovieDetails(id).then(body => {
            this.setState({
                movieDetail: body,
                load: true
            });
        });

        getSimilarMovies(id).then(body => {
            setTimeout(() => {
                this.setState({
                    similarMovies: body.results,
                    loadingSimilar: true
                })
            }, 1000);
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.id === this.props.id) {
            return;
        } else {
            const id = parseInt(this.props.id.slice(3));
            getMovieDetails(id).then(body => {
                this.setState({
                    movieDetail: body,
                    load: true
                });
            });

            getSimilarMovies(id).then(body => {
                this.setState({
                    similarMovies: body.results,
                    loadingSimilar: true
                })
            });
        }
    }

    saveFavorites = () => {
        const id = parseInt(this.props.id.slice(3));
        return this.props.addFavorite(id);
    }

    render() {
        const {budget, genres, original_title, overview,poster_path,
                 runtime, id, release_date} = this.state.movieDetail;
        const imageURL = "https://image.tmdb.org/t/p/w500_and_h282_face";
        const money = Number(budget).toLocaleString();
        const toggle = this.props.deleteMovie.includes(id) ? 'Delete' : 'Add to favorite';
        let genre = [];
        if (genres) genre = genres.map( ({id, name}) => <span key={id}>{name}, </span>);

        let show;
        if (this.state.loadingSimilar) {
            show = <ShowList propMovie={this.state.similarMovies} />
        }

        return (
            <div>
                <div className='container'>
                    <div className='row text-center'>
                        <div className='col-md-12 col-lg-12 original_title'>
                            {original_title}
                        </div>
                    </div>
                    <div className='row info'>
                        <div className='col-lg-6 col-md-6 col-sm-12 ml-auto'>
                            <Link to='/'><button className='btn back'>BACK</button></Link>
                            <img src={imageURL + poster_path} alt="image" className='img-fluid' />
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-12 ml-auto overview'>
                            <h4>Overview</h4>
                            <div>{overview}</div>

                            <div className='release'>Release data: {release_date}</div>
                            <div>Runtime: {runtime}</div>
                            <div>Budget: {money}</div>
                            <div>Genres: {genre}</div>
                        </div>
                    </div>
                    <div className='row'>
                        {/*<button onClick={this.showVideo} className='btn trailer' >Show trailer</button>*/}
                        <div className='col-md-4 col-lg-4 col-sm-12'>
                            <button onClick={this.saveFavorites} className='btn toggle' >{toggle}</button>
                            <Link to='/favoriteMovies'><button className='btn favorite'>Favorites</button></Link>
                        </div>
                        <div className='col-lg-8 col-md-8 col-sm-12'>
                            <Iframe value={id}/>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className='row similar'>
                        <h3><em> <span className='simil'>Similar</span>  Movies</em></h3>
                    </div>
                    <div className='row similar_movies'>
                        {this.state.loadingSimilar ? show : <Spinner />}
                    </div>
                </div>
            </div>
        );
    }
}
