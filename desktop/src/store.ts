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
import thunk from 'redux-thunk'

const store = createStore(reducers, applyMiddleware(thunk));

export default store;