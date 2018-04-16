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
import Menu from "./Menu";

const Header: StatelessComponent<{}> = () => {
    return (
        <div className={"header"}>
            <h1>
                <i className={"fas fa-video"} />
                MovieFinder
            </h1>
            <Menu />
        </div>
    );
};

export default Header