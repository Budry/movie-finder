/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from 'react'
import Header from "./Header";
import ResultsBox from "./ResultsBox";
import {StatelessComponent} from "react";

const App: StatelessComponent<{}> = () => {
    return (
        <React.Fragment>
            <Header/>
            <ResultsBox/>
        </React.Fragment>
    );
};

export default App;