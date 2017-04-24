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
import {
    GET_LAST_MOVIES_ACTION_TYPE,
    GET_MOVIES_ACTION_TYPE,
    LAST_MOVIES_STORAGE_KEY, UPDATE_MOVIES_FILTER_ACTION_TYPE,
    UPDATE_MOVIES_SORT_ACTION_TYPE
} from "../constants";
import {set} from "electron-json-storage";
import {UpdateMovieSortAction} from "../actions/updateMoviesSort";
import {UpdateFilterAction} from "../actions/updateFilter";
import {LoadLastMoviesAction} from "../actions/loadLastMovies";
import {GetMoviesAction} from "../actions/getMovies";

export interface MovieItem {
    name: string,
    lastUpdated: number
}

export interface MoviesSort {
    reverse: boolean,
    column: string
}

export interface MoviesState extends PersistentMoviesState {
    filter: string
}

export interface PersistentMoviesState {
    directory: string,
    items: MovieItem[]
    sort: MoviesSort,
}

const initialState: MoviesState = {
    items: [],
    directory: null,
    sort: {
        reverse: false,
        column: 'name'
    },
    filter: ''
};

const updatePersistentStorage = (state: MoviesState) => {
    const store: PersistentMoviesState = {
        items: state.items,
        directory: state.directory,
        sort: state.sort
    };
    set(LAST_MOVIES_STORAGE_KEY, store, (err) => {
        if (err) throw err;
    });
};

const moviesReducer = (state: MoviesState = initialState, action: Action): MoviesState => {

    if (action.type === GET_MOVIES_ACTION_TYPE) {
        state = merge({}, state);
        state.items = [...(<GetMoviesAction>action).items];
        state.directory = (<GetMoviesAction>action).directory;
        updatePersistentStorage(state);
    } else if (action.type === UPDATE_MOVIES_SORT_ACTION_TYPE) {
        state = merge({}, state, {
            sort: merge({}, (<UpdateMovieSortAction>action).sort)
        });
        updatePersistentStorage(state);
    } else if (action.type === UPDATE_MOVIES_FILTER_ACTION_TYPE) {
        state = merge({}, state, {filter: (<UpdateFilterAction>action).filter});
    } else if (action.type === GET_LAST_MOVIES_ACTION_TYPE) {
        console.log((<LoadLastMoviesAction>action).movies.items);
        state = merge({}, state);
        state.directory = (<LoadLastMoviesAction>action).movies.directory;
        state.items = [...(<LoadLastMoviesAction>action).movies.items];
        state.sort = merge({}, (<LoadLastMoviesAction>action).movies.sort);
    }

    return state;
};

export default moviesReducer;