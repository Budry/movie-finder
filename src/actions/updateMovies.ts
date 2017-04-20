/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import {NODE_FS_ACTION_TYPE, NodeFsAction} from "../middlewares/nodeFsMiddleware";

export const UPDATE_MOVIES = 'UPDATE_MOVIES';

export interface UpdateMoviesAction {
    (path: string): NodeFsAction
}

const updateMovies = (path: string): NodeFsAction => {
    return {
        type: NODE_FS_ACTION_TYPE,
        targetType: UPDATE_MOVIES,
        action: 'readdir',
        args: [path]
    }
};

export default updateMovies;