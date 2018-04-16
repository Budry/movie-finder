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

const ExportButton: StatelessComponent<{}> = () => {
    return (
        <a href="">
            <i className="fas fa-download"/> Export
        </a>
    );
};

export default ExportButton