/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from 'react'
import {execFile} from "child_process"
const {dialog} = require('electron').remote;

interface State {
    output: string
}

class App extends React.Component<{}, State> {

    constructor(props) {
        super(props);
        this.state = {
            output: ""
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        const directory = dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        if (directory) {
            execFile(__dirname + "/../../external/movie-finder", [
                "list",
                "--format", "json",
                "--limit", "10",
                directory[0]
            ], {maxBuffer: 10000 * 1024}, (err, stdout, stderr) => {
                if (err) {
                    this.setState({output: stderr})
                } else {
                    this.setState({output: stdout})
                }
            });
        }
    };

    render() {
        return (
            <div>
                <h1>Hello world</h1>
                <a href={""} onClick={this.handleClick}>Run</a>
                {this.state.output}
            </div>
        );
    }

}

export default App;