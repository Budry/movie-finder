/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from 'react'
import {render} from 'react-dom'
import App from "./components/App";
import {Provider} from "react-redux";
import store from "./store";

render(
    <Provider store={store} >
        <App />
    </Provider>,
    document.getElementById('app')
);