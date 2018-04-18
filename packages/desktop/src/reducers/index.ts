/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import {combineReducers} from 'redux';
import {moviesReducer} from "./moviesReducer";

const reducers = combineReducers({
    movies: moviesReducer
});

export default reducers;