/**
 * This file is part of the movie-finder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import {UPDATE_MOVIES_FILTER_ACTION_TYPE} from "../constants";

export interface UpdateFilterAction {
    type: string,
    filter: string
}

export interface UpdateFilter {
    (filter: string): UpdateFilterAction
}

const updateFilter = (filter: string): UpdateFilterAction => {
    return {
        type: UPDATE_MOVIES_FILTER_ACTION_TYPE,
        filter: filter
    }
};

export default updateFilter;