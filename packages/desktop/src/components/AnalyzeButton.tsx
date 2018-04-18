/**
 * This file is part of the desktop package.
 *
 * (c) Ondřej Záruba <info@zaruba-ondrej.cz>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from "react";
import {remote} from "electron"
import {getMovies, GetMovies} from "../actions/getMovies";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {StatelessComponent} from "react";
import {MovieFinderOptions} from "../utils/movie-finder-wrapper";
import {getConfig} from "../config";

interface DispatchProps {
    getMovies: GetMovies
}

const AnalyzeButton: StatelessComponent<DispatchProps> = () => {

    const handleClick = (e) => {
        e.preventDefault();
        const directory = remote.dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        if (directory && directory.length) {
            const options: MovieFinderOptions = {
                directory: directory[0],
                limit: getConfig().limitPerPage,
                offset: 0
            };
            getMovies(options);
        }
    };

    return (
        <a href="" onClick={handleClick}>
            <i className="fas fa-search"/> Analyze directory
        </a>
    );
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators<any>({
        getMovies: getMovies
    }, dispatch);
};

export default connect<{}, DispatchProps, {}>(null, mapDispatchToProps)(AnalyzeButton);