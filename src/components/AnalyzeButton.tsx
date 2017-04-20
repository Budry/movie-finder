/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from 'react'
import {connect} from "react-redux";
import {Dispatch} from "redux"
import updateMovies, {UpdateMoviesAction} from "../actions/updateMovies";
import * as electron from 'electron'

const Dialog = electron.remote.require('electron').dialog;

interface AnalyzeButtonProps {
    dispatch: Dispatch<UpdateMoviesAction>;
}

class AnalyzeButton extends React.Component<AnalyzeButtonProps, void> {

    handleClick(e) {
        e.preventDefault();
        const directory = Dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        this.props.dispatch(updateMovies(directory[0]))
    }

    render() {
        return (
            <a href="" onClick={this.handleClick.bind(this)}><i className="fa fa-folder-open" /> Analyzovat složku</a>
        )
    }

}

export default connect()(AnalyzeButton)