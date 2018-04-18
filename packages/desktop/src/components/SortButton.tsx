/**
 * This file is part of the desktop package.
 *
 * (c) Ondřej Záruba <info@zaruba-ondrej.cz>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from "react";
import * as classnames from "classnames";
import {SortObject} from "../types/SortObject";
import {StatelessComponent} from "react";

interface OwnProps {
    property: string
    onChange: (key: string, method: string) => void
    actualSort?: SortObject
}

const SortButton: StatelessComponent<OwnProps> = ({children, property, onChange, actualSort}) => {

    const METHODS = ["asc", "desc", null];

    const handleSort = (e) => {
        e.preventDefault();
        let nextMethod;
        if (actualSort && actualSort.property === property) {
            nextMethod = METHODS[(METHODS.indexOf(actualSort.method) + 1) % METHODS.length];
        } else {
            nextMethod = METHODS[0];
        }
        if (nextMethod === null) {
            onChange(null, null)
        } else {
            onChange(property, nextMethod)
        }
    };


    return (
        <a href="" onClick={handleSort}>
            {children}
            {' '}
            {actualSort && property === actualSort.property
                ? (
                    <i className={classnames('fa', {
                        'fa-caret-up': actualSort.method === "ASC",
                        'fa-caret-down': actualSort.method === "DESC"
                    })}/>
                )
                : null
            }
        </a>
    )
};

export default SortButton