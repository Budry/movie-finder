/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from 'react'
import MenuBar from "./MenuBar";
import ResultsBox from "./ResultsBox";

class App extends React.Component<void, void> {

    render() {
        return (
            <div>
                <MenuBar />
                <ResultsBox />
            </div>
        );
    }

}

export default App;