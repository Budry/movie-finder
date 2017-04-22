/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import {Action} from 'redux'
import {UpdateMoviesAction} from "../actions/updateMovies";
import {LAST_MOVIES_STORAGE_KEY, UPDATE_MOVIES_ACTION_TYPE} from "../constants";
import {set} from "electron-json-storage";

export interface MoviesState {
    items: string[]
    directory: string
}

const initialState: MoviesState = {
    items: [],
    directory: null
};

const moviesReducer = (state: MoviesState = initialState, action: Action): MoviesState => {

    if (action.type === UPDATE_MOVIES_ACTION_TYPE) {
        state = (<UpdateMoviesAction>action).movies
        set(LAST_MOVIES_STORAGE_KEY, state, (err) => {
            if (err) throw err;
        });
    }

    return state;
};

export default moviesReducer;