/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import nodeFsMiddleware from "./middlewares/nodeFsMiddleware";

const store = createStore(reducers, applyMiddleware(nodeFsMiddleware));

store.subscribe(() => {console.log(store.getState())});

export default store;