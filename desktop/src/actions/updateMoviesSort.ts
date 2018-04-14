/**
 * This file is part of the movie-finder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import {UPDATE_MOVIES_SORT_ACTION_TYPE} from "../constants";
import {MoviesSort} from "../reducers/moviesReducer";

export interface UpdateMovieSortAction {
    type: string,
    sort: MoviesSort
}

export interface UpdateMoviesSort {
    (column: string, reverse: boolean): UpdateMovieSortAction
}

const updateMoviesSort = (column: string, reverse: boolean): UpdateMovieSortAction => {
    return {
        type: UPDATE_MOVIES_SORT_ACTION_TYPE,
        sort: {
            column: column,
            reverse: reverse
        }
    }
};

export default updateMoviesSort;