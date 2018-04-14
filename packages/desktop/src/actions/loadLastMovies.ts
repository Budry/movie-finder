/**
 * This file is part of the movie-finder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import {get, has} from "electron-json-storage";
import * as Promise from 'bluebird'
import {GET_LAST_MOVIES_ACTION_TYPE, LAST_MOVIES_STORAGE_KEY} from "../constants";
import {PersistentMoviesState} from "../reducers/moviesReducer";
import {ThunkAction} from "redux-thunk";

export interface LoadLastMoviesAction {
    type: string,
    movies: PersistentMoviesState
}

const action = (movies: PersistentMoviesState): LoadLastMoviesAction => {
    return {
        type: GET_LAST_MOVIES_ACTION_TYPE,
        movies: movies
    }
};

const loadLastMovies = (): ThunkAction<Promise<void>, void, void> => {
    return (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            has(LAST_MOVIES_STORAGE_KEY, (err, hasKey) => {
                if (err) return reject(err);
                if (hasKey) {
                    get(LAST_MOVIES_STORAGE_KEY, (err, result: PersistentMoviesState) => {
                        if (err) return reject(err);
                        dispatch(action(result));
                        return resolve();
                    })
                } else {
                    return resolve()
                }
            });
        });
    }
};

export default loadLastMovies;