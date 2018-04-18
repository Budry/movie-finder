/**
 * This file is part of the desktop package.
 *
 * (c) Ondřej Záruba <info@zaruba-ondrej.cz>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import {Movies} from "../types/Movies";
import {ChildProcess, execFile} from "child_process";
import {SortObject} from "../types/SortObject";

export interface MovieFinderOptions {
    directory: string
    limit?: number
    offset?: number
    sort?: SortObject
}

const MOVIE_FINDER_PATH = `${__dirname}/../../external/movie-finder`;
let movieFinderProcess: ChildProcess = null;

export const callMovieFinder = (options: MovieFinderOptions, callback: (err: Error, movies: Movies) => void) => {

    if (movieFinderProcess) {
        movieFinderProcess.kill();
        movieFinderProcess = null;
    }

    const cmdOptions = ["--format", "json"];
    if (options.limit !== null) {
        cmdOptions.push("--limit", options.limit.toString());
    }
    if (options.offset !== null) {
        cmdOptions.push("--offset", options.offset.toString());
    }
    if (options.sort !== null) {
        cmdOptions.push("--sortKey", options.sort.property);
        cmdOptions.push("--sortMethod", options.sort.method);
    }

    movieFinderProcess = execFile(MOVIE_FINDER_PATH, cmdOptions, (err, stdout, stderr) => {
        if (err) return callback(err, null);
        return callback(null, JSON.parse(stdout));
    });
};