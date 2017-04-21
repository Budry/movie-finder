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
import {LAST_MOVIES_STORAGE_KEY} from "../constants";
import {MoviesState} from "../reducers/moviesReducer";
import updateMovies from "./updateMovies";
import {ThunkAction} from "redux-thunk";

const loadLastMovies = (): ThunkAction<Promise<void>, void, void> => {
    return (dispatch) => {
        return new Promise<void>((resolve, reject) => {
            has(LAST_MOVIES_STORAGE_KEY, (err, hasKey) => {
                if (err) return reject(err);
                if (hasKey) {
                    get(LAST_MOVIES_STORAGE_KEY, (err, result: MoviesState) => {
                        if (err) return reject(err);
                        console.log(result);
                        dispatch(updateMovies(result));
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