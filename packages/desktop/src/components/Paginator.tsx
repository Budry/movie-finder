/**
 * This file is part of the desktop package.
 *
 * (c) Ondřej Záruba <info@zaruba-ondrej.cz>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from "react";
import {StatelessComponent} from "react";
import * as classnames from "classnames";

interface OwnProps {
    totalNumber: number
    actualPage: number
    perPage: number
    onChange: (page: number) => void
}

const Paginator: StatelessComponent<OwnProps> = ({totalNumber, actualPage, perPage, onChange}) => {

    const createClickHandler = (page) => {
        return (e) => {
            e.preventDefault();
            onChange(page)
        }
    };

    const pageLinks = [];
    for (let i = 1; i <= totalNumber; i++) {
        pageLinks.push(
            <a href="#" onClick={createClickHandler(i)} className={classnames({active: i === actualPage})} key={i}>
                {i}
            </a>
        );
    }

    return (
        <div className="paginator">
            {pageLinks}
        </div>
    );
};

export default Paginator