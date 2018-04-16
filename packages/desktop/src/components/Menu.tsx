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
import AnalyzeButton from "./AnalyzeButton";
import ExportButton from "./ExportButton";

const Menu: StatelessComponent<{}> = () => {
    return (
        <div className={"menu"}>
            <AnalyzeButton/>
            <ExportButton/>
        </div>
    );
};

export default Menu