/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as fs from 'fs'
import {Action} from 'redux'
import * as Promise from 'bluebird'

export interface NodeFsAction {
    type: string,
    targetType: string,
    action: string,
    args: any[]
}

export interface NodeFsResultAction {
    type: string,
    result: any,
    args: any[]
}

export const NODE_FS_ACTION_TYPE = 'NODE_FS_ACTION_TYPE';

const nodeFsMiddleware = ({getState, dispatch}) => next => (action: Action): Promise<NodeFsResultAction> => {
    if (action.type !== NODE_FS_ACTION_TYPE) {
        return next(action)
    }

    return new Promise<NodeFsResultAction>((resolve, reject) => {
        const nodeFsAction: NodeFsAction = <NodeFsAction>action;

        fs[nodeFsAction.action].apply(null, [...nodeFsAction.args, (err, result) => {
            if (err) return reject(err);
            const resultAction = {
                type: nodeFsAction.targetType,
                result: result,
                args: nodeFsAction.args
            };
            dispatch(resultAction);
            return resolve(resultAction)
        }])
    });
};

export default nodeFsMiddleware;