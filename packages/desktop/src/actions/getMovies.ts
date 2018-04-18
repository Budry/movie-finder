/**
 * This file is part of the desktop package.
 *
 * (c) Ondřej Záruba <info@zaruba-ondrej.cz>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import {Action} from "redux";
import {Movies} from "../types/Movies";
import {callMovieFinder, MovieFinderOptions} from "../utils/movie-finder-wrapper";

export interface GetMoviesAction extends Action {
    payload: Movies
}

export interface GetMovies {
    (options: MovieFinderOptions): GetMoviesAction
}

export const GET_MOVIES_LOADING_ACTION_TYPE = "GET_MOVIES_LOADING_ACTION_TYPE";
export const GET_MOVIES_SUCCESS_ACTION_TYPE = "GET_MOVIES_SUCCESS_ACTION_TYPE";
export const GET_MOVIES_FAILED_ACTION_TYPE = "GET_MOVIES_FAILED_ACTION_TYPE";

const getMoviesSuccess = (movies) => ({
    type: GET_MOVIES_SUCCESS_ACTION_TYPE,
    payload: movies
});

const getMoviesFailed = () => ({
    type: GET_MOVIES_FAILED_ACTION_TYPE,
    payload: null
});

const setLoadingState = () => ({
    type: GET_MOVIES_LOADING_ACTION_TYPE,
});

export const getMovies = (options: MovieFinderOptions) => {
    return (dispatch) => {
        setLoadingState();
        callMovieFinder(options, (err, movies) => {
            if (err) {
                dispatch(getMoviesFailed());
            }
            return dispatch(getMoviesSuccess(movies));
        });
    };
};