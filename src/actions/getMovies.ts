/**
 * This file is part of the movie-finder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as readdir from 'recursive-readdir'
import {basename, join} from "path";
import {lookup} from "mime-types";
import * as Promise from 'bluebird'
import updateMovies from "./updateMovies";
import {ThunkAction} from "redux-thunk";
import {MovieItem} from "../reducers/moviesReducer";
import {statSync} from "fs";

const getMovies = (path): ThunkAction<Promise<any>, void, void> => {
    return (dispatch) => {
        return new Promise((resolve) => {
            readdir(path, (err, files) => {
                const items: MovieItem[] = files.filter((item: string) => {
                    return lookup(join(path, item)).toString().match(/^video\/.*$/) !== null
                }).map((item) => {
                    return {
                        name: basename(item),
                        lastUpdated: statSync(item).mtime.getTime()
                    }
                });
                dispatch(updateMovies({
                    directory: path,
                    items: items,
                    sort: {
                        column: 'name',
                        reverse: false
                    },
                    filter: ''
                }));
                resolve()
            });
        });
    };
};

export default getMovies;