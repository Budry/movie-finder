/**
 * This file is part of the movie-finder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import {Action} from "redux";
import {UPDATE_LOADING_STATE} from "../constants";
import {UpdateLoadingStateAction} from "../actions/updateLoadingState";

interface LoadingState {
    isLoading: boolean
}

const initialState: LoadingState = {
    isLoading: false
};

const loadingReducer = (state: LoadingState = initialState, action: Action) => {

    if (action.type === UPDATE_LOADING_STATE) {
        state = {
            isLoading: (<UpdateLoadingStateAction>action).isLoading
        }
    }

    return state;
};

export default loadingReducer;