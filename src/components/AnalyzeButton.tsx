/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from 'react'
import * as Promise from 'bluebird'
import {connect, Dispatch} from "react-redux";
import * as electron from 'electron'
import * as cx from 'classnames'
import getMovies from "../actions/getMovies";
import updateLoadingState from "../actions/updateLoadingState";

const Dialog = electron.remote.require('electron').dialog;

interface AnalyzeButtonProps {
    getMovies: (path: string) => Promise<any>,
    updateLoadingState: (isLoading) => any
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
                this.props.updateLoadingState(true);
                this.setState({loading: true});
                this.props.getMovies(directory[0]).finally(() => {
                    this.setState({loading: false});
                    this.props.updateLoadingState(false);
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

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getMovies: (path: string) => {
            return dispatch(getMovies(path))
        },
        updateLoadingState: (isLoading: boolean) => {
            return dispatch(updateLoadingState(isLoading))
        }
    }
};

export default connect(null, mapDispatchToProps)(AnalyzeButton)