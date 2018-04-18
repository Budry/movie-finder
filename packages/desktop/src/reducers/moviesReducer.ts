/**
 * This file is part of the desktop package.
 *
 * (c) Ondřej Záruba <info@zaruba-ondrej.cz>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import {Movies} from "../types/Movies";
import {Action} from "redux";
import {
    GET_MOVIES_FAILED_ACTION_TYPE,
    GET_MOVIES_LOADING_ACTION_TYPE,
    GET_MOVIES_SUCCESS_ACTION_TYPE,
    GetMoviesAction
} from "../actions/getMovies";

export interface MoviesState extends Movies {
    loading: boolean
    error: boolean
}

const initialState: MoviesState = {
    data: [],
    displayed: 0,
    limit: 0,
    loading: false,
    error: false
};

export const moviesReducer = (state = initialState, action: Action) => {

    if (action.type === GET_MOVIES_SUCCESS_ACTION_TYPE) {
        state = {
            ...(<GetMoviesAction>action).payload,
            loading: false,
            error: false
        }
    } else if (action.type === GET_MOVIES_LOADING_ACTION_TYPE) {
        state = {
            ...state,
            loading: true
        }
    } else if (action.type === GET_MOVIES_FAILED_ACTION_TYPE) {
        state = {
            ...initialState,
            error: true
        }
    }

    return state;
};