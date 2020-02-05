import React, { Fragment } from "react";
import { Link } from 'react-router-dom';


const ShowList = ({ propMovie }) => {
    const imageURL = "https://image.tmdb.org/t/p/w500_and_h282_face";
    const movie = propMovie.map(({id, title, poster_path, vote_count}) => {
        return (
            <div key={id} className='col-lg-6 col-md-6 col-sm-12 block'>
                <Link to={`/movieDetail/:id${id}`}>
                    <div className='title'>{title}</div>
                    <img src={imageURL + poster_path}
                         alt="image"
                         className='responsive'/>
                         <div className='vote-count'>Vote count: {vote_count}</div>
                </Link>
            </div>
        );
    });

    return (
        <Fragment>
            {movie}
        </Fragment>
    );
}

export default ShowList;