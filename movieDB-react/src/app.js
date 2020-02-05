import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import PopularMovies from "./popular-movies";
import ShowMovieDetail from "./get-movie-detail";
import FavoriteMovies from "./favorite-movies";

class App extends Component {

    state = {
        idFavorite: [],
    }

    addToFavorites = (id) => {
        this.setState(() => {
            let newMovie = this.state.idFavorite;
            if (newMovie.includes(id)) {
                newMovie.splice(newMovie.indexOf(id), 1);
            } else {
                newMovie.push(id);
            }
            return {
                idFavorite: newMovie
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Wel <span className='come'>come</span></h1>
                <Router>
                    <Route path="/" exact
                           render={() => < PopularMovies
                               showMovieDetails={this.showMovieDetails}/>}/>
                    <Route path={'/movieDetail/:id'}
                           render={({match}) => {
                               const {id} = match.params;
                               return <ShowMovieDetail id={id}
                                                       addFavorite={this.addToFavorites}
                                                       deleteMovie={this.state.idFavorite}/>}}/>
                    <Route
                        path="/favoriteMovies/"
                        render={() => <FavoriteMovies addFavorite={this.state.idFavorite}/>}/>
                </Router>
            </div>
        );
    }
}

export default App;