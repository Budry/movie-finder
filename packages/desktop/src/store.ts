/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import {MoviesState} from "./reducers/moviesReducer";

export interface StoreState {
    movies: MoviesState
}

const store = createStore(reducers, applyMiddleware(thunk));

export default store;