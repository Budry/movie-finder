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
import {connect, MapStateToProps} from "react-redux";
import * as cx from 'classnames'
import {MovieRecord} from "../reducers/moviesReducer";
import {writeFile} from "fs";
import {EOL, homedir, platform} from "os";
import {join} from "path";

const Dialog = electron.remote.require('electron').dialog;

interface ExportButtonProps {
    movies: MovieRecord[]
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
        this.setState({disabled: nextProps.movies.length === 0})
    }

    handleClick(e) {
        e.preventDefault();
        if (!this.state.disabled) {
            const defaultExportFileName = `movie-finder-export${platform() === 'win32' ? '.txt' : ''}`;
            let target = Dialog.showSaveDialog({
                title: defaultExportFileName,
                defaultPath: join(homedir(), defaultExportFileName),
                properties: ['openFile', 'createDirectory'],
                filters: [
                    {name: 'Textové soubory', extensions: ['txt']},
                    {name: 'Všechny soubory', extensions: ['*']}
                ]
            });
            if (target) {
                if (platform() === 'win32') {
                    target = `${target}.txt`
                }
                this.setState({loading: true});
                const data = this.props.movies.map((item: MovieRecord) => {
                    return item.name
                }).join(EOL);
                writeFile(target, data, () => {
                    this.setState({loading: false});
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

export default connect(mapStateToProps)(ExportButton)