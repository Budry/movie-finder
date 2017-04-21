/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import {Action} from 'redux'
import {UPDATE_MOVIES} from "../actions/updateMovies";
import {NodeFsResultAction} from "../middlewares/nodeFsMiddleware";
import {join} from "path";
import {lookup} from 'mime-types'

export interface MovieRecord {
    path: string,
    name: string
}

export interface MoviesState {
    data: MovieRecord[],
    directory: string
}

const initialState: MoviesState = {
    data: [],
    directory: null
};

const moviesReducer = (state: MoviesState = initialState, action: Action): MoviesState => {

    if (action.type === UPDATE_MOVIES) {
        const nodeFsResultAction = <NodeFsResultAction>action;

        state = {
            directory: nodeFsResultAction.args[0],
            data: nodeFsResultAction.result.map((item: string) => {
                return {
                    path: join(nodeFsResultAction.args[0], item),
                    name: item
                };
            }).filter((item: MovieRecord) => {
                return lookup(item.path).toString().match(/^video\/.*$/) !== null
            })
        };
    }

    return state;
};

export default moviesReducer;