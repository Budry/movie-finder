/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from 'react'
import Logo from "./Logo";
import ExportButton from "./ExportButton";
import AnalyzeButton from "./AnalyzeButton";

class MenuBar extends React.Component<void, void> {

    render() {
        return (
            <header className="menu-bar">
                <Logo/>
                <nav>
                    <ExportButton />
                    <AnalyzeButton />
                </nav>
            </header>
        )
    }

}

export default MenuBar