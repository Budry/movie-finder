/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import {Action} from 'redux'
import * as merge from 'object-merge'
import {UpdateMoviesAction} from "../actions/updateMovies";
import {
    LAST_MOVIES_STORAGE_KEY, UPDATE_MOVIES_ACTION_TYPE,
    UPDATE_MOVIES_SORT_ACTION_TYPE
} from "../constants";
import {set} from "electron-json-storage";
import {UpdateMovieSortAction} from "../actions/updateMoviesSort";

export interface MovieItem {
    name: string,
    lastUpdated: number
}

export interface MoviesSort {
    reverse: boolean,
    column: string
}

export interface MoviesState {
    directory: string,
    items: MovieItem[]
    sort: MoviesSort
}

const initialState: MoviesState = {
    items: [],
    directory: null,
    sort: {
        reverse: false,
        column: 'name'
    }
};

const moviesReducer = (state: MoviesState = initialState, action: Action): MoviesState => {

    if (action.type === UPDATE_MOVIES_ACTION_TYPE) {
        state = (<UpdateMoviesAction>action).movies;
        set(LAST_MOVIES_STORAGE_KEY, state, (err) => {
            if (err) throw err;
        });
    } else if (action.type === UPDATE_MOVIES_SORT_ACTION_TYPE) {
        state = merge({}, state, {sort: (<UpdateMovieSortAction>action).sort});
        set(LAST_MOVIES_STORAGE_KEY, state, (err) => {
            if (err) throw err;
        });
    }

    return state;
};

export default moviesReducer;