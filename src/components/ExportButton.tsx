/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from 'react'
import * as electron from 'electron'
import {connect} from "react-redux";
import * as cx from 'classnames'
import {writeFile} from "fs";
import {EOL, homedir, platform} from "os";
import {join} from "path";
import {MovieItem, MoviesState} from "../reducers/moviesReducer";
import {Dispatch} from "redux";
import updateLoadingState from "../actions/updateLoadingState";

const Dialog = electron.remote.require('electron').dialog;

interface ExportButtonProps {
    movies: MoviesState
    updateLoadingState: (isLoading) => any
}

interface ExportButtonState {
    disabled: boolean,
    loading: boolean
}

class ExportButton extends React.Component<ExportButtonProps, ExportButtonState> {

    state = {
        disabled: true,
        loading: false
    };

    componentWillReceiveProps(nextProps: ExportButtonProps) {
        this.setState({disabled: nextProps.movies.items.length === 0})
    }

    handleClick(e) {
        e.preventDefault();
        if (!this.state.disabled) {
            const defaultExportFileName = 'movie-finder-export';

            const filters = [];
            if (platform() === 'win32') {
                filters.push({name: 'Textové soubory', extensions: ['txt']})
            }
            filters.push({name: 'Všechny soubory', extensions: ['*']});

            let target = Dialog.showSaveDialog({
                title: defaultExportFileName,
                defaultPath: join(homedir(), defaultExportFileName),
                properties: ['openFile', 'createDirectory'],
                filters: filters
            });
            if (target) {
                this.props.updateLoadingState(true);
                this.setState({loading: true});
                const data = this.props.movies.items.map((item: MovieItem) => {
                    return item.name;
                }).join(EOL);
                writeFile(target, data, () => {
                    this.setState({loading: false});
                    this.props.updateLoadingState(false);
                });
            }
        }
    }

    render() {
        return (
            <a href="" onClick={this.handleClick.bind(this)} className={cx({disabled: this.state.disabled || this.state.loading})}>
                {this.state.loading
                    ? (<span><i className="fa fa-spinner"/> Export</span>)
                    : (<span><i className="fa fa-download"/> Export</span>)
                }
            </a>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        updateLoadingState: (isLoading: boolean) => {
            return dispatch(updateLoadingState(isLoading))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExportButton)