/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import {MoviesState} from "../reducers/moviesReducer";
import {UPDATE_MOVIES_ACTION_TYPE} from "../constants";

export interface UpdateMoviesAction {
    type: string,
    movies: MoviesState
}

const updateMovies = (movies: MoviesState): UpdateMoviesAction => {
    return {
        type: UPDATE_MOVIES_ACTION_TYPE,
        movies: movies
    }
};

export default updateMovies;





/*
import {MoviesState} from "../reducers/moviesReducer";

export const UPDATE_MOVIES = 'UPDATE_MOVIES';

export interface UpdateMoviesAction {
    type: string,
    movies: MoviesState
}

export interface UpdateMovies {
    (movies: MoviesState): void
}

export const updateMovies = (movies: MoviesState): UpdateMoviesAction => {
    return {
        type: UPDATE_MOVIES,
        movies: movies
    }
};

export const updateMoviesByPath = (path) => {};*/