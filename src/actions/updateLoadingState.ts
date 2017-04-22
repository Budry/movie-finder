import {UPDATE_LOADING_STATE} from "../constants";
/**
 * This file is part of the movie-finder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

export interface UpdateLoadingStateAction {
    type: string,
    isLoading: boolean
}

const updateLoadingState = (isLoading) => {
    return {
        type: UPDATE_LOADING_STATE,
        isLoading: isLoading
    }
};

export default updateLoadingState;