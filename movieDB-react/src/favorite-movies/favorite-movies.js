import React, { Component } from "react";
import { Link } from "react-router-dom";

import { getMovieDetails } from "../movie-services";
import ShowList from "../show-list";


export default class FavoriteMovies extends Component {

    state = {
        data: []
    }

    componentDidMount() {
        const listId = this.props.addFavorite;
        listId.map(id => getMovieDetails(id).then(({title, poster_path, vote_count, id}) => {
            this.setState(( { data } ) => {
                data.push({title,poster_path,vote_count, id});
                return {
                    data,
                }
            })
        }));
    };

    render() {
        return (
            <div>
                <Link to='/'><button className='btn' style={{border: 'none', color: 'white'}}>BACK</button></Link>
                <div>
                    <div className='container'>
                        <div className='row text-center'>
                            <h2>Favorite Movies</h2>
                        </div>
                        <div className='row text-center'>
                            <ShowList propMovie={this.state.data} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}