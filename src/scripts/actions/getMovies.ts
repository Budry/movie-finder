/**
 * This file is part of the movie-finder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import {readdir} from "fs";
import {join} from "path";
import {lookup} from "mime-types";
import * as Promise from 'bluebird'
import updateMovies from "./updateMovies";
import {ThunkAction} from "redux-thunk";

const getMovies = (path): ThunkAction<Promise<any>, void, void> => {
    return (dispatch) => {
        return new Promise((resolve) => {
            readdir(path, (err, files) => {
                files = files.filter((item: string) => {
                    return lookup(join(path, item)).toString().match(/^video\/.*$/) !== null
                });
                dispatch(updateMovies({
                    directory: path,
                    items: files
                }));
                resolve()
            });
        });
    };
};

export default getMovies;