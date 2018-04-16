/**
 * This file is part of the desktop package.
 *
 * (c) Ondřej Záruba <info@zaruba-ondrej.cz>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from "react";

class AnalyzeButton extends React.Component<{}, {}> {
    render() {
        return (
            <a href="">
                <i className="fas fa-search" /> Analyze directory
            </a>
        );
    }
}

export default AnalyzeButton