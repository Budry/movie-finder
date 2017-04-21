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
import * as cx from 'classnames'
import {NodeFsResultAction} from "../middlewares/nodeFsMiddleware";

const Dialog = electron.remote.require('electron').dialog;

interface AnalyzeButtonProps {
    updateMovies: Dispatch<Promise<NodeFsResultAction>>
}

interface AnalyzeButtonState {
    loading: boolean
}

class AnalyzeButton extends React.Component<AnalyzeButtonProps, AnalyzeButtonState> {

    state = {
        loading: false
    };

    handleClick(e) {
        e.preventDefault();
        if (!this.state.loading) {
            const directory = Dialog.showOpenDialog({
                properties: ['openDirectory']
            });
            if (directory) {
                this.setState({loading: true});
                this.props.updateMovies(directory[0]).then(() => {
                    this.setState({loading: false});
                })
            }
        }
    }

    render() {
        return (
            <a href="" onClick={this.handleClick.bind(this)} className={cx({disabled: this.state.loading})}>
                {this.state.loading
                    ? (<span><i className="fa fa-spinner"/> Analyzovat složku</span>)
                    : (<span><i className="fa fa-folder-open" /> Analyzovat složku</span>)
                }
            </a>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        updateMovies: (path): Promise<NodeFsResultAction> => {
            return dispatch(updateMovies(path))
        }
    }
};

export default connect(null, mapDispatchToProps)(AnalyzeButton)